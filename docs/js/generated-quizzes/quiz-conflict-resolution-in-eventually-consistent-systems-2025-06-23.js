const quizName = "Conflict Resolution in Eventually Consistent Systems Quiz";
const quizData = {
    "questions": [
        {
            "question": "In the context of eventually consistent systems, what specifically constitutes a 'conflict'?",
            "difficulty": 1,
            "hint": "Think about what happens when multiple users or processes update the same data independently before synchronization.",
            "answerOptions": [
                {
                    "text": "When a read operation retrieves outdated data from a replica.",
                    "rationale": "This is a characteristic of eventual consistency, indicating stale data, but it's not the definition of a conflict itself.",
                    "isCorrect": false
                },
                {
                    "text": "When a node fails and data becomes temporarily unavailable.",
                    "rationale": "This describes a fault or availability issue, not a data conflict.",
                    "isCorrect": false
                },
                {
                    "text": "When two or more concurrent write operations are applied to the same data item on different replicas before they have a chance to synchronize.",
                    "rationale": "This is the core definition of a conflict in an eventually consistent system: concurrent, unsynchronized updates to the same piece of data.",
                    "isCorrect": true
                },
                {
                    "text": "When a system experiences high network latency between data centers.",
                    "rationale": "High latency affects the time to achieve consistency but doesn't define the conflict itself.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary drawback of using the Last Write Wins (LWW) strategy for conflict resolution in an eventually consistent system?",
            "difficulty": 2,
            "hint": "Consider what happens to the updates that are *not* chosen as the 'last write'.",
            "answerOptions": [
                {
                    "text": "It requires complex custom logic for every data type.",
                    "rationale": "LWW is generally simple to implement, often relying on timestamps or version numbers, not complex custom logic.",
                    "isCorrect": false
                },
                {
                    "text": "It can lead to data loss if the 'later' write overwrites valid concurrent updates based on an older state or just a timestamp.",
                    "rationale": "This is the major drawback. LWW discards all but one version, meaning genuinely useful concurrent changes might be lost if they are not the 'last write' or if the timestamp isn't truly reflective of causality.",
                    "isCorrect": true
                },
                {
                    "text": "It significantly increases network traffic due to constant version synchronization.",
                    "rationale": "LWW itself does not inherently increase network traffic compared to other methods; in fact, by discarding versions, it might even reduce it slightly by only keeping one.",
                    "isCorrect": false
                },
                {
                    "text": "It introduces high read latency for users accessing data.",
                    "rationale": "LWW primarily affects write consistency and potential data loss during resolution, not read latency directly.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "How do Vector Clocks primarily contribute to conflict resolution in eventually consistent distributed systems?",
            "difficulty": 2,
            "hint": "Vector clocks track the causality and concurrency of events across multiple nodes.",
            "answerOptions": [
                {
                    "text": "They enforce strong consistency by blocking writes until all replicas are updated.",
                    "rationale": "Vector clocks are used for detection and ordering within eventual consistency, not for enforcing strong consistency through blocking.",
                    "isCorrect": false
                },
                {
                    "text": "They provide a single, globally synchronized timestamp that determines the definitive order of all operations.",
                    "rationale": "Vector clocks do not provide a single global timestamp; rather, they provide a set of logical timestamps (one per node) that capture causal relationships.",
                    "isCorrect": false
                },
                {
                    "text": "They allow the system to detect if two updates are concurrent or if one causally precedes the other, enabling more informed resolution.",
                    "rationale": "This is the main purpose of vector clocks: to establish the causal relationship between events. If two updates are concurrent (neither causally precedes the other), a conflict is detected.",
                    "isCorrect": true
                },
                {
                    "text": "They automatically merge conflicting data by applying predefined rules without human intervention.",
                    "rationale": "Vector clocks detect conflicts; the actual merging or resolution logic is a separate step that uses the information provided by the vector clock.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In which scenario would client-side conflict resolution be a more appropriate choice than server-side resolution for an eventually consistent system?",
            "difficulty": 2,
            "hint": "Think about when the user's input or application-specific understanding is crucial for merging or resolving discrepancies.",
            "answerOptions": [
                {
                    "text": "When the system needs to guarantee strict serializability for all operations.",
                    "rationale": "Client-side resolution is typically used in systems where strong consistency isn't strictly enforced at all times, making it unsuitable for guaranteeing serializability.",
                    "isCorrect": false
                },
                {
                    "text": "When a human user's input or specific application logic is required to intelligently merge or choose between conflicting versions.",
                    "rationale": "Client-side resolution is ideal when the application has unique knowledge or a user needs to make a decision (e.g., merging contact details, editing a document with conflicting changes).",
                    "isCorrect": true
                },
                {
                    "text": "When minimizing network bandwidth usage is the absolute highest priority.",
                    "rationale": "Client-side resolution might involve sending more data (e.g., multiple versions for the client to choose from), which could increase bandwidth usage.",
                    "isCorrect": false
                },
                {
                    "text": "When dealing with simple, primitive data types like integers or strings where a simple overwrite is acceptable.",
                    "rationale": "For simple types, server-side Last Write Wins or a similar automated strategy is often sufficient and simpler to implement.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the fundamental advantage of using Conflict-free Replicated Data Types (CRDTs) in an eventually consistent system?",
            "difficulty": 3,
            "hint": "CRDTs are designed to ensure convergence *mathematically* without explicit conflict resolution logic. Think about their operational properties.",
            "answerOptions": [
                {
                    "text": "They guarantee linearizability across all replicas at all times.",
                    "rationale": "CRDTs achieve strong eventual consistency, meaning they converge to the same state eventually, but they do not guarantee linearizability (which requires operations to appear to occur instantaneously in a single, global order).",
                    "isCorrect": false
                },
                {
                    "text": "They eliminate the need for any form of replication by allowing direct peer-to-peer updates.",
                    "rationale": "CRDTs are specifically designed for replicated environments; they don't eliminate replication.",
                    "isCorrect": false
                },
                {
                    "text": "They provide mathematical guarantees that replicas will converge to the same state without requiring manual conflict resolution or complex merging logic.",
                    "rationale": "This is the core benefit. CRDT operations are designed to be commutative, associative, and idempotent (CAI), ensuring that applying them in any order on any replica leads to the same, correct final state.",
                    "isCorrect": true
                },
                {
                    "text": "They ensure that the most recent write always wins, preventing any data loss.",
                    "rationale": "While CRDTs often prevent data loss, they typically do so by integrating all changes, not by simply picking the 'last write,' which can cause loss.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A collaborative document editing application needs to handle concurrent modifications to the same paragraph by multiple users. Which conflict resolution strategy is generally most suitable for this scenario, and why?",
            "difficulty": 3,
            "hint": "Simple overwrites (like LWW) would be disastrous. Think about how collaborative editors work.",
            "answerOptions": [
                {
                    "text": "Last Write Wins (LWW), because it's simple and fast to implement.",
                    "rationale": "LWW would lead to significant data loss, as one user's entire paragraph update would overwrite another's, making collaborative editing impossible.",
                    "isCorrect": false
                },
                {
                    "text": "Server-side timestamps, to pick the version with the latest timestamp.",
                    "rationale": "Similar to LWW, this approach would cause data loss by discarding concurrent, valid edits made by different users.",
                    "isCorrect": false
                },
                {
                    "text": "Application-specific merge logic or Operational Transformation (OT), to intelligently integrate all valid concurrent changes.",
                    "rationale": "For collaborative editing, it's crucial to preserve all users' edits. Strategies like Operational Transformation (OT) or text-based CRDTs are designed to transform and apply concurrent changes in a way that converges to a coherent state without losing data.",
                    "isCorrect": true
                },
                {
                    "text": "Client-side manual resolution, where users are prompted to resolve conflicts.",
                    "rationale": "While possible, forcing users to manually resolve every minor conflict would be highly disruptive and lead to a poor user experience for continuous collaboration.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You are designing a globally distributed system where users can update their profile information (e.g., name, address, email). If two users concurrently update different fields of the *same* profile document on different replicas, and the system uses 'Last Write Wins' (LWW) based on document timestamp, what is the most likely undesirable outcome?",
            "difficulty": 3,
            "hint": "Consider a scenario where user A updates the `name` and user B updates the `email` of the *same* document concurrently. If one write overwrites the entire document.",
            "answerOptions": [
                {
                    "text": "Only the field that was updated first will be preserved, losing the later update.",
                    "rationale": "LWW means the *last* write wins, not the first. So, the concept of 'first' is incorrect here.",
                    "isCorrect": false
                },
                {
                    "text": "Both updates will be successfully merged and preserved without any loss.",
                    "rationale": "LWW at the document level means one entire document version overwrites another, resulting in loss of changes from the 'losing' document, even if they were to different fields.",
                    "isCorrect": false
                },
                {
                    "text": "The system will enter an inconsistent state that requires manual intervention to resolve.",
                    "rationale": "LWW provides an automatic resolution, even if the outcome is undesirable; it doesn't leave the system in an unresolved 'inconsistent state' requiring manual intervention.",
                    "isCorrect": false
                },
                {
                    "text": "One user's entire profile update (including fields they didn't touch) will overwrite the other user's update, leading to data loss for the overwritten fields.",
                    "rationale": "If LWW applies at the document level (based on a document timestamp), a concurrent update to one field by User A will be lost if User B's update (even to a different field) is considered the 'last write' and overwrites the entire document.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "What is the primary characteristic that allows Conflict-free Replicated Data Types (CRDTs) to guarantee strong eventual consistency without external coordination for conflict resolution?",
            "difficulty": 3,
            "hint": "Think about the mathematical properties of the operations applied to CRDTs.",
            "answerOptions": [
                {
                    "text": "They strictly enforce a global order of operations across all replicas.",
                    "rationale": "CRDTs are designed to operate without a strict global order of operations. They achieve convergence even if operations arrive out of order.",
                    "isCorrect": false
                },
                {
                    "text": "Their operations are designed to be commutative, associative, and idempotent (CAI), ensuring that applying them in any order on any replica leads to the same final state.",
                    "rationale": "This is the defining mathematical property of CRDTs. CAI ensures that all replicas will deterministically converge to the same state even with arbitrary message delays, duplication, and reordering, without needing explicit conflict resolution logic.",
                    "isCorrect": true
                },
                {
                    "text": "They rely on a central coordinator to resolve all conflicts before propagation.",
                    "rationale": "CRDTs are inherently decentralized and do not require a central coordinator for conflict resolution.",
                    "isCorrect": false
                },
                {
                    "text": "They use a Byzantine fault-tolerant consensus algorithm to agree on the correct state.",
                    "rationale": "While some distributed systems use BFT, CRDTs achieve convergence through their inherent design properties (CAI) rather than by running a consensus algorithm for every state transition.",
                    "isCorrect": false
                }
            ]
        }
    ]
};