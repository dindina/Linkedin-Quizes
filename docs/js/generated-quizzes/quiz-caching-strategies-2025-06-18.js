const quizName = "Caching Strategies Quiz";
const quizData = {
    "questions": [
        {
            "question": "In a `Cache-Aside` caching strategy, who is primarily responsible for updating the cache after a data modification in the database?",
            "hint": "Think about where the application interacts with both the cache and the database directly.",
            "answerOptions": [
                {
                    "text": "The cache itself, by listening to database change events.",
                    "rationale": "In Cache-Aside, the cache is passive and does not actively listen for database changes. The application explicitly manages cache updates.",
                    "isCorrect": false
                },
                {
                    "text": "The database, which automatically propagates changes to the cache.",
                    "rationale": "The database typically has no knowledge of the cache in a Cache-Aside pattern. It does not automatically push updates to the cache.",
                    "isCorrect": false
                },
                {
                    "text": "The application code, which explicitly writes to the database and then invalidates/updates the cache.",
                    "rationale": "Cache-Aside (or Lazy Loading) means the application is responsible for checking the cache, fetching from the database on a miss, and crucially, for invalidating or updating the cache after a write to the database.",
                    "isCorrect": true
                },
                {
                    "text": "A separate background process that periodically scans the database for changes.",
                    "rationale": "While background processes can be used for some forms of synchronization, they are not the primary mechanism for cache updates in a standard Cache-Aside implementation following a write operation.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary advantage of employing a `Write-Through` caching strategy compared to `Write-Back`?",
            "hint": "Consider data consistency and durability guarantees upon a write operation.",
            "answerOptions": [
                {
                    "text": "Lower write latency for the client.",
                    "rationale": "Write-Through typically has higher write latency than Write-Back because the write operation is only acknowledged after data is written to both the cache and the persistent store.",
                    "isCorrect": false
                },
                {
                    "text": "Guaranteed data consistency between cache and database on writes.",
                    "rationale": "With Write-Through, every write operation is simultaneously performed on both the cache and the underlying persistent store. This ensures that the data in the cache and the database are always consistent immediately after the write is acknowledged.",
                    "isCorrect": true
                },
                {
                    "text": "Reduced network traffic to the database.",
                    "rationale": "Write-Through generally increases network traffic to the database compared to Write-Back, as every write operation must go through to the database.",
                    "isCorrect": false
                },
                {
                    "text": "Better performance during peak write loads due to asynchronous updates.",
                    "rationale": "Write-Through performs synchronous updates to the database, which can lead to lower performance during high write loads compared to the asynchronous nature of Write-Back.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following is a significant drawback of the `Write-Back` (or Write-Behind) caching strategy?",
            "hint": "Consider what happens if the cache server fails before data is persisted.",
            "answerOptions": [
                {
                    "text": "High read latency due to frequent cache misses.",
                    "rationale": "Write-Back primarily affects write operations. Read latency can still be low if data is already in the cache.",
                    "isCorrect": false
                },
                {
                    "text": "Increased complexity in cache invalidation.",
                    "rationale": "While cache invalidation can be complex in distributed systems, it's not a unique drawback of Write-Back compared to other strategies.",
                    "isCorrect": false
                },
                {
                    "text": "Potential for data loss if the cache server crashes before data is written to the persistent store.",
                    "rationale": "In Write-Back, data is initially written only to the cache and then asynchronously written to the persistent store. If the cache server fails before the data is flushed, that data can be lost.",
                    "isCorrect": true
                },
                {
                    "text": "Reduced write throughput due to synchronous database updates.",
                    "rationale": "Write-Back actually improves write throughput by acknowledging writes immediately to the client and performing database updates asynchronously, unlike Write-Through.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When using Time-to-Live (TTL) as a cache invalidation strategy, what is the main trade-off?",
            "hint": "Think about the freshness of data versus the overhead of fetching it.",
            "answerOptions": [
                {
                    "text": "It guarantees absolute data consistency but introduces high database load.",
                    "rationale": "TTL does not guarantee absolute data consistency; data can become stale in the cache until its TTL expires. It also doesn't inherently introduce high database load unless the TTL is extremely short, leading to frequent re-fetches.",
                    "isCorrect": false
                },
                {
                    "text": "It simplifies cache management but can lead to stale data being served until expiration.",
                    "rationale": "TTL is a simple and effective strategy for cache invalidation. However, if the underlying data changes before the TTL expires, the cache will continue to serve stale data until the item is automatically removed or refreshed.",
                    "isCorrect": true
                },
                {
                    "text": "It requires complex distributed locking mechanisms, increasing latency.",
                    "rationale": "TTL is a passive expiration mechanism and doesn't inherently require complex distributed locking. These mechanisms are more related to ensuring consistency across multiple cache nodes during writes/invalidations, independent of TTL.",
                    "isCorrect": false
                },
                {
                    "text": "It is only suitable for static content and cannot be used for dynamic data.",
                    "rationale": "TTL can be used for dynamic content, but the trade-off between freshness and cache hit rate becomes more pronounced. For highly dynamic content, a very short TTL or a different invalidation strategy might be needed.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A caching system needs to remove an item to make space for new data. Which of the following eviction policies would remove the item that was accessed *least recently*?",
            "hint": "Focus on the 'LRU' acronym and its meaning.",
            "answerOptions": [
                {
                    "text": "LFU (Least Frequently Used)",
                    "rationale": "LFU evicts the item that has been accessed the fewest times, regardless of when it was last accessed.",
                    "isCorrect": false
                },
                {
                    "text": "FIFO (First-In, First-Out)",
                    "rationale": "FIFO evicts the item that has been in the cache for the longest time, regardless of how recently or frequently it was accessed.",
                    "isCorrect": false
                },
                {
                    "text": "LRU (Least Recently Used)",
                    "rationale": "LRU evicts the item that has not been accessed for the longest period of time, assuming that items accessed recently are more likely to be accessed again soon.",
                    "isCorrect": true
                },
                {
                    "text": "MRU (Most Recently Used)",
                    "rationale": "MRU evicts the item that was accessed most recently. This is typically used in specific scenarios where recency implies less future utility.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For an application that primarily handles read-heavy workloads but requires strong consistency for critical data updates (e.g., financial transactions), which caching strategy for *writes* would generally be most appropriate?",
            "hint": "Balance read performance with the need for immediate data integrity on writes.",
            "answerOptions": [
                {
                    "text": "Cache-Aside with optimistic locking.",
                    "rationale": "While Cache-Aside is good for read-heavy workloads, its write pattern (write to DB, then invalidate/update cache) doesn't inherently provide strong, immediate consistency guarantees across both the cache and DB *for the write itself* without careful coordination. Optimistic locking is a concurrency control mechanism, not a caching write strategy.",
                    "isCorrect": false
                },
                {
                    "text": "Write-Back.",
                    "rationale": "Write-Back offers high write performance but compromises on immediate data consistency and durability, as data is only written asynchronously to the database. This is not suitable for critical financial transactions requiring strong consistency.",
                    "isCorrect": false
                },
                {
                    "text": "Write-Through.",
                    "rationale": "Write-Through ensures that data is written to both the cache and the persistent store before the write operation is acknowledged. This provides strong consistency guarantees, which is crucial for critical data like financial transactions, even though it may increase write latency slightly.",
                    "isCorrect": true
                },
                {
                    "text": "No-Cache for writes.",
                    "rationale": "While 'no-cache' for writes is an option that ensures strong consistency (as it bypasses the cache), Write-Through allows integrating caching benefits (e.g., fast reads of recently written data) while still maintaining the strong consistency required for critical operations.",
                    "isCorrect": false
                }
            ]
        }
    ]
};