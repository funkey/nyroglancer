from jupyter_client import BlockingKernelClient

clients = {}

def connect(connection_file):

    if connection_file not in clients:

        print "[nyroglancer] connecting to: " + connection_file

        kernel_client = BlockingKernelClient(connection_file=connection_file)
        kernel_client.load_connection_file()
        kernel_client.start_channels()
        clients[connection_file] = kernel_client

        return kernel_client

    return clients[connection_file]

def evaluate(kernel_client, expression):
    """Evaluate `expression` in an IPython kernel.

    Parameters
    ----------

    kernel_client:BlockingKernelClient
        Client to the kernel to evaluate `expression`.
    expression:string
        The expression to evaluate.

    Returns
    -------

    string
        A json dump of the evaluated expression.
    """

    setup = "import nyroglancer; import json;"
    expression = "json.dumps(%s)" % expression

    msg_id = kernel_client.execute(setup, user_expressions = {'e':expression})

    reply = None
    for i in range(5):
        reply = kernel_client.get_shell_msg()
        if 'content' in reply and 'user_expressions' in reply['content']:
            break

    if reply is None:
        raise RuntimeError("could not get reply for execute request %s" % expression)

    result = reply['content']['user_expressions']['e']

    if isinstance(result, dict) and 'status' in result and result['status'] == 'error':
        raise RuntimeError(
                "Error when executing " + expression + " in kernel client " +
                    str(kernel_client) + "\n" +
                result['evalue'] + "\n\n" +
                "\n\t".join(result['traceback']))

    data = result['data'].values()[0].strip().strip('\'').decode('string-escape')

    #print "[nyroglancer] return data part (between >>> and <<<):\n\t>>>" + str(data) + "<<<\n"

    return data
