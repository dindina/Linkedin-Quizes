const quizName = "Event Driven Arhitecture Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary characteristic that defines an Event-Driven Architecture (EDA)?",
            "hint": "Think about how services interact in an EDA, focusing on communication style.",
            "answerOptions": [
                {
                    "text": "Services directly invoke each other's APIs synchronously to exchange data.",
                    "rationale": "This describes a traditional Request-Response or RPC (Remote Procedure Call) architecture, not an Event-Driven Architecture, which emphasizes asynchronous communication.",
                    "isCorrect": false
                },
                {
                    "text": "Components communicate asynchronously by producing and consuming immutable events.",
                    "rationale": "This is the core characteristic of EDA. Producers emit events describing what happened, and consumers react to these events asynchronously, leading to loose coupling.",
                    "isCorrect": true
                },
                {
                    "text": "All data changes are synchronized via a central, shared relational database.",
                    "rationale": "While some systems might use a shared database, this approach typically leads to tight coupling and is counter to the microservices philosophy often associated with EDA.",
                    "isCorrect": false
                },
                {
                    "text": "A single, monolithic application handles all business logic and data processing.",
                    "rationale": "EDA is often used in distributed systems and microservices architectures, which are the opposite of a monolithic application.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following is a primary benefit of adopting an Event-Driven Architecture?",
            "hint": "Consider the impact of EDA on service dependencies and system robustness.",
            "answerOptions": [
                {
                    "text": "Increased tight coupling between services, making dependencies explicit.",
                    "rationale": "EDA primarily aims to reduce tight coupling, promoting loose coupling by decoupling producers from consumers.",
                    "isCorrect": false
                },
                {
                    "text": "Simplified debugging due to clear, synchronous call stacks.",
                    "rationale": "Debugging in EDA can be more complex due to asynchronous flows, eventual consistency, and distributed tracing challenges, unlike synchronous call stacks.",
                    "isCorrect": false
                },
                {
                    "text": "Enhanced scalability and resilience through asynchronous processing and decoupling.",
                    "rationale": "By decoupling components and allowing asynchronous processing, EDA naturally supports independent scaling of services and improves resilience as one component's failure doesn't directly block others.",
                    "isCorrect": true
                },
                {
                    "text": "Guaranteed real-time strong data consistency across all microservices without eventual consistency.",
                    "rationale": "EDA often leads to 'eventual consistency,' where data consistency is achieved over time rather than instantaneously. Strong real-time consistency across distributed services is harder to guarantee with EDA's asynchronous nature.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A significant challenge in designing and operating an Event-Driven Architecture is:",
            "hint": "Think about the complexities introduced by distributed, asynchronous communication patterns.",
            "answerOptions": [
                {
                    "text": "Enforcing strict synchronous communication between all components.",
                    "rationale": "EDA promotes asynchronous communication, so enforcing synchronous communication would negate its core principles and benefits.",
                    "isCorrect": false
                },
                {
                    "text": "Managing eventual consistency and achieving distributed transaction integrity across services.",
                    "rationale": "This is a major challenge. Ensuring data consistency in a system where data propagates asynchronously (eventual consistency) and coordinating complex workflows that span multiple services (distributed transactions, often via Saga patterns) adds significant complexity.",
                    "isCorrect": true
                },
                {
                    "text": "Limiting the number of supported programming languages and technologies.",
                    "rationale": "EDA, especially with standardized event formats, is often language and technology agnostic, allowing services to be built with different stacks.",
                    "isCorrect": false
                },
                {
                    "text": "Eliminating the need for any form of message broker or queue.",
                    "rationale": "Event brokers (or message queues/buses) are fundamental components of most EDAs, facilitating reliable event delivery and decoupling.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In an Event-Driven Architecture, what is the primary role of an 'Event Broker' (e.g., Kafka, RabbitMQ, Amazon SQS)?",
            "hint": "Consider its function as an intermediary between event producers and consumers.",
            "answerOptions": [
                {
                    "text": "To execute business logic and process events directly.",
                    "rationale": "Business logic and event processing are typically handled by event consumers, not the broker itself.",
                    "isCorrect": false
                },
                {
                    "text": "To act as an intermediary for storing, routing, and delivering events reliably.",
                    "rationale": "The event broker's main role is to decouple producers from consumers, providing a reliable buffer, routing events to relevant consumers, and ensuring events are delivered, often with persistence capabilities.",
                    "isCorrect": true
                },
                {
                    "text": "To transform events from one data format to another for compatibility.",
                    "rationale": "While event transformation might be necessary, it's typically handled by dedicated 'event processors' or 'stream processors' rather than the core event broker's primary function.",
                    "isCorrect": false
                },
                {
                    "text": "To ensure synchronous communication between producers and consumers.",
                    "rationale": "Event brokers promote asynchronous communication, allowing producers and consumers to operate independently without direct knowledge of each other's availability.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Why is 'idempotency' a crucial concept for event consumers in an Event-Driven Architecture?",
            "hint": "Think about situations where an event might be delivered more than once.",
            "answerOptions": [
                {
                    "text": "It ensures that events are always processed in the exact order they were produced.",
                    "rationale": "While ordering is important for some event streams, idempotency is about handling duplicates, not guaranteeing strict order (which is a separate challenge).",
                    "isCorrect": false
                },
                {
                    "text": "It prevents consumers from crashing when processing malformed events.",
                    "rationale": "Resilience to malformed events is important but relates to robust parsing and error handling, not idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "It allows an event to be processed multiple times without causing unintended side effects.",
                    "rationale": "In distributed asynchronous systems, events can sometimes be delivered or processed more than once (e.g., due to network issues, retries). Idempotent consumers can safely handle these duplicates without corrupting data or performing actions multiple times.",
                    "isCorrect": true
                },
                {
                    "text": "It optimizes network latency for event delivery by reducing retries.",
                    "rationale": "Idempotency deals with the effects of processing, not directly with network latency or the reduction of transmission retries (though it makes retries safer).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of Event-Driven Architecture, what best describes a 'Domain Event'?",
            "hint": "Consider what these events represent within the business context.",
            "answerOptions": [
                {
                    "text": "A command that instructs a service to perform a specific action.",
                    "rationale": "Commands are imperative requests to do something. Domain events are declarative statements about something that has already happened.",
                    "isCorrect": false
                },
                {
                    "text": "A log entry purely for system debugging and monitoring purposes.",
                    "rationale": "While useful for debugging, domain events capture significant business facts, not just system operational logs.",
                    "isCorrect": false
                },
                {
                    "text": "A notification indicating that a significant business change or fact has occurred within a specific domain.",
                    "rationale": "Domain events represent a past fact or a state change within a specific business domain (e.g., 'OrderPlaced', 'PaymentReceived'). They are immutable records of something that happened.",
                    "isCorrect": true
                },
                {
                    "text": "A synchronous request for data from another service's database.",
                    "rationale": "This describes a query or an RPC call, not a domain event, which is typically an asynchronous notification of a state change.",
                    "isCorrect": false
                }
            ]
        }
    ]
};