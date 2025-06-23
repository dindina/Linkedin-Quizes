const quizName = "Designing Tiny URL application Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is a common and efficient method to convert a long URL into a short, unique code for a TinyURL service?",
            "difficulty": 1,
            "hint": "Think about how large numbers or unique identifiers can be represented concisely.",
            "answerOptions": [
                {
                    "text": "Using a cryptographic hash function (e.g., SHA-256) directly as the short code.",
                    "rationale": "Cryptographic hash functions like SHA-256 produce very long hashes (e.g., 64 characters for SHA-256), which are not suitable for a 'tiny' URL. While unique, they don't meet the length requirement.",
                    "isCorrect": false
                },
                {
                    "text": "Employing a database auto-incrementing primary key for each long URL and then converting it to a Base62 string.",
                    "rationale": "This is a common and effective method. An auto-incrementing ID provides inherent uniqueness. Converting this ID to Base62 (0-9, a-z, A-Z) allows for a short string representation (e.g., 62^6 possibilities for a 6-character code), making it very compact and unique.",
                    "isCorrect": true
                },
                {
                    "text": "Truncating the long URL to its first 6-8 characters.",
                    "rationale": "Truncating the long URL would lead to frequent collisions (different long URLs mapping to the same short code) and is not a reliable method to ensure uniqueness.",
                    "isCorrect": false
                },
                {
                    "text": "Generating a random UUID (Universally Unique Identifier) for each URL.",
                    "rationale": "UUIDs are globally unique but are typically 32 characters long (plus hyphens), which is too long for a 'tiny' URL. While unique, they are not concise.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For the primary storage of `short_code -> long_URL` mappings in a TinyURL service, which type of database is generally most suitable for extremely high read throughput?",
            "difficulty": 2,
            "hint": "Consider the data access pattern: direct key-value lookups are paramount for redirection.",
            "answerOptions": [
                {
                    "text": "A traditional Relational Database Management System (RDBMS) like MySQL.",
                    "rationale": "While an RDBMS can work, especially with proper indexing and caching, it's often not as optimized for pure key-value lookups at extreme scale as dedicated key-value stores, and might incur higher overhead.",
                    "isCorrect": false
                },
                {
                    "text": "A Document Database like MongoDB.",
                    "rationale": "Document databases offer schema flexibility and scalability, but for a simple key-value mapping with very high read volume, they typically introduce more overhead than specialized key-value stores.",
                    "isCorrect": false
                },
                {
                    "text": "A Wide-Column Store like Cassandra.",
                    "rationale": "Wide-column stores are excellent for distributed key-value data and high write/read throughput. They are a strong candidate, but a simpler, faster key-value store might be chosen first if the primary access pattern is strictly key-value.",
                    "isCorrect": false
                },
                {
                    "text": "A Key-Value Store like Redis or DynamoDB.",
                    "rationale": "Key-Value Stores are explicitly designed for fast, efficient lookups of values based on keys. They provide low-latency access and are highly scalable, making them ideal for the core `short_code -> long_URL` mapping in a read-heavy system like TinyURL.",
                    "isCorrect": true
                }
            ]
        },
        {
            "question": "When generating a short code (e.g., using hashing or a random string), what is the most robust strategy if the newly generated code *already exists* in the system?",
            "difficulty": 2,
            "hint": "The goal is to ensure every long URL gets a unique, functional short code without disrupting existing ones.",
            "answerOptions": [
                {
                    "text": "Overwrite the existing mapping with the new long URL.",
                    "rationale": "Overwriting an existing mapping would break the functionality of the original long URL associated with that short code, leading to incorrect redirects and data loss. This is unacceptable.",
                    "isCorrect": false
                },
                {
                    "text": "Append a salt (e.g., timestamp, random number) to the long URL before hashing or generate a new random ID and retry until a unique code is found.",
                    "rationale": "This is the most common and robust approach. If a collision occurs (either from a hash or a random ID), modify the input (e.g., add a salt to the long URL before hashing, or simply generate a new random ID/increment the base ID) and try again. This ensures a unique code is eventually found without breaking existing mappings.",
                    "isCorrect": true
                },
                {
                    "text": "Decline the request and ask the user to provide a different long URL.",
                    "rationale": "This provides a poor user experience and is not scalable for programmatic URL shortening. The system should ideally handle collisions internally without user intervention.",
                    "isCorrect": false
                },
                {
                    "text": "Use the existing short code for the new long URL.",
                    "rationale": "This would mean one short code maps to multiple long URLs, which violates the fundamental principle of a TinyURL service (one-to-one or one-to-many from long to short, but strict one-to-one from short to long for unique redirection).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To handle extremely high read traffic (millions of redirections per second) for a TinyURL service, what is the most effective architectural component to place in front of the primary URL mapping database?",
            "difficulty": 2,
            "hint": "Think about reducing the load on the backend database by serving frequently accessed data closer to the user or from faster storage.",
            "answerOptions": [
                {
                    "text": "A message queue (e.g., Kafka).",
                    "rationale": "Message queues are primarily used for asynchronous communication, decoupling services, and handling writes or event streams. They are not designed to serve real-time read requests for URL redirection.",
                    "isCorrect": false
                },
                {
                    "text": "A distributed caching layer (e.g., Redis Cluster or Memcached).",
                    "rationale": "A distributed caching layer is highly effective. It stores frequently accessed `short_code -> long_URL` mappings in fast in-memory storage, significantly reducing the load on the backend database and providing much lower latency for redirection requests.",
                    "isCorrect": true
                },
                {
                    "text": "A Content Delivery Network (CDN).",
                    "rationale": "CDNs are primarily for caching static assets (images, CSS, JS) and serving them from edge locations. While some advanced CDNs can cache dynamic content like redirects, their primary role is not for the core mapping lookup logic that originates from the TinyURL server. The caching layer handles the database lookup more directly.",
                    "isCorrect": false
                },
                {
                    "text": "A Load Balancer only.",
                    "rationale": "A load balancer distributes incoming traffic across multiple application servers, but it does not reduce the total number of queries reaching the backend database. It improves scalability by allowing more servers, but doesn't reduce per-server DB load.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a highly distributed TinyURL system, how can you ensure unique short code generation across multiple application servers without introducing a single point of failure or significant contention?",
            "difficulty": 3,
            "hint": "Consider methods that don't rely on a single, shared, synchronously updated resource for every code generation request.",
            "answerOptions": [
                {
                    "text": "Each server generates random strings and checks for uniqueness in the database, retrying on collision.",
                    "rationale": "While simple to implement initially, this approach can lead to a high rate of collisions and retries as the system scales and traffic increases, especially with a limited character set or short code length, leading to performance bottlenecks due to repeated database checks.",
                    "isCorrect": false
                },
                {
                    "text": "Use a centralized database sequence generator (e.g., a single auto-incrementing ID table).",
                    "rationale": "A centralized sequence generator (even if replicated) can become a bottleneck and a single point of contention or failure at very high scales, as all write requests for new IDs must go through it.",
                    "isCorrect": false
                },
                {
                    "text": "Pre-generate a large pool of unique short codes offline and distribute them to servers, refilling as needed.",
                    "rationale": "This is a highly effective strategy. Servers can fetch blocks of pre-generated unique codes (e.g., Base62 encoded IDs from a distributed ID generator like Snowflake or a dedicated ID service) and use them from their local pool without contention. When a pool runs low, they asynchronously request more. This avoids real-time contention during code generation.",
                    "isCorrect": true
                },
                {
                    "text": "Implement a distributed lock manager (e.g., ZooKeeper) to control access to a shared counter.",
                    "rationale": "While technically possible, using a distributed lock manager for every short code generation introduces significant overhead and complexity. It can still become a bottleneck due to the serialization imposed by the lock, making it less scalable than pre-generation or other distributed ID generation approaches.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To minimize redirection latency for users clicking a TinyURL, which factor is *most* critical outside of the direct application server lookup time?",
            "difficulty": 3,
            "hint": "Consider the very first step a user's browser takes when resolving a URL.",
            "answerOptions": [
                {
                    "text": "The choice between HTTP 301 (Permanent Redirect) and HTTP 302 (Found).",
                    "rationale": "This choice primarily impacts SEO, browser caching behavior for subsequent visits, and analytics. While important, it's not the *most* critical factor for the very first-time latency of a redirection request itself, which occurs *after* the initial connection is established.",
                    "isCorrect": false
                },
                {
                    "text": "Database connection pool size.",
                    "rationale": "Database connection pool size affects the application server's ability to quickly query the database, thus impacting the application server lookup time. The question asks for factors *outside* of this direct lookup time.",
                    "isCorrect": false
                },
                {
                    "text": "Efficient DNS resolution for the TinyURL domain.",
                    "rationale": "DNS resolution is the very first step a browser takes to translate a domain name (like tinyurl.com) into an IP address. If DNS resolution is slow or inefficient (e.g., long TTLs, slow DNS servers), the entire redirection process is stalled even before the HTTP request is sent to the TinyURL server. This makes it extremely critical for perceived latency.",
                    "isCorrect": true
                },
                {
                    "text": "Client-side JavaScript optimization for faster redirect.",
                    "rationale": "Redirection in a TinyURL service is typically handled by server-side HTTP 3xx redirect codes, not client-side JavaScript. Relying on JavaScript would introduce significant latency and dependency on client-side execution.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When implementing a feature for users to specify *custom* short URLs (e.g., `tinyurl.com/mybrand`), what is the primary challenge to address?",
            "difficulty": 2,
            "hint": "Users might try to claim names already in use, or names that conflict with the system's own generation.",
            "answerOptions": [
                {
                    "text": "Ensuring the custom short URL contains only alphanumeric characters.",
                    "rationale": "This is a validation concern, important for usability and safety, but it's a relatively straightforward technical constraint, not the primary system design challenge unique to custom URLs.",
                    "isCorrect": false
                },
                {
                    "text": "Preventing collisions with existing or automatically generated short codes, and handling race conditions during creation.",
                    "rationale": "This is the primary challenge. A custom URL request must check if the desired short code is already taken (either by another custom URL or an auto-generated one) and must handle race conditions where multiple users try to claim the same custom URL simultaneously. This requires robust uniqueness checks and potentially transactional operations.",
                    "isCorrect": true
                },
                {
                    "text": "Optimizing the database index for custom URLs.",
                    "rationale": "While important for performance, especially for lookup, it's a standard database optimization task and secondary to the fundamental logic of preventing and handling conflicts during the creation of a custom URL.",
                    "isCorrect": false
                },
                {
                    "text": "Providing real-time availability checks for the chosen custom URL.",
                    "rationale": "This is a feature that helps address the collision problem (option B) by informing the user immediately, but it's a part of the solution rather than the core underlying system design challenge of ensuring uniqueness and resolving conflicts.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "How would you design the system to capture click analytics (e.g., number of clicks per short URL, referrer information) without significantly impacting the core redirection latency for millions of requests?",
            "difficulty": 3,
            "hint": "Think about decoupling the analytics processing from the primary request-response flow for redirection.",
            "answerOptions": [
                {
                    "text": "Directly update counters in the main database with each click.",
                    "rationale": "Directly updating a database with every click at high scale would create a significant write bottleneck, leading to high latency for redirection requests and potentially overwhelming the database. This approach is not scalable.",
                    "isCorrect": false
                },
                {
                    "text": "Send click events to a message queue (e.g., Kafka, SQS) for asynchronous processing by a separate service.",
                    "rationale": "This is the most effective approach. The redirection service can quickly publish a click event to a message queue without waiting for it to be processed. A separate analytics service then consumes these events asynchronously from the queue, processes them, and stores them in an analytics database. This decouples the analytics from the critical redirection path, ensuring low latency.",
                    "isCorrect": true
                },
                {
                    "text": "Log all click information to local files and process them in a daily batch job.",
                    "rationale": "While this avoids impacting real-time latency, it introduces significant delay in analytics availability (up to 24 hours), requires managing large log files, and could still be resource-intensive during batch processing. It's less real-time and efficient than a message queue for continuous analytics.",
                    "isCorrect": false
                },
                {
                    "text": "Use a real-time analytics database (e.g., ClickHouse) and write directly to it from the redirect service.",
                    "rationale": "While real-time analytics databases are optimized for high-volume writes and reads, writing *directly* from the critical redirect path still introduces a synchronous dependency and potential latency. A message queue provides an additional layer of buffering and decoupling, making the system more resilient to spikes in click volume or analytics database issues.",
                    "isCorrect": false
                }
            ]
        }
    ]
};