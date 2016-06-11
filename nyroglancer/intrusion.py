from IPython.lib.kernel import find_connection_file
from jupyter_client import BlockingKernelClient

def evaluate(connection_file, expression):

        print "[nyroglancer] connecting to: " + connection_file

        km = BlockingKernelClient(connection_file=connection_file)
        km.load_connection_file()
        km.start_channels()

        # get the current value of a
        msg_id = km.execute("import nyroglancer;", user_expressions = {'e':expression})

        reply = None
        for i in range(5):
            try:
                km.wait_for_ready(timeout=1)
            except RuntimeError:
                continue
            print "[nyroglancer] getting reply..."
            reply = km.get_shell_msg()
            print "[nyroglancer] " + str(reply)
            if 'content' in reply and 'user_expressions' in reply['content']:
                print "[nyroglancer] seems like the right one"
                break

        if reply is None:
            raise RuntimeError("could not get reply for execute request")

        result = reply['content']['user_expressions']['e']

        if isinstance(result, dict) and 'status' in result and result['status'] == 'error':
            raise RuntimeError(result['evalue'])

        print "[nyroglancer] result is " + str(result)

        data = result['data'].values()[0]
        print "[nyroglancer] return data part " + str(data)

        # to json decode strings on the caller side, we need to replace
        #  ' -> "
        return data.replace("'", '"')
