from IPython.lib.kernel import find_connection_file
from jupyter_client import BlockingKernelClient

clients = {}

def get_kernel_client(connection_file):

    if connection_file not in clients:

        print "[nyroglancer] connecting to: " + connection_file

        km = BlockingKernelClient(connection_file=connection_file)
        km.load_connection_file()
        km.start_channels()
        clients[connection_file] = km

        return km

    #print "[nyroglancer] reusing existing client to " + connection_file
    return clients[connection_file]

def evaluate(connection_file, expression):

        km = get_kernel_client(connection_file)

        #print "[nyroglancer] evaluating expression " + expression
        msg_id = km.execute("import nyroglancer;", user_expressions = {'e':expression})

        reply = None
        for i in range(5):
            #print "[nyroglancer] getting reply..."
            reply = km.get_shell_msg()
            #print "[nyroglancer] " + str(reply)
            if 'content' in reply and 'user_expressions' in reply['content']:
                #print "[nyroglancer] seems like the right one"
                break

        if reply is None:
            raise RuntimeError("could not get reply for execute request")

        result = reply['content']['user_expressions']['e']

        if isinstance(result, dict) and 'status' in result and result['status'] == 'error':
            raise RuntimeError(result['evalue'] + "\n\n" + "\n\t".join(result['traceback']))

        #print "[nyroglancer] result is " + str(result)

        data = result['data'].values()[0].strip()
        #print "[nyroglancer] return data part " + str(data)

        # to json decode strings on the caller side, we need to replace
        #  ' -> "
        return data.replace("'", '"')
