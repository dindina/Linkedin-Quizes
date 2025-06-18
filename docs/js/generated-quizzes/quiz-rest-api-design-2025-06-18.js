const quizName = "REST API Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which of the following HTTP methods is NOT inherently idempotent?",
            "hint": "An idempotent operation can be applied multiple times without changing the result beyond the initial application. Think about which method usually creates a *new* resource with each call.",
            "answerOptions": [
                {
                    "text": "GET",
                    "rationale": "GET requests are used to retrieve data and do not modify the server state, making them inherently idempotent.",
                    "isCorrect": false
                },
                {
                    "text": "PUT",
                    "rationale": "PUT requests are used to replace an entire resource at a specified URI. Sending the same PUT request multiple times will result in the same resource state, making it idempotent.",
                    "isCorrect": false
                },
                {
                    "text": "DELETE",
                    "rationale": "DELETE requests are used to remove a resource. After the first successful deletion, subsequent identical DELETE requests will still result in the resource being absent, making it idempotent.",
                    "isCorrect": false
                },
                {
                    "text": "POST",
                    "rationale": "POST requests are typically used to create new resources. Each identical POST request might create a new, distinct resource, making it not idempotent.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "What is the recommended practice for naming collections of resources in REST API URIs?",
            "hint": "Consider how you would naturally refer to a group of similar items.",
            "answerOptions": [
                {
                    "text": "Singular nouns (e.g., /user)",
                    "rationale": "Singular nouns are typically used for specific, individual resource instances (e.g., /users/{id}), not collections.",
                    "isCorrect": false
                },
                {
                    "text": "Plural nouns (e.g., /users)",
                    "rationale": "Using plural nouns for collections (e.g., /users, /products) is a widely accepted RESTful best practice, making URIs intuitive and consistent.",
                    "isCorrect": true
                },
                {
                    "text": "Verbs (e.g., /getUsers)",
                    "rationale": "URIs should represent resources, not actions. Actions are conveyed by HTTP methods (GET, POST, PUT, DELETE, etc.).",
                    "isCorrect": false
                },
                {
                    "text": "CamelCase nouns (e.g., /UserAccounts)",
                    "rationale": "While 'UserAccounts' is a noun, the recommendation is typically for lowercase, plural nouns (e.g., /user-accounts or /users), following a consistent casing convention (often kebab-case).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which REST architectural constraint emphasizes that clients should interact with the server solely through hypermedia links provided by the server, rather than hardcoding URIs?",
            "hint": "This principle promotes discoverability and evolvability of APIs by allowing the server to dynamically guide the client through the application's state.",
            "answerOptions": [
                {
                    "text": "Statelessness",
                    "rationale": "Statelessness means the server does not store any client context between requests. While important, it does not directly address hypermedia links for navigation.",
                    "isCorrect": false
                },
                {
                    "text": "Client-Server",
                    "rationale": "Client-Server is a fundamental principle separating concerns, but it doesn't specifically mandate interaction via hypermedia.",
                    "isCorrect": false
                },
                {
                    "text": "Uniform Interface",
                    "rationale": "Uniform Interface is a broad constraint that HATEOAS is a part of, but HATEOAS is the specific principle that mandates hypermedia-driven interaction.",
                    "isCorrect": false
                },
                {
                    "text": "HATEOAS (Hypermedia as the Engine of Application State)",
                    "rationale": "HATEOAS is the specific REST constraint that dictates that the client should find out how to interact with the server based on the hypermedia controls (links) returned in the responses.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "When designing a REST API, which versioning strategy is generally considered the *least* preferred due to potential issues with caching, request uniformity, and non-representational resource identification?",
            "hint": "Think about which method might cause issues with standard HTTP caching mechanisms or make a URI less 'uniform' in identifying a resource.",
            "answerOptions": [
                {
                    "text": "URI Path Versioning (e.g., /v1/users)",
                    "rationale": "URI path versioning is a common and widely accepted approach, as it clearly distinguishes different API versions as separate resources.",
                    "isCorrect": false
                },
                {
                    "text": "Query Parameter Versioning (e.g., /users?version=1)",
                    "rationale": "Query parameter versioning is generally discouraged. It can cause issues with caching (as the base URI is the same), isn't truly identifying a different 'resource' from a REST perspective, and can lead to non-uniform resource identifiers.",
                    "isCorrect": true
                },
                {
                    "text": "Custom Header Versioning (e.g., X-API-Version: 1)",
                    "rationale": "Custom header versioning is a valid and often preferred alternative, as it keeps the URI clean and allows for content negotiation based on headers.",
                    "isCorrect": false
                },
                {
                    "text": "Media Type Versioning (Content Negotiation, e.g., Accept: application/vnd.myapi.v1+json)",
                    "rationale": "Media Type versioning is considered the most 'pure' RESTful approach, as it leverages standard HTTP content negotiation, but it can be more complex to implement and consume.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A client sends a POST request to create a new resource, but the request body contains invalid data (e.g., a required field is missing, or a field has an incorrect format). Which HTTP status code is most appropriate for the server to return?",
            "hint": "This indicates a problem with the client's request itself, not a server error or a resource not being found.",
            "answerOptions": [
                {
                    "text": "201 Created",
                    "rationale": "201 Created indicates that the request has been fulfilled and a new resource has been created as a result.",
                    "isCorrect": false
                },
                {
                    "text": "400 Bad Request",
                    "rationale": "400 Bad Request indicates that the server cannot process the request due to a client error, such as malformed request syntax, invalid request message framing, or deceptive request routing. This fits cases of invalid input data.",
                    "isCorrect": true
                },
                {
                    "text": "404 Not Found",
                    "rationale": "404 Not Found indicates that the requested resource could not be found on the server. It's not applicable when the issue is with the request body.",
                    "isCorrect": false
                },
                {
                    "text": "500 Internal Server Error",
                    "rationale": "500 Internal Server Error indicates a generic error that occurred on the server while processing the request, not due to an issue with the client's request itself.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To apply a *partial* modification to an existing resource at a known URI, which HTTP method is most semantically appropriate in a RESTful API?",
            "hint": "One method is for full replacement, another is specifically designed for incremental changes.",
            "answerOptions": [
                {
                    "text": "PUT",
                    "rationale": "PUT is used for replacing an entire resource at a specified URI. It expects the complete state of the resource in the request body.",
                    "isCorrect": false
                },
                {
                    "text": "POST",
                    "rationale": "POST is primarily used for creating new resources or submitting data for processing. While it can be used for updates in some non-standard ways, it's not semantically appropriate for partial updates to an existing resource.",
                    "isCorrect": false
                },
                {
                    "text": "PATCH",
                    "rationale": "PATCH is specifically designed for applying partial modifications to an existing resource. The request body contains a set of instructions describing the changes to be made.",
                    "isCorrect": true
                },
                {
                    "text": "GET",
                    "rationale": "GET is used for retrieving resource representations and does not modify the server state.",
                    "isCorrect": false
                }
            ]
        }
    ]
};