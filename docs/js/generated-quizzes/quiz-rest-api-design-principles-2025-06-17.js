const quizName = "Rest API Design Principles Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "A core principle of REST API design is 'Statelessness.' What does this principle primarily imply for the server's interaction with clients?",
            "hint": "Consider what kind of information the server should and should not retain about a client's ongoing interaction between individual requests.",
            "answerOptions": [
                {
                    "text": "The server must not store any session state or client context on the server-side between requests.",
                    "rationale": "Correct. Statelessness dictates that each request from a client to the server must contain all the information necessary to understand the request, and the server should not rely on any stored context from previous requests. This enhances scalability, reliability, and visibility.",
                    "isCorrect": true
                },
                {
                    "text": "The server should maintain a persistent, stateful connection with each client throughout their session.",
                    "rationale": "Incorrect. This describes a stateful interaction, which directly contradicts the stateless principle of REST. REST promotes independent requests to improve scalability and reduce server complexity.",
                    "isCorrect": false
                },
                {
                    "text": "The server is allowed to cache client-specific data indefinitely to improve performance.",
                    "rationale": "Incorrect. While caching is a REST principle and can improve performance (for example, caching responses), 'client-specific data' that represents session state and changes the server's behavior per client across requests would violate statelessness. The server must not rely on such state to fulfill a request.",
                    "isCorrect": false
                },
                {
                    "text": "All API requests must be idempotent to ensure data consistency across multiple calls.",
                    "rationale": "Incorrect. Idempotency (making the same request multiple times having the same effect as making it once) is a desirable characteristic for certain HTTP methods (like PUT, DELETE) and enhances robustness, but it is not the primary implication of 'Statelessness' for the server's state management. Statelessness facilitates idempotency but isn't defined by it.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing RESTful URIs for an API, which of the following is considered a best practice?",
            "hint": "Focus on how resources should be identified and structured in the URI path, thinking about parts of speech and common conventions.",
            "answerOptions": [
                {
                    "text": "Using verbs in URIs to describe operations (e.g., `/createUser`, `/deleteOrder`).",
                    "rationale": "Incorrect. REST principles advocate for URIs to identify resources using nouns, and HTTP methods (GET, POST, PUT, DELETE) to describe the operation to be performed on those resources. Verbs in URIs make them less resource-centric and redundant with HTTP methods.",
                    "isCorrect": false
                },
                {
                    "text": "Using plural nouns for collections (e.g., `/products`, `/orders`) and singular nouns for specific resources (e.g., `/products/123`).",
                    "rationale": "Correct. This is a widely accepted best practice for RESTful URI design. Plural nouns represent collections, and appending an identifier (like an ID) targets a specific resource within that collection. This makes URIs intuitive, predictable, and resource-oriented.",
                    "isCorrect": true
                },
                {
                    "text": "Including API version numbers directly in the URI path (e.g., `/api/v2/users`) for all versions.",
                    "rationale": "Incorrect. While path versioning is a common practice, it's often debated. Some argue it violates the principle of stable URIs as the URI changes with new versions. Header versioning (e.g., 'Accept' header) or content negotiation is often preferred for maintaining more stable resource identifiers. More importantly, this is about versioning strategy, not intrinsic resource naming convention.",
                    "isCorrect": false
                },
                {
                    "text": "Using camelCase or PascalCase for URI path segments (e.g., `/userAccounts`, `/ProductOrders`).",
                    "rationale": "Incorrect. The common convention for URI paths is to use lowercase letters and hyphens (kebab-case) to separate words (e.g., `/user-accounts`, `/product-orders`). This improves readability, avoids case-sensitivity issues on some systems, and aligns with common web URL conventions.",
                    "isCorrect": false
                }
            ]
        }
    ]
};