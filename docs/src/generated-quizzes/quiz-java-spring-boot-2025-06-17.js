const quizName = "Java Spring boot Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "Which pattern, commonly implemented with libraries like Resilience4j in Spring Boot, is crucial for improving the resilience of a microservice architecture by preventing cascading failures and allowing services to gracefully degrade when dependencies are unavailable?",
            "hint": "Think about what happens when one service calls another and the called service fails.",
            "answerOptions": [
                {
                    "text": "Service Discovery",
                    "rationale": "Service Discovery (e.g., Eureka) helps services locate each other, but it doesn't directly prevent cascading failures when a located service becomes unresponsive or overloaded.",
                    "isCorrect": false
                },
                {
                    "text": "API Gateway",
                    "rationale": "An API Gateway (e.g., Spring Cloud Gateway) acts as a single entry point for client requests, handling routing, security, and sometimes rate limiting, but it's not the primary mechanism for preventing cascading failures between internal microservices.",
                    "isCorrect": false
                },
                {
                    "text": "Circuit Breaker",
                    "rationale": "The Circuit Breaker pattern is designed to prevent a single failing service from causing a cascade of failures throughout the system. When a service dependency fails repeatedly, the circuit 'opens,' short-circuiting calls to that service and often providing a fallback, allowing the system to degrade gracefully rather than fail entirely. Resilience4j is a popular library for implementing this in Spring Boot.",
                    "isCorrect": true
                },
                {
                    "text": "Load Balancing",
                    "rationale": "Load balancing distributes incoming network traffic across multiple servers to ensure optimal resource utilization and prevent overload. While essential for scalability, it doesn't inherently prevent cascading failures when all instances of a downstream service are unhealthy; it just distributes the failing requests.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a large-scale Spring Boot microservices deployment, managing configurations can become complex. Which Spring Cloud component provides a centralized way to manage externalized configurations for multiple services, enabling dynamic updates without redeploying applications?",
            "hint": "Consider how applications get their settings in a distributed environment and the benefits of changing them on the fly.",
            "answerOptions": [
                {
                    "text": "Spring Cloud Eureka",
                    "rationale": "Spring Cloud Eureka is a service registry and discovery server. It allows microservices to register themselves and discover other services, but it does not manage application configurations.",
                    "isCorrect": false
                },
                {
                    "text": "Spring Cloud Gateway",
                    "rationale": "Spring Cloud Gateway is an API Gateway that provides routing, filtering, and security functionalities for microservices. It's not designed for centralized configuration management.",
                    "isCorrect": false
                },
                {
                    "text": "Spring Cloud Config",
                    "rationale": "Spring Cloud Config provides server and client-side support for externalized configuration in a distributed system. With a Config Server, you can centralize the management of property files for all your services across different environments, and services can refresh their configuration dynamically without needing a redeploy.",
                    "isCorrect": true
                },
                {
                    "text": "Spring Cloud Sleuth",
                    "rationale": "Spring Cloud Sleuth is used for distributed tracing, helping developers trace requests across multiple microservices by injecting correlation IDs into logs. It is not involved in configuration management.",
                    "isCorrect": false
                }
            ]
        }
    ]
};