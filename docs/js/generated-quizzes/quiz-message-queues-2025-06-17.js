const quizName = "Message Queues Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary benefit of introducing a message queue into a distributed system architecture?",
            "hint": "Consider how components interact and what a message queue introduces to this interaction, especially regarding dependencies and time.",
            "answerOptions": [
                {
                    "text": "Ensuring immediate synchronous responses for all requests.",
                    "rationale": "Message queues are primarily used for asynchronous communication, meaning they do not guarantee immediate synchronous responses. In fact, they introduce latency by buffering messages.",
                    "isCorrect": false
                },
                {
                    "text": "Drastically simplifying database schema design.",
                    "rationale": "While message queues can simplify certain aspects of data processing by offloading tasks, their primary role is not in simplifying database schema design. Their impact on schema design is indirect at best.",
                    "isCorrect": false
                },
                {
                    "text": "Decoupling producers from consumers and enabling asynchronous communication.",
                    "rationale": "Message queues act as an intermediary, allowing producers to send messages without knowing or waiting for consumers, and vice-versa. This greatly reduces direct dependencies and enables components to operate independently and asynchronously, improving fault tolerance and scalability.",
                    "isCorrect": true
                },
                {
                    "text": "Strictly enforcing a single-threaded execution model for all services.",
                    "rationale": "Message queues promote parallel processing and distributed execution. They enable multiple consumers to process messages concurrently, which is the opposite of enforcing a single-threaded model.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of message queues, which delivery guarantee ensures that a message is processed at least once, even in the event of consumer or network failures?",
            "hint": "Think about what happens if a consumer fails after receiving a message but before successfully acknowledging it.",
            "answerOptions": [
                {
                    "text": "At-most-once",
                    "rationale": "At-most-once means a message is delivered zero or one time. If delivery or processing fails, the message might be lost and not re-delivered.",
                    "isCorrect": false
                },
                {
                    "text": "Exactly-once",
                    "rationale": "Exactly-once means a message is processed exactly one time. While highly desirable, it's very complex to achieve in distributed systems and often comes with significant performance overhead, typically requiring idempotent consumers and/or complex transaction mechanisms.",
                    "isCorrect": false
                },
                {
                    "text": "At-least-once",
                    "rationale": "At-least-once means a message is delivered one or more times. If a consumer fails to acknowledge a message (e.g., due to a crash during processing), the message queue will typically redeliver the message, ensuring it's processed eventually, though potentially multiple times. This requires consumers to be idempotent.",
                    "isCorrect": true
                },
                {
                    "text": "Best-effort",
                    "rationale": "Best-effort implies no strong guarantees, similar to UDP. Messages might be lost, duplicated, or delivered out of order without any specific assurance of successful delivery or processing.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a system with multiple instances of a service processing messages from a single queue, which common pattern ensures that each message is processed by only one service instance while enabling horizontal scalability?",
            "hint": "This pattern is crucial for distributing work among a pool of workers without duplicating tasks for the same message.",
            "answerOptions": [
                {
                    "text": "Fan-out pattern",
                    "rationale": "The Fan-out pattern (often associated with publish/subscribe models) delivers a single message to multiple distinct consumers, where each consumer receives its own copy of the message. This is not for ensuring unique processing by one of many identical workers.",
                    "isCorrect": false
                },
                {
                    "text": "Publish/Subscribe pattern",
                    "rationale": "In a Publish/Subscribe pattern, a publisher sends messages to a topic, and multiple subscribers (of potentially different types) receive copies of the message. This doesn't ensure that a message is processed by only one instance among a group of identical consumers.",
                    "isCorrect": false
                },
                {
                    "text": "Competing Consumers pattern",
                    "rationale": "The Competing Consumers pattern involves multiple consumer instances (often of the same type of service) reading from the same message queue. The queue ensures that each message is delivered to only one of the competing consumers, distributing the workload and enabling horizontal scaling while preventing duplicate processing.",
                    "isCorrect": true
                },
                {
                    "text": "Request/Reply pattern",
                    "rationale": "The Request/Reply pattern is typically used for synchronous communication over an asynchronous medium like a message queue, where a sender sends a request and expects a specific reply. It doesn't primarily describe how multiple identical consumers process messages uniquely from a single queue for workload distribution.",
                    "isCorrect": false
                }
            ]
        }
    ]
};