import {
  CoreV1Api,
  KubeConfig,
  NetworkingV1Api,
} from "@kubernetes/client-node";

let CONTAINER_IMAGE = "";

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);
const k8sAppsApi = kc.makeApiClient(NetworkingV1Api);

export const createPlayground = async (
  name: string,
  environment: string,
  port: number,
) => {
  if (environment == "reactjs") {
    CONTAINER_IMAGE = "tarunclub/tensor-react-playground-env:1.0.0";
  } else if (environment == "nodejs") {
    CONTAINER_IMAGE = "tarunclub/tensor-nodejs-playground-env:1.0.0";
  }

  console.log(
    `Creating pod for ${name} with image ${CONTAINER_IMAGE}, on port ${port}`,
  );

  const pod = {
    metadata: {
      name: name,
      labels: {
        app: name,
      },
    },
    spec: {
      containers: [
        {
          name: name,
          image: CONTAINER_IMAGE,
          ports: [
            {
              containerPort: port,
            },
            {
              containerPort: 5001,
            },
          ],
        },
      ],
    },
  };

  const service = {
    metadata: {
      name: `${name}-service`,
    },
    spec: {
      selector: {
        app: name,
      },
      ports: [
        {
          name: `${name}-app`,
          port: port,
        },
        {
          name: `${name}-api`,
          port: 5001,
          targetPort: 5001,
        },
      ],
    },
  };

  const ingress = {
    metadata: {
      name: `${name}-ingress`,
    },
    spec: {
      rules: [
        {
          host: `app.${name}.localhost`,
          http: {
            paths: [
              {
                pathType: "Prefix",
                path: `/`,
                backend: {
                  service: {
                    name: `${name}-service`,
                    port: {
                      number: port,
                    },
                  },
                },
              },
            ],
          },
        },
        {
          host: `api.${name}.localhost`,
          http: {
            paths: [
              {
                pathType: "Prefix",
                path: `/`,
                backend: {
                  service: {
                    name: `${name}-service`,
                    port: {
                      number: 5001,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  try {
    const createdPod = await k8sApi.createNamespacedPod("default", pod);
    const createdService = await k8sApi.createNamespacedService(
      "default",
      service,
    );
    const createdIngress = await k8sAppsApi.createNamespacedIngress(
      "default",
      ingress,
    );

    console.log("Created pod: " + createdPod.body);
    console.log("Created service: " + createdService.body);
    console.log("Created ingress: " + createdIngress.body);
  } catch (err) {
    console.error(err);
  }
};
