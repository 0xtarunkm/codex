import { KubeConfig, CoreV1Api, Exec } from '@kubernetes/client-node';
import * as stream from 'stream';

const kc = new KubeConfig();
kc.loadFromDefault();

const exec = new Exec(kc);

export const executeCommand = ({
  namespace,
  podName,
  containerName,
  command,
}: {
  namespace: string;
  podName: string;
  containerName: string;
  command: string[];
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    let data = '';

    try {
      await exec.exec(
        namespace,
        podName,
        containerName,
        command,
        new stream.Writable({
          write(chunk, encoding, callback) {
            data += chunk.toString();

            callback();
          },
          final(callback) {
            resolve(data);
            callback();
          },
        }),
        null,
        null,
        false
      );
    } catch (error: any) {
      console.error(error.message);
      reject(error);
    }
  });
};
