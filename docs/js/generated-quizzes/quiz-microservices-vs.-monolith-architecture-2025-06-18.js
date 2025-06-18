const quizName = "Microservices vs. Monolith Architecture Quiz";
const quizData = {
    "questions": [
        {
            "question": "For a brand new startup with a small development team and a tight deadline, which architectural style is generally recommended for the initial MVP (Minimum Viable Product)?",
            "hint": "Consider the overhead and complexity of setting up each architecture from scratch, especially with limited resources.",
            "answerOptions": [
                {
                    "text": "Microservices: Provides flexibility for future scaling and diverse technology choices.",
                    "rationale": "While Microservices offer long-term flexibility, their initial setup, operational overhead, and complexity can significantly slow down a small team trying to launch an MVP quickly. It requires more infrastructure, deployment pipeline, and monitoring setup from the start.",
                    "isCorrect": false
                },
                {
                    "text": "Monolith: Simpler to develop, deploy, and manage initially, allowing for faster iteration.",
                    "rationale": "For a small team and an MVP, the simplicity of a monolith often outweighs the long-term benefits of microservices. It has less boilerplate, easier debugging, simpler deployment, and faster development cycles initially, which is crucial for early-stage startups.",
                    "isCorrect": true
                },
                {
                    "text": "Hybrid (Monolith with some Microservices): Offers the best of both worlds.",
                    "rationale": "A hybrid approach might seem appealing but introduces immediate complexity of managing two architectural styles, which is counterproductive for an MVP with limited resources. It adds overhead without necessarily providing full benefits of either for initial development.",
                    "isCorrect": false
                },
                {
                    "text": "Serverless Architecture: Eliminates server management, speeding up development.",
                    "rationale": "Serverless is a deployment model, not primarily an architectural style comparison with monolith/microservices in this context. While it can reduce operational burden, adopting serverless for an entire MVP can introduce its own complexities (e.g., cold starts, vendor lock-in, debugging distributed functions) that might not be ideal for a tight deadline.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A popular e-commerce application experiences a massive surge in traffic specifically to its 'product search' feature during peak sales events. Which architectural style would most efficiently allow scaling *only* the product search component without affecting other parts of the system?",
            "hint": "Think about independent deployment and resource allocation for specific functionalities.",
            "answerOptions": [
                {
                    "text": "Monolith: Its integrated nature ensures consistent scaling across the entire application.",
                    "rationale": "In a monolithic architecture, scaling typically means scaling the entire application, even if only a small part experiences high load. This is inefficient as it consumes more resources than necessary and limits targeted scaling.",
                    "isCorrect": false
                },
                {
                    "text": "Microservices: Allows independent scaling of individual services based on demand.",
                    "rationale": "One of the primary advantages of microservices is the ability to deploy and scale individual services independently. If the 'product search' service experiences high load, only that specific service needs to be scaled up, optimizing resource usage and performance.",
                    "isCorrect": true
                },
                {
                    "text": "Layered Architecture: Separates concerns, making components easier to scale.",
                    "rationale": "Layered architecture focuses on separating concerns within a single application but doesn't inherently mean independent deployable units that can be scaled separately. Layers typically still run within the same process or application instance.",
                    "isCorrect": false
                },
                {
                    "text": "Service-Oriented Architecture (SOA): Provides similar benefits but is less fine-grained than microservices.",
                    "rationale": "While SOA shares concepts with microservices, microservices are typically more fine-grained and emphasize independent deployability and decentralized data management, making them more suitable for precise, independent scaling of small functional units.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which architectural style inherently supports using different programming languages, databases, and frameworks for various parts of the system without forcing a single technology stack for the entire application?",
            "hint": "Consider the boundaries and isolation between different components.",
            "answerOptions": [
                {
                    "text": "Monolith: Enforces a uniform technology stack for easier management and consistency.",
                    "rationale": "A monolithic application typically uses a single technology stack (e.g., all Java with one database). While polyglot monorepos exist, introducing different languages or databases within a single tightly coupled application is highly complex and generally discouraged.",
                    "isCorrect": false
                },
                {
                    "text": "Microservices: Services can be developed and deployed using heterogeneous technologies independently.",
                    "rationale": "One of the key benefits of microservices is 'polyglot persistence' and 'polyglot programming.' Each service is an independent unit that can choose the best technology stack (language, framework, database) for its specific purpose, as long as it communicates via well-defined APIs.",
                    "isCorrect": true
                },
                {
                    "text": "Client-Server: A communication pattern, not an architectural style related to internal technology choices.",
                    "rationale": "Client-server describes how components communicate (client requests, server responds) but doesn't dictate the internal architecture or technology stack used within the server-side application.",
                    "isCorrect": false
                },
                {
                    "text": "Event-Driven Architecture: Focuses on communication through events, not technology stack diversity across components.",
                    "rationale": "Event-driven architecture is a pattern for communication between services or components. While it often complements microservices, it doesn't, by itself, grant the ability to use heterogeneous technology stacks; rather, it defines how those potentially heterogeneous services interact.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In which architectural style is a failure in one component (e.g., the billing module) least likely to bring down the entire application?",
            "hint": "Think about how component failures propagate in each architecture.",
            "answerOptions": [
                {
                    "text": "Monolith: Strong coupling and shared resources mean a single failure can cascade.",
                    "rationale": "In a monolithic application, different modules typically share the same process, memory space, and resources. A bug, resource leak, or unhandled exception in one module can easily affect and crash the entire application.",
                    "isCorrect": false
                },
                {
                    "text": "Microservices: Services run in independent processes, improving fault isolation.",
                    "rationale": "Each microservice runs as an independent process, often on its own server or container. If one service fails (e.g., the billing service crashes), other services can continue to operate. This provides excellent fault isolation, preventing cascading failures across the entire system (assuming proper fallback mechanisms).",
                    "isCorrect": true
                },
                {
                    "text": "N-Tier Architecture: While logical layers are separated, they often run within the same process or server, still susceptible to a single point of failure.",
                    "rationale": "N-Tier architecture separates functionality into distinct layers (e.g., presentation, business logic, data access). However, these layers often reside within the same deployable unit or application server, meaning a critical failure in one layer can still bring down the whole application.",
                    "isCorrect": false
                },
                {
                    "text": "Peer-to-Peer Architecture: A distributed network model, not directly comparable in this context of application architecture failure modes.",
                    "rationale": "Peer-to-peer (P2P) architecture is a decentralized network model where participants are equally privileged. It's not a direct comparison for internal application structure and failure isolation like monoliths vs. microservices.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which architectural style typically involves a more complex CI/CD pipeline and significant operational overhead due to the management of numerous independent deployments and distributed systems challenges?",
            "hint": "Consider the number of deployable units and the coordination required.",
            "answerOptions": [
                {
                    "text": "Monolith: Generally has a single, simpler deployment artifact and fewer moving parts to manage.",
                    "rationale": "A monolithic application results in a single, large deployable artifact. Its CI/CD pipeline is relatively straightforward, focusing on building, testing, and deploying one application. Operational overhead is lower as there's only one application to monitor, scale, and manage.",
                    "isCorrect": false
                },
                {
                    "text": "Microservices: Requires managing multiple independent services, leading to more complex deployment, monitoring, and distributed systems challenges.",
                    "rationale": "With microservices, you have many small, independently deployable services. This necessitates sophisticated CI/CD pipelines to manage concurrent deployments, versioning, and rollbacks across services. Operational complexity increases significantly due to distributed tracing, centralized logging, service discovery, API gateways, and managing the health of numerous services.",
                    "isCorrect": true
                },
                {
                    "text": "Serverless: Shifts operational burden to the cloud provider, simplifying deployment and management for the user.",
                    "rationale": "Serverless architectures aim to abstract away server management. While individual functions still need to be deployed and monitored, the underlying infrastructure concerns are managed by the cloud provider, which can simplify some aspects of operations compared to self-managing microservices infrastructure.",
                    "isCorrect": false
                },
                {
                    "text": "Batch Processing Architecture: Focuses on processing large datasets, not inherently related to continuous deployment complexity comparison.",
                    "rationale": "Batch processing architecture is designed for processing large volumes of data in batches. Its deployment and operational complexity are determined more by the specific implementation (e.g., using big data frameworks) rather than the fundamental comparison between monolithic and microservice application styles.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For a large organization with multiple independent development teams working on different features, which architectural style typically promotes greater autonomy and faster development cycles for each team?",
            "hint": "Think about Conway's Law and how architectural boundaries align with team boundaries.",
            "answerOptions": [
                {
                    "text": "Monolith: Requires more coordination and shared code ownership, potentially slowing down large teams.",
                    "rationale": "In a monolithic application, multiple teams often work on the same codebase, leading to increased coordination overhead, merge conflicts, shared resource contention, and slower development due to cross-team dependencies and the need for synchronized releases.",
                    "isCorrect": false
                },
                {
                    "text": "Microservices: Teams can own and deploy their services independently with minimal cross-team dependencies, fostering autonomy.",
                    "rationale": "Microservices align well with Conway's Law, allowing teams to be organized around specific services or business capabilities. Each team can own, develop, deploy, and scale its services independently, leading to greater autonomy, reduced coordination overhead, and faster development cycles for each team.",
                    "isCorrect": true
                },
                {
                    "text": "Data Lake Architecture: Focuses on data storage and processing, not team organization or development speed.",
                    "rationale": "A data lake architecture is concerned with storing and processing large volumes of raw data. It doesn't primarily define how development teams are organized or how fast they can develop application features.",
                    "isCorrect": false
                },
                {
                    "text": "Distributed Monolith: Still fundamentally a single application, potentially with multiple deployments, but lacks true independent ownership and technology flexibility.",
                    "rationale": "A 'distributed monolith' is often a monolithic application that has been split across multiple deployments without proper service boundaries or independent data stores. It still suffers from tight coupling, shared libraries, and often requires coordinated deployments, negating the benefits of true microservices for team autonomy.",
                    "isCorrect": false
                }
            ]
        }
    ]
};