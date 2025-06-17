const quizName = "Distributed Transactions Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "What is the primary goal of the Two-Phase Commit (2PC) protocol in distributed transactions?",
            "hint": "Think about the 'ACID' properties, specifically 'A' (Atomicity).",
            "answerOptions": [
                {
                    "text": "To ensure strict serializability across all participating nodes.",
                    "rationale": "While 2PC aims for atomicity, which can contribute to isolation, its direct primary goal is not strict serializability (an isolation level) but rather atomicity.",
                    "isCorrect": false
                },
                {
                    "text": "To guarantee atomicity across all participating nodes, ensuring either all operations commit or all abort.",
                    "rationale": "2PC's fundamental purpose is to achieve atomic commitment in a distributed system, meaning a transaction either fully completes across all participants or fully rolls back, leaving no partial states.",
                    "isCorrect": true
                },
                {
                    "text": "To improve the performance of distributed database operations by reducing network overhead.",
                    "rationale": "2PC actually introduces significant network overhead due to multiple rounds of communication between the coordinator and participants, thus typically increasing latency rather than improving performance.",
                    "isCorrect": false
                },
                {
                    "text": "To prevent deadlocks in distributed systems by using a global lock manager.",
                    "rationale": "While 2PC involves locking resources, its primary mechanism is not to prevent deadlocks directly through a global lock manager, but to ensure atomicity by coordinating commit/rollback decisions.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following is a significant drawback of the Two-Phase Commit (2PC) protocol?",
            "hint": "Consider what happens if the coordinator fails during a critical phase, and its impact on participants.",
            "answerOptions": [
                {
                    "text": "It introduces high latency due to multiple network round-trips.",
                    "rationale": "While true that 2PC has high latency, the 'blocking problem' is often cited as a more critical system-level issue and a fundamental flaw.",
                    "isCorrect": false
                },
                {
                    "text": "It can lead to a 'blocking problem' if the coordinator fails after the commit decision, leaving participants in an indeterminate state, unable to complete or rollback.",
                    "rationale": "This is a major drawback. If the coordinator fails after participants have prepared to commit but before sending the global commit/abort decision, participants remain blocked, holding resources indefinitely until the coordinator recovers or external intervention occurs.",
                    "isCorrect": true
                },
                {
                    "text": "It is difficult to implement due to complex rollback mechanisms.",
                    "rationale": "Rollback is an integral part of the 2PC protocol and while requiring careful implementation, it's not considered the primary 'significant drawback' compared to the blocking issue.",
                    "isCorrect": false
                },
                {
                    "text": "It does not support transactions involving more than two participants.",
                    "rationale": "2PC is designed to work with any number of participants (N > 1), not just two. The 'two-phase' refers to the prepare and commit phases.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "How does the Saga pattern primarily achieve atomicity in distributed transactions, differing from traditional 2PC?",
            "hint": "Think about how it handles failure without a global, ACID-style commit.",
            "answerOptions": [
                {
                    "text": "By using a centralized transaction coordinator to manage global locks across all services.",
                    "rationale": "The Saga pattern avoids a centralized coordinator that holds global locks, which is characteristic of 2PC.",
                    "isCorrect": false
                },
                {
                    "text": "By ensuring all sub-transactions are eventually consistent and can be retried indefinitely.",
                    "rationale": "While Sagas can lead to eventual consistency, their mechanism for 'atomicity' (or rather, consistency) is not just retries, but a specific rollback strategy.",
                    "isCorrect": false
                },
                {
                    "text": "By executing a sequence of local transactions, each with its own compensating transaction to undo previous operations in case of failure.",
                    "rationale": "This is the core concept of Sagas. Each step is a local ACID transaction. If a later step fails, preceding successful steps are undone by executing their corresponding compensating transactions.",
                    "isCorrect": true
                },
                {
                    "text": "By relying on a distributed consensus algorithm like Paxos or Raft to agree on the commit order.",
                    "rationale": "Distributed consensus algorithms like Paxos or Raft are primarily used for replicating state and achieving strong consistency in distributed data stores, not for coordinating application-level distributed transactions like Sagas.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is a key benefit of using the Saga pattern over Two-Phase Commit (2PC) for distributed transactions?",
            "hint": "Consider the impact on availability and scalability when a central point of coordination is removed.",
            "answerOptions": [
                {
                    "text": "It guarantees strict ACID compliance, including global isolation.",
                    "rationale": "The Saga pattern typically sacrifices global isolation (allowing intermediate states to be visible) in favor of availability and throughput, meaning it does not guarantee strict ACID compliance.",
                    "isCorrect": false
                },
                {
                    "text": "It eliminates the need for any form of eventual consistency.",
                    "rationale": "On the contrary, the Saga pattern often results in eventual consistency, as intermediate states of the overall business transaction might be visible before completion or compensation.",
                    "isCorrect": false
                },
                {
                    "text": "It avoids the blocking problem and improves availability by not requiring all participants to be online simultaneously for a global commit.",
                    "rationale": "Sagas avoid the blocking problem inherent in 2PC because each step is a local transaction. They improve availability as partial failures can be compensated, and no global lock holds participants hostage.",
                    "isCorrect": true
                },
                {
                    "text": "It simplifies the development process by removing the need for explicit error handling.",
                    "rationale": "Sagas significantly increase the complexity of development due to the need to define, implement, and manage compensating transactions for every step, which is a form of explicit error handling.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of distributed systems, why is achieving strict atomicity (all-or-nothing) across multiple independent services inherently challenging?",
            "hint": "Consider the implications of independent service failures and network unreliability.",
            "answerOptions": [
                {
                    "text": "Because global clocks cannot be perfectly synchronized across all services, making transaction ordering difficult.",
                    "rationale": "Clock synchronization is important for consistency and ordering (e.g., in distributed databases), but it's not the primary inherent challenge to achieving atomicity itself in the face of independent failures.",
                    "isCorrect": false
                },
                {
                    "text": "Due to the independent failure modes of services and the impossibility of atomic commitment without a single point of coordination that can also fail.",
                    "rationale": "This is the core reason. In a distributed system, services can fail independently, and network partitions can occur. Achieving a true 'all or nothing' across independent, potentially failing components without a single point of coordination (which itself becomes a single point of failure) is fundamentally hard.",
                    "isCorrect": true
                },
                {
                    "text": "Services must always use different database technologies, making interoperability difficult.",
                    "rationale": "While different technologies can add complexity, the challenge of atomicity is fundamental to distributed systems, regardless of whether services use the same or different database technologies.",
                    "isCorrect": false
                },
                {
                    "text": "Network bandwidth limitations prevent the rapid exchange of commit messages.",
                    "rationale": "Network latency and bandwidth can impact performance, but they don't fundamentally prevent the logical guarantee of atomicity; the challenge lies in guaranteeing completion or rollback despite unpredictable failures.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following patterns is an alternative to Two-Phase Commit (2PC) that focuses on explicit 'prepare', 'confirm', and 'cancel' phases for each participant, offering more control than Sagas but still requiring application-level logic?",
            "hint": "This pattern's name often stands for 'Try, Confirm, Cancel'.",
            "answerOptions": [
                {
                    "text": "Eventual Consistency Model.",
                    "rationale": "Eventual consistency is a consistency model, not a specific distributed transaction pattern involving explicit 'prepare/confirm/cancel' phases for operations.",
                    "isCorrect": false
                },
                {
                    "text": "Idempotent Consumer Pattern.",
                    "rationale": "The Idempotent Consumer pattern ensures that processing a message multiple times has the same effect as processing it once, but it's not a distributed transaction pattern like TCC.",
                    "isCorrect": false
                },
                {
                    "text": "Try-Confirm-Cancel (TCC) Pattern.",
                    "rationale": "The TCC pattern aligns perfectly with the description: it involves a 'Try' phase (resource reservation), a 'Confirm' phase (actual commitment), and a 'Cancel' phase (rollback), requiring explicit application logic for each step.",
                    "isCorrect": true
                },
                {
                    "text": "Leader-Follower Replication.",
                    "rationale": "Leader-Follower replication is a data replication strategy for databases or stateful services, not a pattern for coordinating distributed transactions across multiple independent services.",
                    "isCorrect": false
                }
            ]
        }
    ]
};