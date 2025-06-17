const quizName = "Rest API Design Principles Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "Which of the following HTTP methods is *not* considered idempotent by RESTful API design principles?",
            "hint": "An idempotent operation is one that can be applied multiple times without changing the result beyond the initial application.",
            "answerOptions": [
                {
                    "text": "GET",
                    "rationale": "GET requests are idempotent because retrieving data multiple times does not change the server's state.",
                    "isCorrect": false
                },
                {
                    "text": "PUT",
                    "rationale": "PUT requests are idempotent because placing or updating a resource multiple times with the same data yields the same final state of that resource.",
                    "isCorrect": false
                },
                {
                    "text": "DELETE",
                    "rationale": "DELETE requests are idempotent because deleting a resource multiple times results in the resource being gone (the first time it's removed, subsequent times it's already gone, leading to the same final state).",
                    "isCorrect": false
                },
                {
                    "text": "POST",
                    "rationale": "POST requests are typically not idempotent because sending the same POST request multiple times often creates multiple identical resources or performs the same action multiple times, leading to different server states.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "When designing a REST API, which of the following is the most aligned with best practices for resource naming in URLs?",
            "hint": "Think about resources as 'things' rather than 'actions', and how collections of these 'things' should be represented.",
            "answerOptions": [
                {
                    "text": "Using verbs to describe actions (e.g., `/getUser`, `/createOrder`)",
                    "rationale": "REST principles advocate for resources to be nouns, and actions to be performed via standard HTTP methods (GET, POST, PUT, DELETE). Using verbs in URLs makes the API less resource-oriented.",
                    "isCorrect": false
                },
                {
                    "text": "Using singular nouns for collections (e.g., `/product` for all products)",
                    "rationale": "While resources are nouns, collections of resources should typically be represented by plural nouns (e.g., `/products`). A singular noun like `/product` would typically refer to a specific instance of a resource.",
                    "isCorrect": false
                },
                {
                    "text": "Using plural nouns to represent collections of resources (e.g., `/users`, `/products`)",
                    "rationale": "This is a fundamental REST principle. URLs should represent resources (nouns), and collections of resources are best represented by plural nouns to clearly distinguish them from individual resource instances.",
                    "isCorrect": true
                },
                {
                    "text": "Including database table names directly in the URL path (e.g., `/tbl_users`)",
                    "rationale": "URLs should be abstract and independent of the underlying implementation details like database table names. Exposing internal database structures breaks encapsulation and makes the API less stable to changes in the backend.",
                    "isCorrect": false
                }
            ]
        }
    ]
};