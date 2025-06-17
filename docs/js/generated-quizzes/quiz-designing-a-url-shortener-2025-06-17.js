const quizName = "Designing a URL Shortener Quiz";
const quizData = {
    "questions": [
        {
            "question": "When designing a URL shortener, which method is generally preferred for generating unique, compact, and collision-resistant short codes that can be easily mapped back to their original IDs?",
            "hint": "Consider techniques that combine uniqueness with a short, alphanumeric representation.",
            "answerOptions": [
                {
                    "text": "MD5 hashing of the long URL truncated to 6 characters.",
                    "rationale": "While MD5 provides a hash, truncating it significantly increases the chance of collisions. Also, MD5 is not designed for easy reversibility to an original incrementing ID, which is often used in conjunction with Base62.",
                    "isCorrect": false
                },
                {
                    "text": "Base62 encoding of a unique, incrementing ID obtained from a distributed ID generator or database sequence.",
                    "rationale": "This is a widely adopted and effective method. A unique, incrementing ID (e.g., from a database auto-increment or a distributed ID service like Snowflake) ensures uniqueness, and Base62 encoding converts this numeric ID into a compact, alphanumeric string suitable for short codes. This approach minimizes collisions and allows for easy reversibility.",
                    "isCorrect": true
                },
                {
                    "text": "Randomly generated UUIDs (Universally Unique Identifiers).",
                    "rationale": "UUIDs are globally unique, but they are typically 32 hexadecimal characters long (128 bits), which is too long for a compact URL shortener code. While unique, they do not meet the 'compact' requirement.",
                    "isCorrect": false
                },
                {
                    "text": "Using a simple counter and appending a timestamp.",
                    "rationale": "Appending a timestamp can make codes longer than necessary and might not guarantee uniqueness in a highly concurrent environment without additional coordination. A simple counter alone is prone to concurrency issues.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What are the absolute minimum required fields for a database table storing URL mappings in a URL shortener to function correctly?",
            "hint": "Think about the essential pieces of information needed to map a short URL to its original destination.",
            "answerOptions": [
                {
                    "text": "`id` (Primary Key), `long_url`, `short_code`, `created_at`",
                    "rationale": "While `id` and `created_at` are highly recommended for good database design and auditing, they are not strictly necessary for the core mapping functionality. The absolute minimum is the mapping itself.",
                    "isCorrect": false
                },
                {
                    "text": "`short_code` (Primary Key or Unique Index), `long_url`",
                    "rationale": "This represents the most fundamental mapping. The `short_code` is what users access, and the `long_url` is where they are redirected. The `short_code` must be unique, typically enforced by a primary key or unique index.",
                    "isCorrect": true
                },
                {
                    "text": "`id`, `long_url`, `short_code`, `user_id`, `expiration_date`",
                    "rationale": "These fields are useful for extended features (user management, URL expiration) but are not the bare minimum required for the core URL shortening and redirection functionality.",
                    "isCorrect": false
                },
                {
                    "text": "`short_code`, `target_url`, `click_count`, `last_accessed`",
                    "rationale": "`click_count` and `last_accessed` are for analytics and not essential for the core mapping. `target_url` is just an alias for `long_url`.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which HTTP status code is most appropriate for a URL shortener to redirect a user permanently from a short URL to its original long URL, especially when considering SEO benefits?",
            "hint": "Consider the implications for search engines and browser caching regarding the 'permanence' of the redirection.",
            "answerOptions": [
                {
                    "text": "301 Moved Permanently",
                    "rationale": "A 301 redirect indicates that the resource has been permanently moved to a new URL. This is ideal for URL shorteners as it signals to search engines to pass 'link juice' (SEO value) to the new URL and allows browsers to cache the new mapping, reducing future lookup times.",
                    "isCorrect": true
                },
                {
                    "text": "302 Found (formerly Moved Temporarily)",
                    "rationale": "A 302 redirect indicates that the resource is temporarily located at a different URI. This is generally not preferred for URL shorteners as it doesn't pass SEO value and clients might not cache the new URL, leading to repeated lookups.",
                    "isCorrect": false
                },
                {
                    "text": "303 See Other",
                    "rationale": "A 303 redirect is primarily used after a successful POST request to redirect the client to a different URL (typically via GET) to avoid resubmitting the form. It's not typically used for simple URL shortening redirection and doesn't pass SEO value.",
                    "isCorrect": false
                },
                {
                    "text": "307 Temporary Redirect",
                    "rationale": "Similar to 302, a 307 redirect indicates a temporary move and explicitly forbids changing the HTTP method (e.g., from POST to GET). It doesn't pass SEO value and is generally not suitable for permanent URL shortening.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "If a URL shortener uses a hashing function (e.g., MD5 truncated to 6 characters) to generate short codes, how should it handle a collision where a newly generated hash already exists in the database?",
            "hint": "The goal is to ensure every short code maps to a unique long URL.",
            "answerOptions": [
                {
                    "text": "Overwrite the existing entry with the new mapping.",
                    "rationale": "Overwriting an existing entry would break the original short URL, leading to incorrect redirects for existing users. This is unacceptable for a URL shortener.",
                    "isCorrect": false
                },
                {
                    "text": "Generate a new hash (e.g., by appending a random salt to the input URL or an attempt counter) and retry until a unique one is found.",
                    "rationale": "This is a common and robust strategy. If a collision occurs, modify the input (e.g., add a random string, a timestamp, or an incrementing counter) and re-hash. This process is repeated until a unique short code is generated.",
                    "isCorrect": true
                },
                {
                    "text": "Store both mappings under the same short code and resolve at runtime based on user IP.",
                    "rationale": "A short code must unambiguously map to a single long URL. Storing multiple mappings under the same short code would create ambiguity and complexity in resolution, making the service unreliable.",
                    "isCorrect": false
                },
                {
                    "text": "Log the collision and return an error to the user, instructing them to try shortening a different URL.",
                    "rationale": "While logging is good for monitoring, returning an error to the user is a poor user experience. The service should handle collisions transparently and strive to provide a valid short URL.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For a URL shortener aiming for extremely high scale, processing millions of short URL creation requests per second, which ID generation strategy would best provide unique, highly available, and potentially time-ordered IDs suitable for encoding into short codes?",
            "hint": "Think about distributed systems and avoiding single points of failure while generating unique, high-throughput IDs.",
            "answerOptions": [
                {
                    "text": "Relying solely on database auto-increment primary keys.",
                    "rationale": "While simple, a single database auto-increment sequence can become a significant bottleneck at extremely high scales, limiting write throughput and introducing a single point of failure.",
                    "isCorrect": false
                },
                {
                    "text": "Using Universally Unique Identifiers (UUIDs) v4 generated by each service instance.",
                    "rationale": "UUIDs v4 are globally unique and can be generated without central coordination, making them highly available. However, they are not time-ordered (which can impact indexing performance) and are very long (128 bits), requiring significant truncation or making the short code longer than desired if used directly.",
                    "isCorrect": false
                },
                {
                    "text": "Implementing a distributed ID generation service like Twitter's Snowflake or a similar custom solution.",
                    "rationale": "Systems like Snowflake are specifically designed for generating unique, high-throughput, and often time-ordered 64-bit IDs across multiple machines in a distributed environment. These IDs can then be efficiently Base62 encoded into compact short URLs.",
                    "isCorrect": true
                },
                {
                    "text": "Having each server generate random numbers and checking for uniqueness in a distributed cache (e.g., Redis).",
                    "rationale": "While distributed caches can handle high read/write volume, generating random numbers and then checking for uniqueness creates a 'check-then-act' race condition. It can lead to a high number of collisions and retries at extreme scales, reducing efficiency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "From a traffic pattern perspective, how does a typical URL shortener service generally behave?",
            "hint": "Consider how often a URL is shortened versus how often the shortened URL is accessed.",
            "answerOptions": [
                {
                    "text": "Write-heavy, as new URLs are constantly being shortened by users.",
                    "rationale": "While new URLs are shortened (writes), the frequency of these operations is generally much lower than the frequency of accessing existing short URLs.",
                    "isCorrect": false
                },
                {
                    "text": "Read-heavy, with significantly more requests to resolve (redirect from) short URLs than to create new ones.",
                    "rationale": "This is the typical pattern. A long URL is shortened once (a write operation), but the resulting short URL can be clicked and accessed thousands, millions, or even billions of times (read operations). This leads to a substantial imbalance favoring reads.",
                    "isCorrect": true
                },
                {
                    "text": "Balanced between reads and writes.",
                    "rationale": "A URL shortener's usage pattern is distinctly imbalanced, with reads far outweighing writes, especially for popular short URLs.",
                    "isCorrect": false
                },
                {
                    "text": "Sporadic, with unpredictable bursts of both reads and writes throughout the day.",
                    "rationale": "While bursts can occur, the fundamental ratio of reads to writes remains skewed towards reads in the long term. The service design should account for this read-heavy nature.",
                    "isCorrect": false
                }
            ]
        }
    ]
};