const quizName = "Event Sourcing and CQRS Quiz";
const quizData = {
    "questions": [
        {
            "question": "In an Event Sourcing system, what is the fundamental and immutable source of truth for an application's state?",
            "hint": "Consider how state is reconstructed over time.",
            "answerOptions": [
                {
                    "text": "The current state snapshots stored in a relational database.",
                    "rationale": "Snapshots are derived, point-in-time representations, not the fundamental source of truth. They are used for performance optimization in reconstruction.",
                    "isCorrect": false
                },
                {
                    "text": "A log of domain events, each representing a change.",
                    "rationale": "In Event Sourcing, the immutable sequence of domain events is the canonical source of truth. The application state is derived by replaying these events.",
                    "isCorrect": true
                },
                {
                    "text": "An in-memory cache of the most recent aggregate states.",
                    "rationale": "An in-memory cache is transient and volatile, not an immutable source of truth.",
                    "isCorrect": false
                },
                {
                    "text": "The denormalized read models used by the query side.",
                    "rationale": "Read models are projections of the event stream, optimized for queries, but they are not the primary, immutable source of truth.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary problem that Command Query Responsibility Segregation (CQRS) aims to address in a system design?",
            "hint": "Think about the common challenges of a single data model for both writes and reads.",
            "answerOptions": [
                {
                    "text": "Ensuring strong consistency across distributed microservices.",
                    "rationale": "CQRS often introduces or embraces eventual consistency between write and read models, rather than guaranteeing strong consistency.",
                    "isCorrect": false
                },
                {
                    "text": "Optimizing for both highly transactional writes and complex analytical reads within the same data model.",
                    "rationale": "CQRS separates the concerns of writes (commands) and reads (queries), allowing for independent optimization, scaling, and even different data stores tailored for each purpose.",
                    "isCorrect": true
                },
                {
                    "text": "Eliminating the need for eventual consistency in large-scale systems.",
                    "rationale": "On the contrary, CQRS frequently leads to eventual consistency between the write model and its derived read models.",
                    "isCorrect": false
                },
                {
                    "text": "Reducing the overall data storage footprint by avoiding duplication.",
                    "rationale": "CQRS often results in increased data storage due to the creation of denormalized read models, which can duplicate data from the write model.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following is a significant architectural benefit provided by Event Sourcing?",
            "hint": "Consider capabilities related to historical state and auditing.",
            "answerOptions": [
                {
                    "text": "Simplification of data schema evolution by enforcing strict ACID transactions.",
                    "rationale": "While event sourcing can help with schema evolution, it's not by enforcing strict ACID transactions, and schema evolution itself can still be complex, especially with replaying old events. ACID is typically for single operations/aggregates.",
                    "isCorrect": false
                },
                {
                    "text": "Direct support for complex, ad-hoc analytical queries on the current state without aggregation.",
                    "rationale": "This is typically a benefit of the read models in CQRS, not directly from the event store itself, which is optimized for appending and event retrieval by aggregate ID.",
                    "isCorrect": false
                },
                {
                    "text": "The ability to reconstruct the state of any aggregate at any point in time.",
                    "rationale": "By storing every state change as an event, Event Sourcing enables the reconstruction of an aggregate's state at any historical moment, facilitating temporal queries, debugging, and auditing.",
                    "isCorrect": true
                },
                {
                    "text": "Guaranteed real-time consistency between the write and read models.",
                    "rationale": "Event Sourcing often implies eventual consistency, especially when combined with CQRS, as read models are typically updated asynchronously from the event stream.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A common challenge when implementing Event Sourcing, especially in long-running systems, is related to:",
            "hint": "Think about how the structure of data changes over time in a system.",
            "answerOptions": [
                {
                    "text": "Managing synchronous communication between bounded contexts.",
                    "rationale": "While a general challenge in microservices, it's not specific to Event Sourcing. Event Sourcing often promotes asynchronous communication through events.",
                    "isCorrect": false
                },
                {
                    "text": "Handling schema evolution of events and replaying historical events.",
                    "rationale": "As systems evolve, the structure of events (their 'schema') can change. Replaying historical events with changed schemas requires careful versioning and migration strategies, posing a significant challenge.",
                    "isCorrect": true
                },
                {
                    "text": "Ensuring all read models are strongly consistent with the write model at all times.",
                    "rationale": "This isn't necessarily a 'challenge' but rather an intentional architectural choice; read models are typically eventually consistent. Attempting strong consistency in this setup negates many benefits.",
                    "isCorrect": false
                },
                {
                    "text": "Minimizing the number of aggregates in a domain.",
                    "rationale": "The number of aggregates is determined by the domain's business rules and transactional boundaries, not a direct implementation challenge of Event Sourcing itself.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "How does Command Query Responsibility Segregation (CQRS) typically complement an Event Sourcing (ES) system?",
            "hint": "Consider how data is consumed after it's produced by events.",
            "answerOptions": [
                {
                    "text": "CQRS helps to enforce strong ACID transactions on the event store.",
                    "rationale": "CQRS is about segregating reads from writes, not about transaction enforcement on the event store. Event stores are typically append-only and may not always be ACID compliant across multiple events.",
                    "isCorrect": false
                },
                {
                    "text": "CQRS provides a mechanism for optimizing read operations by building separate, denormalized read models from the event stream.",
                    "rationale": "This is the primary way CQRS complements ES. The event stream from ES serves as the input to project and build various read models optimized for specific queries, decoupling read performance from write complexity.",
                    "isCorrect": true
                },
                {
                    "text": "CQRS replaces the need for an event store by using a traditional relational database for all data.",
                    "rationale": "CQRS does not replace an event store; instead, it often works in conjunction with Event Sourcing, where the event store is the write-side data store.",
                    "isCorrect": false
                },
                {
                    "text": "CQRS simplifies the process of projecting events directly into a single, canonical data model for both reads and writes.",
                    "rationale": "CQRS is about *segregation* and typically involves *multiple* (often denormalized) read models, not a single canonical model for both reads and writes.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a CQRS architecture, what is the primary purpose of a 'read model' (or query model)?",
            "hint": "Think about the consumer of the read model and its optimization.",
            "answerOptions": [
                {
                    "text": "To persist the immutable history of all domain events.",
                    "rationale": "This is the role of the event store in an Event Sourcing system, not a CQRS read model.",
                    "isCorrect": false
                },
                {
                    "text": "To validate incoming commands against the current state of an aggregate.",
                    "rationale": "Command validation and state management for writes occur on the write side (e.g., within aggregates), not typically within read models.",
                    "isCorrect": false
                },
                {
                    "text": "To provide data optimized for specific queries or user interface display requirements.",
                    "rationale": "Read models are specialized data structures (often denormalized) built specifically to serve specific query patterns, reports, or UI needs, distinct from the write model.",
                    "isCorrect": true
                },
                {
                    "text": "To serve as the single source of truth for all application state.",
                    "rationale": "In systems using Event Sourcing, the event stream is the single source of truth. Read models are projections of that truth, tailored for consumption.",
                    "isCorrect": false
                }
            ]
        }
    ]
};