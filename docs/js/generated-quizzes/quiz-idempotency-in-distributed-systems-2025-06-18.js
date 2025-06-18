const quizName = "Idempotency in Distributed Systems Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary characteristic of an idempotent operation in a distributed system?",
            "hint": "Focus on the outcome after multiple identical requests.",
            "answerOptions": [
                {
                    "text": "It completes within a guaranteed time limit.",
                    "rationale": "This relates to real-time guarantees or latency, which is not the definition of idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "It produces the same side effect on the system, no matter how many times it is executed with the same inputs.",
                    "rationale": "This is the core definition of idempotency: repeated execution of the same operation yields the same result or state change as a single execution.",
                    "isCorrect": true
                },
                {
                    "text": "It ensures that a request is processed exactly once, even in the presence of failures.",
                    "rationale": "While idempotency helps achieve 'exactly-once' processing by making 'at-least-once' delivery safe, it is not the definition of idempotency itself. Idempotency refers to the property of the operation's effect.",
                    "isCorrect": false
                },
                {
                    "text": "It automatically retries failed requests indefinitely until success.",
                    "rationale": "Retries are a mechanism often used with idempotent operations, but an operation being idempotent doesn't mean it automatically retries.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In which common distributed system scenario is idempotency most critical for ensuring data consistency and reliability?",
            "hint": "Think about what happens when messages or requests can be lost or duplicated.",
            "answerOptions": [
                {
                    "text": "When processing large batch data jobs nightly.",
                    "rationale": "While useful, idempotency is more acutely critical in real-time transactional systems where network unreliability and retries are common.",
                    "isCorrect": false
                },
                {
                    "text": "When a client needs to retry a request to a server due to network timeouts or transient failures.",
                    "rationale": "This is precisely the scenario where idempotency is crucial. If a client retries a non-idempotent operation (e.g., transferring money) after a timeout, it could lead to duplicate side effects.",
                    "isCorrect": true
                },
                {
                    "text": "When ensuring low latency for real-time analytics dashboards.",
                    "rationale": "Low latency is a performance goal, not directly related to the consistency challenges that idempotency addresses.",
                    "isCorrect": false
                },
                {
                    "text": "When establishing secure communication channels using encryption protocols.",
                    "rationale": "Security is a different cross-cutting concern and not the primary driver for idempotency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which technique is most commonly employed to make state-changing operations, such as creating a financial transaction or updating an order status, idempotent?",
            "hint": "Think about how to uniquely identify a specific attempt at an operation.",
            "answerOptions": [
                {
                    "text": "Using a distributed lock for the entire operation.",
                    "rationale": "Distributed locks prevent concurrent access, but they don't solve the problem of a client retrying a request that might have already completed but timed out on the client side.",
                    "isCorrect": false
                },
                {
                    "text": "Implementing a circuit breaker to prevent cascading failures.",
                    "rationale": "Circuit breakers protect against system overload and cascading failures, but they don't inherently make individual operations idempotent.",
                    "isCorrect": false
                },
                {
                    "text": "Including a unique client-generated request ID (idempotency key) with each request and tracking processed IDs.",
                    "rationale": "This is the standard and most robust technique. The server stores these keys and ignores subsequent requests with the same key if the operation has already been completed or is in progress.",
                    "isCorrect": true
                },
                {
                    "text": "Replicating the database across multiple regions.",
                    "rationale": "Database replication improves availability and fault tolerance but doesn't inherently make application-level operations idempotent without specific application logic.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following HTTP operations is typically NOT idempotent by default, requiring specific design considerations to make it so?",
            "hint": "Consider what happens if you send the request multiple times without special handling.",
            "answerOptions": [
                {
                    "text": "`GET /users/{id}`",
                    "rationale": "`GET` operations are inherently idempotent because they are read-only and have no side effects on the server's state.",
                    "isCorrect": false
                },
                {
                    "text": "`PUT /users/{id}`",
                    "rationale": "`PUT` operations are typically idempotent as they represent a complete replacement or creation of a resource at a known URI. Repeated `PUT`s with the same data yield the same final state.",
                    "isCorrect": false
                },
                {
                    "text": "`DELETE /users/{id}`",
                    "rationale": "`DELETE` operations are idempotent. Deleting an already deleted resource results in the same final state (resource is absent) as deleting it once.",
                    "isCorrect": false
                },
                {
                    "text": "`POST /users`",
                    "rationale": "`POST` operations typically create a new resource with each invocation. Without an idempotency key or other specific handling, repeated `POST` requests to create a resource would result in multiple identical resources being created.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "What is a potential challenge or trade-off when implementing idempotency using client-generated request IDs in a high-throughput distributed system?",
            "hint": "Consider the overhead associated with storing and checking these IDs.",
            "answerOptions": [
                {
                    "text": "Increased network latency due to larger request payloads.",
                    "rationale": "While an idempotency key adds a small amount to the payload, the primary challenge is not significant network latency but rather server-side processing.",
                    "isCorrect": false
                },
                {
                    "text": "Higher storage and lookup costs for tracking processed request IDs.",
                    "rationale": "To ensure idempotency, the system must store and quickly look up all recently processed request IDs (idempotency keys), which can incur significant storage, memory, and database lookup overhead at scale.",
                    "isCorrect": true
                },
                {
                    "text": "Difficulty in scaling the API gateway layer.",
                    "rationale": "While gateways might participate, the core logic for idempotency key storage and lookup resides within the services, not primarily the API gateway.",
                    "isCorrect": false
                },
                {
                    "text": "Reduced system security due to exposed request metadata.",
                    "rationale": "Idempotency keys are typically GUIDs or UUIDs and, when handled securely, do not inherently reduce system security.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing an idempotent `POST` endpoint to create a new resource (e.g., `/orders`), what is the most robust strategy for handling a subsequent identical request if the first request already successfully created the resource?",
            "hint": "The key is to acknowledge the successful creation without creating duplicates or signaling an error for the client.",
            "answerOptions": [
                {
                    "text": "Return a `409 Conflict` status code.",
                    "rationale": "While `409 Conflict` could be used to indicate a resource already exists, for true idempotency, the goal is often to confirm the desired state has been achieved, rather than signaling an error that might cause the client to retry incorrectly.",
                    "isCorrect": false
                },
                {
                    "text": "Return a `200 OK` or `202 Accepted` status code, indicating the operation's *effect* has been achieved, potentially with the resource's ID from the first creation.",
                    "rationale": "This is the most robust and user-friendly approach. It tells the client that their desired state (resource created) has been met, even if it happened on an earlier attempt. Providing the existing resource's ID is also very helpful.",
                    "isCorrect": true
                },
                {
                    "text": "Create a new, duplicate resource with a different ID.",
                    "rationale": "This action defeats the purpose of idempotency, as it leads to duplicate resources and inconsistent state.",
                    "isCorrect": false
                },
                {
                    "text": "Automatically delete the first resource and create a new one.",
                    "rationale": "This is destructive and not how idempotent `POST` operations are typically handled; it would lead to data loss or unexpected side effects.",
                    "isCorrect": false
                }
            ]
        }
    ]
};