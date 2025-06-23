const quizName = "Saga Pattern for Distributed Transactions Quiz";
const quizData = {
    "questions": [
        {
            "question": "What primary problem does the Saga Pattern aim to solve in a microservices architecture?",
            "difficulty": 1,
            "hint": "Think about transactions that span multiple independent services and their dedicated databases.",
            "answerOptions": [
                {
                    "text": "Ensuring atomicity across distributed services without traditional two-phase commit.",
                    "rationale": "The Saga Pattern provides a way to manage distributed transactions by sequencing local transactions and using compensating transactions to handle failures, effectively achieving atomicity without the limitations of 2PC.",
                    "isCorrect": true
                },
                {
                    "text": "Centralizing database schema management for all microservices.",
                    "rationale": "The Saga Pattern does not address database schema management; microservices typically maintain their own independent databases.",
                    "isCorrect": false
                },
                {
                    "text": "Optimizing inter-service communication protocols for lower latency.",
                    "rationale": "While communication is involved, the primary goal of Saga is transaction management, not protocol optimization.",
                    "isCorrect": false
                },
                {
                    "text": "Providing a single point of failure for distributed systems.",
                    "rationale": "The Saga Pattern aims to reduce single points of failure by distributing responsibilities, not creating one.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of a Saga, what is the purpose of a 'compensating transaction'?",
            "difficulty": 2,
            "hint": "Consider what needs to happen if a multi-step process fails partway through.",
            "answerOptions": [
                {
                    "text": "To retry a failed transaction step until it succeeds.",
                    "rationale": "Retries are part of fault tolerance but not the primary purpose of a compensating transaction. Compensating transactions are for undoing, not redoing.",
                    "isCorrect": false
                },
                {
                    "text": "To reverse the effects of previously completed successful transactions in case of overall saga failure.",
                    "rationale": "Compensating transactions are designed to undo or counteract the changes made by preceding successful local transactions within a saga, if a subsequent step fails or the saga needs to be aborted.",
                    "isCorrect": true
                },
                {
                    "text": "To log all transaction failures for auditing purposes.",
                    "rationale": "Logging is a general practice for auditing but not the specific function of a compensating transaction.",
                    "isCorrect": false
                },
                {
                    "text": "To synchronize data between different microservices in real-time.",
                    "rationale": "Data synchronization is a broader concern; compensating transactions are specific to rolling back effects of a failed distributed transaction.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following best describes the 'Orchestration' approach in the Saga Pattern?",
            "difficulty": 2,
            "hint": "One approach involves a central coordinator, the other relies on events being published and consumed.",
            "answerOptions": [
                {
                    "text": "Each service publishes events, and other services react to these events to continue the saga.",
                    "rationale": "This describes the Choreography approach, where services implicitly coordinate by reacting to events.",
                    "isCorrect": false
                },
                {
                    "text": "A central service (orchestrator) directs and coordinates the execution of each step in the saga.",
                    "rationale": "In the orchestration approach, a dedicated orchestrator service manages the saga's state and tells each participating service what operation to perform next, including initiating compensating transactions if needed.",
                    "isCorrect": true
                },
                {
                    "text": "All services communicate directly with each other in a peer-to-peer fashion.",
                    "rationale": "While services communicate, the orchestration approach specifically introduces a central coordinator.",
                    "isCorrect": false
                },
                {
                    "text": "A distributed ledger records all transaction states without any central coordinator.",
                    "rationale": "A distributed ledger could be a component in some systems, but it doesn't define the orchestration approach of Saga.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "The Saga Pattern typically provides which type of consistency guarantee?",
            "difficulty": 2,
            "hint": "It's not immediate ACID atomicity. Think about how long it might take for all parts of the system to reflect the final state.",
            "answerOptions": [
                {
                    "text": "Strong Consistency (ACID Atomicity)",
                    "rationale": "Saga explicitly sacrifices immediate ACID atomicity for availability and loose coupling across distributed services. It does not provide strong consistency in the ACID sense.",
                    "isCorrect": false
                },
                {
                    "text": "Immediate Consistency",
                    "rationale": "Immediate consistency means that updates are seen instantly across all replicas/components. Saga, by design, allows for intermediate states and eventual resolution.",
                    "isCorrect": false
                },
                {
                    "text": "Eventual Consistency",
                    "rationale": "Saga ensures that all participating services will eventually reach a consistent state (either all operations completed or all compensated), but there may be transient inconsistencies during the saga's execution.",
                    "isCorrect": true
                },
                {
                    "text": "Linearizability",
                    "rationale": "Linearizability is a very strong consistency model, requiring that operations appear to occur instantaneously at some point between their invocation and response. Saga does not guarantee this.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is a primary advantage of using the Saga Pattern over the Two-Phase Commit (2PC) protocol in a highly distributed microservices environment?",
            "difficulty": 2,
            "hint": "Consider the impact of 2PC on service independence and uptime.",
            "answerOptions": [
                {
                    "text": "Saga provides stronger isolation guarantees for concurrent transactions.",
                    "rationale": "This is incorrect; Saga typically offers weaker isolation guarantees (e.g., eventual consistency) than 2PC.",
                    "isCorrect": false
                },
                {
                    "text": "Saga eliminates the need for any form of transaction coordination.",
                    "rationale": "This is incorrect; Saga provides a different form of coordination, either via an orchestrator or choreographed events.",
                    "isCorrect": false
                },
                {
                    "text": "Saga avoids the long-lived locks and blocking nature of 2PC, improving availability and decoupling services.",
                    "rationale": "2PC requires all participants to lock resources until all phases are complete, leading to blocking and reduced availability. Saga's local transactions release locks quickly, improving concurrency and decoupling services.",
                    "isCorrect": true
                },
                {
                    "text": "Saga guarantees real-time data consistency across all participating services.",
                    "rationale": "This is incorrect; Saga provides eventual consistency, not real-time consistency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Consider a 'Place Order' saga with the following steps: (1) Reserve Inventory, (2) Process Payment, (3) Ship Order. If 'Process Payment' fails after 'Reserve Inventory' has succeeded, what is the expected behavior in a well-implemented Saga?",
            "difficulty": 3,
            "hint": "Think about the role of compensating transactions and the ultimate goal of the saga.",
            "answerOptions": [
                {
                    "text": "The 'Reserve Inventory' step will automatically retry until 'Process Payment' succeeds.",
                    "rationale": "Retrying 'Process Payment' is possible, but if it ultimately fails, 'Reserve Inventory' must be compensated.",
                    "isCorrect": false
                },
                {
                    "text": "The entire saga will be rolled back, and 'Reserve Inventory' will be compensated (e.g., inventory released).",
                    "rationale": "Upon failure of a step, the saga initiates compensating transactions for all previously completed successful steps to ensure the entire distributed transaction is either fully completed or fully undone.",
                    "isCorrect": true
                },
                {
                    "text": "The system will partial-commit, keeping the inventory reserved but not processing payment or shipping.",
                    "rationale": "Partial commits are generally undesirable in transactions; Saga aims for eventual atomicity, meaning either all or none of the effects remain.",
                    "isCorrect": false
                },
                {
                    "text": "A manual intervention will be required to resolve the inconsistency.",
                    "rationale": "While manual intervention might be a fallback for unhandled exceptions, a well-implemented Saga aims for automated recovery via compensating transactions.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "One significant challenge or drawback of implementing the Saga Pattern is related to 'isolation levels.' Which statement accurately describes this challenge?",
            "difficulty": 3,
            "hint": "Without global locks, what happens if external services try to read data during an ongoing saga?",
            "answerOptions": [
                {
                    "text": "Saga inherently provides serializable isolation, making it overly complex to implement.",
                    "rationale": "Saga does not provide serializable isolation; it typically offers weaker isolation properties.",
                    "isCorrect": false
                },
                {
                    "text": "It's difficult to prevent 'dirty reads' or 'phantom reads' by external services interacting with the intermediate states of an in-flight saga.",
                    "rationale": "Because Sagagas execute local transactions and release locks, intermediate states are visible. External services might read inconsistent data (e.g., an order with reserved inventory but uncharged payment) before the saga completes or rolls back, leading to dirty reads or other isolation anomalies. This requires careful design of application-level consistency.",
                    "isCorrect": true
                },
                {
                    "text": "Saga guarantees strong consistency, leading to performance bottlenecks due to distributed locks.",
                    "rationale": "Saga prioritizes availability and throughput over strong consistency and specifically avoids distributed locks.",
                    "isCorrect": false
                },
                {
                    "text": "It makes it impossible to implement any form of read isolation for business transactions.",
                    "rationale": "While challenging, it's not impossible to implement some forms of read isolation; it often requires application-level handling, not database-level guarantees.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In which scenario would the Saga Pattern be a suitable choice for managing transactions?",
            "difficulty": 2,
            "hint": "Consider the characteristics of the services and the transaction requirements.",
            "answerOptions": [
                {
                    "text": "When dealing with simple, single-database transactions that require immediate ACID properties.",
                    "rationale": "For simple, single-database transactions, traditional ACID transactions are sufficient and simpler to implement.",
                    "isCorrect": false
                },
                {
                    "text": "When a business transaction spans multiple independent microservices, each with its own database, and strong immediate consistency is not a strict requirement.",
                    "rationale": "Saga is ideal for distributed transactions across independent services and databases, especially when the trade-off of eventual consistency for higher availability and throughput is acceptable.",
                    "isCorrect": true
                },
                {
                    "text": "When optimizing for maximum throughput in a system where all services share a single, centralized database.",
                    "rationale": "If all services share a single database, distributed transactions might not be necessary, or a simpler approach like a local transaction manager might suffice.",
                    "isCorrect": false
                },
                {
                    "text": "When a system requires strict global ACID compliance across all distributed components without any tolerance for eventual consistency.",
                    "rationale": "If strict global ACID compliance is a hard requirement, Saga is generally not suitable due to its eventual consistency model. Approaches like distributed transaction managers (e.g., XA) or design patterns like event sourcing might be considered, though they come with other complexities.",
                    "isCorrect": false
                }
            ]
        }
    ]
};