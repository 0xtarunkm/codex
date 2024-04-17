## Online Code Playground: Experiment with React & Node.js Safely

This markdown file describes a secure online code execution platform that empowers developers to experiment with React and Node.js in a controlled environment.

### Key Features

- **Supported Languages:** React and Node.js
- **Isolated Playgrounds:** Each user's code runs in a separate, secure pod using Kubernetes (k8s) containers. This isolation minimizes the risk of code interfering with other users' playgrounds or the underlying system.
- **Ingress Access:** Users can access their running applications through a dedicated ingress, ensuring controlled exposure to the external network.
- **Next.js Frontend:** Provides a modern and user-friendly interface for code editing and application execution.
- **Express.js Backend:** Handles user registration, code compilation/execution, and communication with the k8s cluster.

### Security Considerations

- **Input Validation:** The platform rigorously validates all user input to prevent potential code injection vulnerabilities.
- **Resource Limits:** Enforces CPU, memory, and other resource constraints on user code to guarantee fair usage and system stability.
- **Timeouts:** Code execution times out after a configurable period to prevent infinite loops or malicious behavior.
- **Network Access Restrictions:** User code has limited network access capabilities, ensuring isolation and preventing unauthorized communication.

### Getting Started

1. **Register:** Create a free account to access the platform.
2. **Choose Language:** Select React or Node.js as your development environment.
3. **Write Code:** Utilize the provided code editor to write and experiment with your application.
4. **Run Playground:** Click the "Run" button to build and execute your code within a dedicated container.
5. **Access Application:** The platform will provide a temporary URL through an ingress to access your running application.

### Benefits

- **Rapid Prototyping:** Quickly test and iterate on React and Node.js ideas in a safe sandbox environment.
- **Improved Learning:** Experiment with different code snippets and libraries to enhance your understanding of these technologies.

### Local setup

- **Start the database and rabbitmq**

```
docker run --name rabbitmq -d -p 15672:15672 -p 5672:5672 rabbitmq:3-management

docker run --name database -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

- **K8S and minikube**
  Download [minikube](https://minikube.sigs.k8s.io/docs/start/)

```
minikube start
```

- **Prisma init**

```
cd packages/database
npx prisma migrate dev --name init
npx prisma generate
```

- **Start all the services**

```
turbo dev
```

### Disclaimer

**Important:** While this platform offers a secure environment for code execution, it's crucial to exercise caution:

- **Avoid Sensitive Data:** Do not include sensitive information (passwords, API keys) in your code snippets.
- **Limited Functionality:** Playgrounds have resource and network access limitations. Complex applications requiring external dependencies might not be fully functional.
