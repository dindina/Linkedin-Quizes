const quizName = "Event Driven Architecture Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "Which of the following best describes a key advantage of adopting an Event-Driven Architecture (EDA) in a microservices system?",
            "hint": "Consider how services interact and evolve in an EDA paradigm compared to traditional synchronous communication.",
            "answerOptions": [
                {
                    "text": "It enforces strong synchronous coupling between services, ensuring immediate data consistency across all components.",
                    "rationale": "EDA promotes asynchronous communication and loose coupling, not strong synchronous coupling. Immediate data consistency is often sacrificed for scalability and availability through eventual consistency.",
                    "isCorrect": false
                },
                {
                    "text": "It eliminates the need for message brokers by allowing direct HTTP calls between all microservices.",
                    "rationale": "EDA typically relies heavily on message brokers or event buses to facilitate asynchronous communication and decoupling. Direct HTTP calls are characteristic of a request-response, not a pure event-driven model.",
                    "isCorrect": false
                },
                {
                    "text": "It significantly increases service decoupling, allowing independent development, deployment, and scaling of microservices.",
                    "rationale": "This is a primary benefit of EDA. Services communicate implicitly via events, reducing direct dependencies and enabling independent evolution and scaling without impacting other services.",
                    "isCorrect": true
                },
                {
                    "text": "It guarantees real-time, ACID-compliant transactions across distributed services without complex coordination.",
                    "rationale": "EDA often involves eventual consistency rather than strict ACID compliance across distributed services, and achieving transactional integrity in a distributed system still requires careful design (e.g., Saga patterns), it's not 'without complex coordination'.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In an Event-Driven Architecture, what is the primary mechanism for achieving 'eventual consistency' across multiple disparate services reacting to the same business event?",
            "hint": "Think about how data state propagates in a distributed, asynchronous system, and what guarantees are made over time.",
            "answerOptions": [
                {
                    "text": "Implementing two-phase commit (2PC) protocols across all event consumers.",
                    "rationale": "2PC is a protocol for distributed transactions aiming for immediate consistency, which often introduces high latency and reduces availability in highly distributed systems. EDA typically avoids 2PC for scalability.",
                    "isCorrect": false
                },
                {
                    "text": "Ensuring that all event consumers process events in a strictly sequential, global order.",
                    "rationale": "While event ordering can be important (e.g., within a specific aggregate or partition), strict global ordering across all events for all consumers is often impractical and not the primary mechanism for eventual consistency. Eventual consistency is about individual services catching up.",
                    "isCorrect": false
                },
                {
                    "text": "Each service processes relevant events independently and updates its own local read model, with the expectation that all services will eventually converge to a consistent state.",
                    "rationale": "This accurately describes how eventual consistency works in EDA. Services react to events asynchronously, update their internal state, and over time, all relevant services will reflect the changes, albeit not instantaneously.",
                    "isCorrect": true
                },
                {
                    "text": "Centralizing all business logic and data into a single, transactional database to avoid distributed state issues.",
                    "rationale": "This describes a monolithic approach or a highly centralized system, which goes against the distributed and decoupled nature of typical microservices-based Event-Driven Architectures.",
                    "isCorrect": false
                }
            ]
        }
    ]
};