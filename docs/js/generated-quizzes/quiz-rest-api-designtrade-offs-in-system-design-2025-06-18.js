const quizName = "REST API DesignTrade-offs in System Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which REST API versioning strategy typically offers the best cacheability for proxy caches but can lead to 'URL proliferation' if not managed carefully?",
            "hint": "Consider how different versioning methods affect the entire URI that a cache uses as a key.",
            "answerOptions": [
                {
                    "text": "URI Path Versioning (e.g., /v1/users)",
                    "rationale": "URI path versioning creates distinct URLs for each version, allowing proxy caches to easily cache responses for different versions independently without needing to interpret headers or query parameters. However, it leads to new unique URLs for every version, which can proliferate.",
                    "isCorrect": true
                },
                {
                    "text": "Custom Header Versioning (e.g., X-API-Version: 1)",
                    "rationale": "Custom header versioning makes the URL identical across versions. Caches would need to be configured with 'Vary' headers (Vary: X-API-Version) to distinguish responses, adding complexity and potentially reducing cache hit rates if not configured correctly.",
                    "isCorrect": false
                },
                {
                    "text": "Query Parameter Versioning (e.g., /users?api-version=1)",
                    "rationale": "Query parameter versioning also uses the same base URL. While query parameters are part of the cache key, simple caches might ignore them, or it might lead to many cache entries for similar resources, reducing efficiency. It also exposes versioning in the URL, which can be less clean than path versioning.",
                    "isCorrect": false
                },
                {
                    "text": "Media Type Versioning (e.g., Accept: application/vnd.myapi.v1+json)",
                    "rationale": "Media type versioning uses the Accept header. Similar to custom headers, it requires proper 'Vary' header configuration for caching and can be more complex for clients to implement correctly.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A system processes a high volume of real-time sensor data, and clients need to paginate through the latest entries while ensuring no data is missed or duplicated due to new entries arriving. Which pagination strategy is generally more suitable for this scenario?",
            "hint": "Think about how new data insertions affect the page offsets in different strategies, especially in a rapidly changing dataset.",
            "answerOptions": [
                {
                    "text": "Offset-based pagination (e.g., ?offset=10&limit=5)",
                    "rationale": "Offset-based pagination is problematic for frequently changing datasets. If new items are added or deleted while a client is paginating, the 'offset' will shift, potentially causing items to be skipped or duplicated across pages.",
                    "isCorrect": false
                },
                {
                    "text": "Page-number based pagination (e.g., ?page=2&size=5)",
                    "rationale": "Page-number based pagination is essentially a user-friendly abstraction of offset-based pagination and suffers from the same issues of inconsistency with dynamic datasets.",
                    "isCorrect": false
                },
                {
                    "text": "Cursor-based pagination (e.g., ?after=cursor_value&limit=5)",
                    "rationale": "Cursor-based pagination (also known as keyset or token-based) uses a unique, immutable identifier (the 'cursor') of the last item from the previous page to fetch the next set of items. This strategy is robust for dynamic datasets because new insertions or deletions elsewhere in the dataset do not affect the relative position of items after the cursor, preventing skips or duplicates.",
                    "isCorrect": true
                },
                {
                    "text": "Link header pagination (using rel=\"next\", rel=\"prev\")",
                    "rationale": "Link header pagination describes how the pagination links are communicated to the client (e.g., via the Link HTTP header), but it doesn't define the underlying strategy (offset vs. cursor). A cursor-based strategy can still use Link headers.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a REST API, what is the primary trade-off of exposing very granular resources (e.g., separate endpoints for user profiles, addresses, and contact info) versus a single, larger user resource that encompasses all details?",
            "hint": "Consider the number of requests required versus the amount of data transferred in each request.",
            "answerOptions": [
                {
                    "text": "Improved security vs. increased latency",
                    "rationale": "While granularity can enable more fine-grained access control (which relates to security), it's not the primary trade-off being described. Increased latency is a consequence of more round trips, but security isn't the direct opposing factor here.",
                    "isCorrect": false
                },
                {
                    "text": "Reduced server load vs. increased client-side complexity",
                    "rationale": "More granular resources can sometimes lead to *increased* server load due to more individual requests, especially if the client needs to aggregate data. Client-side complexity often increases as the client has to make multiple calls and combine data.",
                    "isCorrect": false
                },
                {
                    "text": "More round trips/network overhead vs. reduced over-fetching",
                    "rationale": "Exposing granular resources means clients might need to make multiple API calls to gather all necessary data (more round trips, higher network overhead). However, each call fetches only the specific data needed, which reduces 'over-fetching' (transferring data the client doesn't immediately use).",
                    "isCorrect": true
                },
                {
                    "text": "Simpler caching strategies vs. more complex authorization",
                    "rationale": "Caching can become more complex with many small resources as clients might need to invalidate multiple caches. Authorization can be simpler for individual resources but potentially more complex if client-side aggregation requires multiple permissions.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For an internal microservice communication where performance and payload size are critical, but human readability of the payload is less of a concern, which data format would typically be preferred over JSON?",
            "hint": "Think about binary serialization formats designed for efficiency.",
            "answerOptions": [
                {
                    "text": "XML",
                    "rationale": "XML is human-readable but is generally more verbose and less efficient in terms of parsing speed and payload size compared to JSON, and significantly less efficient than binary formats.",
                    "isCorrect": false
                },
                {
                    "text": "YAML",
                    "rationale": "YAML is designed for human readability and configuration files. It is even more verbose than JSON in many cases and not optimized for high-performance, compact data exchange between services.",
                    "isCorrect": false
                },
                {
                    "text": "Protobuf (Protocol Buffers)",
                    "rationale": "Protobuf is a language-neutral, platform-neutral, extensible mechanism for serializing structured data. It compiles schema into highly efficient, compact binary formats, making it ideal for high-performance inter-service communication where human readability is not a priority.",
                    "isCorrect": true
                },
                {
                    "text": "HTML",
                    "rationale": "HTML is a markup language for creating web pages and is not used for structured data exchange between services in a REST API context.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Allowing clients to request specific fields in a REST API response (e.g., GET /users/123?fields=name,email) offers what primary benefit at the cost of increased server-side complexity?",
            "hint": "Focus on network efficiency and the amount of data transferred.",
            "answerOptions": [
                {
                    "text": "Enhanced security by limiting exposed data",
                    "rationale": "While it can reduce data exposure on the network, the data is still inherently accessible if the client is authorized. The primary benefit isn't security, but performance and bandwidth.",
                    "isCorrect": false
                },
                {
                    "text": "Improved API cacheability",
                    "rationale": "This can make caching more complex rather than simpler. Each unique combination of requested fields results in a different cache key, potentially reducing cache hit rates.",
                    "isCorrect": false
                },
                {
                    "text": "Reduced network bandwidth and faster response times for clients",
                    "rationale": "By allowing clients to specify exactly which fields they need, the API avoids 'over-fetching' unnecessary data. This significantly reduces the size of the response payload, leading to lower network bandwidth usage and faster transfer times, especially for clients with limited bandwidth or high latency.",
                    "isCorrect": true
                },
                {
                    "text": "Simplified client-side data parsing",
                    "rationale": "While the *amount* of data to parse is less, the parsing logic itself might not be simpler. Clients still need to handle the structure of the partial response. The main benefit is not parsing simplification, but data transfer efficiency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing an API for creating resources, which HTTP method is non-idempotent by default, meaning repeated identical requests can lead to multiple identical resources being created, and thus requires careful handling of retries?",
            "hint": "Consider which method is typically used to *create* new resources without a client-provided identifier, where the server might generate a unique ID on each invocation.",
            "answerOptions": [
                {
                    "text": "GET",
                    "rationale": "GET is idempotent and safe; it only retrieves data and has no side effects on the server state.",
                    "isCorrect": false
                },
                {
                    "text": "PUT",
                    "rationale": "PUT is idempotent. It is used to create or update a resource at a *specific, client-defined* URI. If you PUT the same representation to the same URI multiple times, the resource's state will remain the same after the first successful request.",
                    "isCorrect": false
                },
                {
                    "text": "DELETE",
                    "rationale": "DELETE is idempotent. Deleting a resource multiple times has the same effect as deleting it once (the resource remains deleted).",
                    "isCorrect": false
                },
                {
                    "text": "POST",
                    "rationale": "POST is non-idempotent. It is commonly used to create new resources where the server assigns the identifier. If a client sends the same POST request multiple times (e.g., due to a network timeout and retry), it can result in multiple identical resources being created on the server, each with a new, distinct identifier.",
                    "isCorrect": true
                }
            ]
        }
    ]
};