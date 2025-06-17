const quizName = "Event Driven Architecture Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "What is a primary architectural benefit of adopting an Event-Driven Architecture (EDA) compared to a traditional synchronous request-response model for complex, distributed systems?",
            "hint": "Think about how services interact and their dependencies in an asynchronous message-passing system.",
            "answerOptions": [
                {
                    "text": "It guarantees strict ACID transactions across all microservices, simplifying distributed data management.",
                    "rationale": "EDA typically promotes eventual consistency rather than strict ACID transactions across distributed services, often requiring more complex compensation logic for data integrity.",
                    "isCorrect": false
                },
                {
                    "text": "It eliminates the need for any form of data replication or caching, reducing infrastructure complexity.",
                    "rationale": "EDA does not eliminate the need for data replication or caching; in fact, services often maintain local caches or materialized views of data derived from events, which can increase data redundancy.",
                    "isCorrect": false
                },
                {
                    "text": "It significantly enhances service coupling by allowing direct, synchronous calls between event producers and consumers.",
                    "rationale": "EDA's core principle is to *decouple* services by introducing an asynchronous event broker, rather than enhancing coupling or enabling direct synchronous calls.",
                    "isCorrect": false
                },
                {
                    "text": "It improves system resiliency, scalability, and flexibility by asynchronously decoupling services, allowing independent evolution and failure isolation.",
                    "rationale": "By decoupling services through events, EDA promotes independent deployment and scaling, improves fault tolerance (producer can continue even if consumer is down), and allows services to evolve independently, leading to higher resiliency and flexibility.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "Which of the following is a common architectural challenge specifically associated with implementing and operating an Event-Driven Architecture (EDA)?",
            "hint": "Consider the implications of asynchronous communication and distributed state.",
            "answerOptions": [
                {
                    "text": "Achieving strong consistency (ACID) across all distributed services without requiring complex compensation patterns.",
                    "rationale": "EDA often leads to eventual consistency, making strong ACID consistency across multiple services difficult without complex distributed transaction patterns or compensating actions, which is a challenge itself, not a simplification.",
                    "isCorrect": false
                },
                {
                    "text": "Simplifying debugging and tracing of end-to-end business processes due to the linear flow of control.",
                    "rationale": "Debugging and tracing in EDA can be significantly more complex than in synchronous request-response systems, as the flow of control is asynchronous and distributed across multiple services and event hops, making it non-linear.",
                    "isCorrect": false
                },
                {
                    "text": "Minimizing the impact of consumer failures on event producers due to tight synchronous coupling.",
                    "rationale": "EDA inherently reduces the impact of consumer failures on producers due to asynchronous decoupling, meaning the producer isn't blocked by the consumer's availability. This is a benefit, not a challenge related to 'tight synchronous coupling'.",
                    "isCorrect": false
                },
                {
                    "text": "Managing eventual consistency, ensuring correct event ordering, and handling duplicate event processing (idempotency) across distributed consumers.",
                    "rationale": "These are significant challenges in EDA. Eventual consistency requires careful design for data reconciliation. Maintaining strict event order can be complex across partitions or multiple consumers. Consumers must be designed to be idempotent to safely handle duplicate event deliveries, which are common in distributed messaging systems.",
                    "isCorrect": true
                }
            ]
        }
    ]
};