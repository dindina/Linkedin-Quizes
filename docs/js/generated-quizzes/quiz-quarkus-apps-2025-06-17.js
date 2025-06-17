const quizName = "Quarkus Apps Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "A company is migrating its monolithic application to a microservices architecture and aims for efficient resource utilization in a Kubernetes environment. Why would Quarkus be a strong candidate for developing these new microservices?",
            "hint": "Consider Quarkus's primary design goals for cloud-native applications and its 'Supersonic Subatomic Java' tagline.",
            "answerOptions": [
                {
                    "text": "It provides a highly complex and verbose API, making it suitable for large enterprise monoliths.",
                    "rationale": "Incorrect. Quarkus aims for simplicity, developer productivity, and conciseness, especially for microservices, not verbosity or complexity.",
                    "isCorrect": false
                },
                {
                    "text": "Its core philosophy prioritizes maximum runtime dynamic class loading, leading to highly flexible but slow-starting applications.",
                    "rationale": "Incorrect. Quarkus emphasizes build-time processing and Ahead-of-Time (AOT) compilation to minimize runtime overhead and achieve ultra-fast startup, rather than maximizing runtime dynamic class loading which often impacts startup negatively.",
                    "isCorrect": false
                },
                {
                    "text": "It offers exceptionally fast startup times and low memory consumption, making it ideal for containerized, serverless, and highly elastic environments.",
                    "rationale": "Correct. These are the primary benefits of Quarkus, achieved through build-time optimizations and native compilation support (with GraalVM), which are crucial for efficient resource utilization and rapid scaling in cloud-native deployments like Kubernetes.",
                    "isCorrect": true
                },
                {
                    "text": "Quarkus is exclusively designed for synchronous, blocking I/O operations, which simplifies debugging in distributed systems.",
                    "rationale": "Incorrect. While it supports blocking I/O, Quarkus strongly promotes and integrates with reactive programming models (e.g., Mutiny, Vert.x) for non-blocking operations, which is crucial for high-performance and efficient resource usage in microservices, especially in I/O-bound scenarios.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When deploying a Quarkus application as a GraalVM native executable, which of the following is a primary consequence of this compilation strategy?",
            "hint": "Think about the 'Ahead-of-Time' (AOT) nature of native compilation and how it differs from traditional JVM execution.",
            "answerOptions": [
                {
                    "text": "Increased application binary size due to the inclusion of the full Java Virtual Machine (JVM).",
                    "rationale": "Incorrect. Native compilation significantly reduces binary size by removing the need for a full JVM, bundling only the necessary application code and a minimal runtime.",
                    "isCorrect": false
                },
                {
                    "text": "Slower cold start times because the application needs to warm up the JVM before processing requests.",
                    "rationale": "Incorrect. Native executables bypass JVM warm-up entirely, leading to significantly faster cold starts, which is a key advantage for serverless functions and rapidly scaling containers.",
                    "isCorrect": false
                },
                {
                    "text": "Runtime reflection and dynamic class loading are enhanced, providing greater flexibility at execution time.",
                    "rationale": "Incorrect. Native compilation performs Ahead-of-Time (AOT) compilation. This means dynamic features like reflection and dynamic class loading are limited or require explicit configuration (e.g., using `@RegisterForReflection`) because the code is compiled and optimized before runtime.",
                    "isCorrect": false
                },
                {
                    "text": "Reduced memory footprint and near-instantaneous startup times, as the application starts as a compiled native binary without the need for a JVM.",
                    "rationale": "Correct. GraalVM native image compilation pre-compiles Java bytecode into a standalone executable. This eliminates the JVM startup overhead and significantly reduces the memory consumption compared to running on a traditional JVM, making it highly efficient for cloud-native environments.",
                    "isCorrect": true
                }
            ]
        }
    ]
};