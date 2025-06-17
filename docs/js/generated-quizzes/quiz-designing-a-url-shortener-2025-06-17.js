const quizName = "Designing a URL Shortener Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "When designing a URL shortener, which method is typically preferred for generating the unique short codes that are both compact and highly unlikely to collide, especially when considering the need for custom short URLs or predictable lengths?",
            "hint": "Think about converting a unique identifier into a shorter, base-encoded string.",
            "answerOptions": [
                {
                    "text": "MD5 Hashing of the original URL, truncated to 6 characters.",
                    "rationale": "MD5 hashes are long (128-bit) and difficult to make compact while guaranteeing uniqueness for a short prefix. Truncation significantly increases collision probability.",
                    "isCorrect": false
                },
                {
                    "text": "Incremental Integer IDs converted to Base62 encoding.",
                    "rationale": "This is a common and effective strategy. It generates unique, sequential IDs from a centralized or distributed counter, which are then converted to a shorter Base62 string (0-9, a-z, A-Z). This provides compactness, guaranteed uniqueness (from the original ID), and allows for easy custom key reservation.",
                    "isCorrect": true
                },
                {
                    "text": "UUIDs (Universally Unique Identifiers).",
                    "rationale": "While globally unique, standard UUIDs are typically 32 alphanumeric characters long (without hyphens), which is too long for a 'short' URL and inefficient for storage/lookup in this context.",
                    "isCorrect": false
                },
                {
                    "text": "Randomly generated strings of fixed length (e.g., 6 characters) without collision checking.",
                    "rationale": "Random strings alone, especially without collision checking against existing keys in the database, have a high probability of collision as the number of URLs grows, leading to broken links or system errors.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For the primary storage of `short_code` to `long_url` mappings in a high-traffic URL shortener, which type of database is generally most suitable given the primary operation is a simple key-value lookup and high read throughput?",
            "hint": "Consider the read-heavy nature and the simplicity of the data model.",
            "answerOptions": [
                {
                    "text": "Relational Database (e.g., PostgreSQL, MySQL)",
                    "rationale": "While viable with proper indexing and scaling strategies, relational databases might not be as efficient as NoSQL key-value stores for the extremely high read-heavy, simple lookup pattern typical of a URL shortener at massive scale.",
                    "isCorrect": false
                },
                {
                    "text": "Graph Database (e.g., Neo4j)",
                    "rationale": "Graph databases are designed for complex relationships between entities, which is not the primary access pattern for a URL shortener's core mapping (a simple key-value pair).",
                    "isCorrect": false
                },
                {
                    "text": "Document Database (e.g., MongoDB)",
                    "rationale": "While flexible, document databases are often overkill for a simple `short_code` -> `long_url` mapping, and may not offer the same raw read performance for this specific pattern as specialized key-value stores.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Key-Value Store (e.g., Redis, DynamoDB)",
                    "rationale": "Key-Value stores are ideal for this use case due to their extremely fast lookups by key, high scalability for read-heavy workloads, and simplicity in data modeling (short_code as key, long_url as value).",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "When a user accesses a short URL (e.g., `short.ly/abcde`), which HTTP status code should the URL shortener typically return to redirect the client to the original long URL, assuming the mapping is permanent?",
            "hint": "Consider SEO implications and client caching behavior for a fixed mapping.",
            "answerOptions": [
                {
                    "text": "200 OK",
                    "rationale": "Returning 200 OK would serve the content of the long URL directly, not redirect the browser. This would prevent the user's browser from updating its location bar to the original long URL.",
                    "isCorrect": false
                },
                {
                    "text": "302 Found (Temporary Redirect)",
                    "rationale": "While commonly used, 302 implies the redirection is temporary and the client should continue to use the original short URL for future requests. It prevents browsers/search engines from caching the new location, leading to repeated requests to the shortener.",
                    "isCorrect": false
                },
                {
                    "text": "301 Moved Permanently",
                    "rationale": "This code indicates that the resource has permanently moved to a new URI. It's preferred for URL shorteners because the mapping is usually fixed, allowing clients (browsers, search engines) to cache the new location and reduce subsequent requests to the shortener, improving performance and SEO.",
                    "isCorrect": true
                },
                {
                    "text": "404 Not Found",
                    "rationale": "This code indicates the requested resource does not exist, which is incorrect for a valid short URL. It would result in an error page for the user.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "If a URL shortener uses a hashing function (e.g., MD5 truncated, or a custom hash) to generate short codes, how is a collision typically handled when a newly generated hash clashes with an existing short code in the database?",
            "hint": "The goal is to get a unique, working short code for the new long URL without overwriting.",
            "answerOptions": [
                {
                    "text": "Return an error to the user, asking them to try again with a different long URL.",
                    "rationale": "This is poor user experience and doesn't solve the underlying collision problem programmatically; the system should handle collisions transparently.",
                    "isCorrect": false
                },
                {
                    "text": "Truncate the hash to a shorter length to force a new unique value.",
                    "rationale": "Truncating an already colliding hash would likely exacerbate the collision problem by reducing the possible unique values, not solve it. It would make it even harder to find a unique code.",
                    "isCorrect": false
                },
                {
                    "text": "Append a small counter or unique salt to the original long URL, re-hash, and retry until unique.",
                    "rationale": "This is a common and effective strategy. By modifying the input to the hash function (e.g., appending '1', '2', or a random 'salt' to the original long URL), a different hash is produced. The process is repeated until a unique short code is found and confirmed against the database.",
                    "isCorrect": true
                },
                {
                    "text": "Overwrite the existing short code's mapping with the new long URL.",
                    "rationale": "This would lead to data loss and break existing short URLs, changing where they redirect, which is unacceptable and would cause massive data integrity issues.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To ensure high availability and scalability of short code generation in a distributed URL shortening system that needs to create millions of new short URLs daily, which approach for generating unique IDs is most robust and efficient?",
            "hint": "Think about avoiding a single point of failure and minimizing latency during key generation.",
            "answerOptions": [
                {
                    "text": "A single, centralized auto-incrementing ID generator.",
                    "rationale": "This introduces a single point of failure and a significant performance bottleneck. All requests for new IDs must pass through it, severely limiting the system's write throughput and overall availability.",
                    "isCorrect": false
                },
                {
                    "text": "Generating UUIDs on each application server and using them directly as short codes.",
                    "rationale": "While UUIDs are globally unique, they are too long (typically 32 characters or more without hyphens) to be practical as 'short' URLs, defeating the purpose of a URL shortener.",
                    "isCorrect": false
                },
                {
                    "text": "Pre-generating a large pool of unique short codes offline and distributing them to application servers.",
                    "rationale": "This 'key pre-allocation' strategy is highly scalable. Application servers can quickly pick unique codes from a local or distributed pool (e.g., Redis set) without synchronous calls to a central service for each request, making the generation process very fast and fault-tolerant.",
                    "isCorrect": true
                },
                {
                    "text": "Using the current timestamp (with milliseconds) as the short code.",
                    "rationale": "Timestamps are not guaranteed to be unique, especially in a distributed system, and can easily collide if multiple requests occur within the same millisecond. They also aren't compact in the way 'short codes' are expected to be.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A URL shortener needs to support 'custom short URLs' where users can request a specific short code (e.g., `short.ly/mycompany`). What is the primary concern when implementing this feature, beyond just storing the mapping?",
            "hint": "Think about uniqueness constraints and preventing undesirable behaviors.",
            "answerOptions": [
                {
                    "text": "Ensuring the custom short code is a valid URL path (e.g., no special characters).",
                    "rationale": "While important for URL validity, it's a straightforward validation check and not the *primary* architectural or business concern regarding the feature's core impact on the system's integrity and user experience.",
                    "isCorrect": false
                },
                {
                    "text": "Allowing users to choose any short code, even if it conflicts with an existing one.",
                    "rationale": "This approach would lead to immediate collisions, break existing links, or prevent new links from being created, causing significant data integrity issues and system failures.",
                    "isCorrect": false
                },
                {
                    "text": "Implementing robust validation and reservation mechanisms to prevent conflicts and squatting.",
                    "rationale": "This is crucial. Custom short codes must be immediately checked for uniqueness against all existing codes (auto-generated or other custom ones). Additionally, mechanisms are often needed to prevent users from reserving common or desirable codes solely to prevent others from using them (domain squatting), perhaps via a review process or premium feature.",
                    "isCorrect": true
                },
                {
                    "text": "Limiting the length of the custom short code to be extremely short (e.g., 3 characters).",
                    "rationale": "While length is a design consideration for user experience, forcing extreme brevity increases the chance of collisions with auto-generated codes and makes the uniqueness challenge harder. It's a design constraint, not the primary concern for implementation.",
                    "isCorrect": false
                }
            ]
        }
    ]
};