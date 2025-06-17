const quizName = "Rest API Design Principles Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "Which of the following HTTP methods, when applied multiple times with the same input, is typically *not* guaranteed to produce the same result (i.e., is not idempotent) in a REST API, especially when used for resource creation?",
            "hint": "Consider the side effects and the potential for creating duplicate resources or actions.",
            "answerOptions": [
                {
                    "text": "GET",
                    "rationale": "GET requests are designed to retrieve data and are inherently idempotent, as repeated requests for the same resource yield the same data without side effects on the server.",
                    "isCorrect": false
                },
                {
                    "text": "PUT",
                    "rationale": "PUT requests are used to update or replace a resource entirely. If a PUT request is made multiple times with the same payload to the same URI, the resource's state will remain the same after the first successful request, making it idempotent.",
                    "isCorrect": false
                },
                {
                    "text": "POST",
                    "rationale": "POST requests are typically used to create new resources. Sending the same POST request multiple times can result in the creation of multiple identical resources on the server (e.g., submitting an order form multiple times creates multiple orders), thus it is not idempotent.",
                    "isCorrect": true
                },
                {
                    "text": "DELETE",
                    "rationale": "DELETE requests are used to remove a resource. Once a resource is deleted, subsequent DELETE requests to the same URI will result in the same state (the resource remains absent), making it idempotent (though it might return a 404 Not Found after the first successful deletion, the resource's state is consistently 'deleted').",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A fundamental principle of REST API design is 'Statelessness'. What does this principle primarily imply about how a server should handle client requests?",
            "hint": "Think about where the session or context information is maintained.",
            "answerOptions": [
                {
                    "text": "The server must store client-specific session data between requests to maintain context.",
                    "rationale": "This is incorrect. Statelessness explicitly means the server does NOT store client session state between requests.",
                    "isCorrect": false
                },
                {
                    "text": "Each request from a client to the server must contain all the information necessary to understand and process the request, without relying on any stored server-side context.",
                    "rationale": "This is the correct definition of statelessness in REST. The server processes each request independently, relying solely on the information provided within that request.",
                    "isCorrect": true
                },
                {
                    "text": "The client should not make any state-changing requests (e.g., POST, PUT, DELETE) to the server.",
                    "rationale": "This is incorrect. Clients are expected to make state-changing requests in REST. Statelessness refers to the server's handling of the client-server interaction, not the client's ability to modify resources.",
                    "isCorrect": false
                },
                {
                    "text": "The server manages the entire application state, abstracting it from the client.",
                    "rationale": "This is incorrect. While the server manages its own resource state, the 'application state' in terms of user session or workflow context is managed by the client in a stateless architecture, with each request providing the necessary context.",
                    "isCorrect": false
                }
            ]
        }
    ]
};