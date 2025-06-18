const quizName = "CAP Theorem Quiz";
const quizData = {
    "questions": [
        {
            "question": "What do the letters C, A, and P represent in the CAP theorem?",
            "hint": "Each letter refers to a crucial property of a distributed data store.",
            "answerOptions": [
                {
                    "text": "Consistency, Atomicity, Performance",
                    "rationale": "Atomicity and Performance are not the terms used in the CAP theorem's fundamental properties.",
                    "isCorrect": false
                },
                {
                    "text": "Consistency, Availability, Partition Tolerance",
                    "rationale": "These are the correct three properties that the CAP theorem defines for a distributed system.",
                    "isCorrect": true
                },
                {
                    "text": "Concurrency, Availability, Predictability",
                    "rationale": "Concurrency and Predictability are not the terms used in the CAP theorem.",
                    "isCorrect": false
                },
                {
                    "text": "Cohesion, Access, Persistence",
                    "rationale": "These terms do not represent the C, A, and P of the CAP theorem.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "The CAP theorem states that in the presence of a network partition, a distributed system must choose between which two of the three properties?",
            "hint": "A network partition makes it impossible to guarantee all three simultaneously.",
            "answerOptions": [
                {
                    "text": "Consistency and Performance",
                    "rationale": "Performance is not one of the three properties of the CAP theorem.",
                    "isCorrect": false
                },
                {
                    "text": "Atomicity and Durability",
                    "rationale": "Atomicity and Durability are ACID properties, not the core trade-off of the CAP theorem.",
                    "isCorrect": false
                },
                {
                    "text": "Consistency and Availability",
                    "rationale": "During a network partition (P), a distributed system must sacrifice either Consistency (C) or Availability (A).",
                    "isCorrect": true
                },
                {
                    "text": "Availability and Scalability",
                    "rationale": "Scalability is a design goal, but not one of the three fundamental properties of the CAP theorem.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Consider a distributed system that prioritizes Consistency (C) and Partition Tolerance (P). What behavior would you expect from this system during a network partition?",
            "hint": "If consistency is paramount, data must not be contradictory, even if it means not all requests can be served.",
            "answerOptions": [
                {
                    "text": "The system will always process requests but may return stale data.",
                    "rationale": "This describes an Available and Partition Tolerant (AP) system, where availability is prioritized over strict consistency.",
                    "isCorrect": false
                },
                {
                    "text": "Some parts of the system may become unavailable to ensure data integrity.",
                    "rationale": "In a CP system, when a network partition occurs, nodes will stop serving requests if they cannot guarantee that the data they return is consistent with other nodes. This sacrifice of availability ensures consistency.",
                    "isCorrect": true
                },
                {
                    "text": "The system will continue to operate normally with no impact on any operation.",
                    "rationale": "This is generally impossible in a distributed system experiencing a partition, as the CAP theorem states you cannot have all three properties simultaneously.",
                    "isCorrect": false
                },
                {
                    "text": "Data will eventually become consistent after the partition heals.",
                    "rationale": "While data will eventually be consistent, this option doesn't describe the immediate behavior during the partition for a CP system, which prioritizes immediate consistency over availability.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A system designed to be Available (A) and Partition Tolerant (P) during a network partition would exhibit which characteristic?",
            "hint": "Prioritizing availability means the system should always respond, even if the data might not be perfectly up-to-date across all nodes.",
            "answerOptions": [
                {
                    "text": "All nodes will always return the most recent, synchronized data.",
                    "rationale": "This describes a system prioritizing Consistency, which would be sacrificed in an AP system during a partition.",
                    "isCorrect": false
                },
                {
                    "text": "The system may return stale or inconsistent data for a period, but it will remain responsive.",
                    "rationale": "In an AP system, during a network partition, nodes prioritize responding to requests (Availability) even if it means serving data that might not be fully consistent with other parts of the system. Eventual consistency is often adopted.",
                    "isCorrect": true
                },
                {
                    "text": "Write operations will be halted to prevent data divergence.",
                    "rationale": "Halting operations to prevent divergence is characteristic of a CP (Consistency and Partition Tolerance) system, not an AP system.",
                    "isCorrect": false
                },
                {
                    "text": "The system will go offline until the partition is resolved.",
                    "rationale": "Going offline or refusing requests is a characteristic of a system prioritizing consistency (CP) to avoid inconsistencies, not one prioritizing availability (AP).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following statements about the CAP theorem is TRUE?",
            "hint": "A key insight of the CAP theorem is that network partitions are unavoidable in large distributed systems.",
            "answerOptions": [
                {
                    "text": "A distributed system can always achieve all three properties: Consistency, Availability, and Partition Tolerance.",
                    "rationale": "This contradicts the core statement of the CAP theorem, which states you can only have two out of three during a network partition.",
                    "isCorrect": false
                },
                {
                    "text": "The CAP theorem primarily applies to single-node databases, not distributed systems.",
                    "rationale": "The CAP theorem specifically applies to distributed systems where network partitions are a potential issue. Single-node databases do not experience network partitions in the same way.",
                    "isCorrect": false
                },
                {
                    "text": "In the absence of a network partition, a distributed system can achieve both Consistency and Availability.",
                    "rationale": "The trade-off described by CAP (choosing between C and A) only becomes relevant when a network partition (P) occurs. If there is no partition, a system can theoretically maintain both Consistency and Availability.",
                    "isCorrect": true
                },
                {
                    "text": "The theorem states that you can pick any two out of the three properties (C, A, P) at any time, regardless of network conditions.",
                    "rationale": "This is a common misinterpretation. The 'choice' between C and A only becomes necessary WHEN a network partition (P) occurs. Since P is an almost certainty in large distributed systems, you effectively always need to plan for it.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A banking system that requires immediate data consistency across all read/write operations, even at the cost of some requests failing during network issues, is most likely prioritizing which two aspects of the CAP theorem?",
            "hint": "Think about what a banking system cannot tolerate losing or getting wrong, even if it means some operations might not complete immediately.",
            "answerOptions": [
                {
                    "text": "Consistency and Partition Tolerance (CP)",
                    "rationale": "Banking systems typically prioritize immediate consistency to prevent incorrect balances or transactions (C). They must also tolerate network failures (P). This means during a partition, they will sacrifice Availability by refusing operations that cannot guarantee consistency.",
                    "isCorrect": true
                },
                {
                    "text": "Availability and Partition Tolerance (AP)",
                    "rationale": "An AP system would prioritize being always available, potentially at the cost of immediate consistency, which is generally unacceptable for core banking operations.",
                    "isCorrect": false
                },
                {
                    "text": "Consistency and Availability (CA)",
                    "rationale": "A true CA system without partition tolerance is not realistic for a distributed banking system, as network partitions are inevitable. The choice is always between C and A in the presence of P.",
                    "isCorrect": false
                },
                {
                    "text": "Atomicity and Consistency (AC)",
                    "rationale": "Atomicity and Consistency are part of the ACID properties for transactions, not the core trade-offs of the CAP theorem.",
                    "isCorrect": false
                }
            ]
        }
    ]
};