const quizName = "Caching Strategies Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "In a Cache-Aside strategy, what is the typical sequence of operations when an application needs to read data?",
            "hint": "Think about where the application first looks for data and what happens if it's not found.",
            "answerOptions": [
                {
                    "text": "Application writes data to cache, then to database. Reads only from cache.",
                    "rationale": "This describes a write strategy combined with a read-from-cache-only approach, not the standard Cache-Aside read flow.",
                    "isCorrect": false
                },
                {
                    "text": "Application reads data from cache. If not found, it reads from the database, then writes to the cache, and finally returns the data.",
                    "rationale": "This accurately describes the Cache-Aside (or lazy loading) pattern for reads: check cache first, if miss, go to database, populate cache, then return.",
                    "isCorrect": true
                },
                {
                    "text": "Application reads data from database. If needed, writes to cache for future reads.",
                    "rationale": "This implies the database is always queried first, which defeats the purpose of caching for read performance. Cache-Aside checks cache first.",
                    "isCorrect": false
                },
                {
                    "text": "Application writes data to database, and the database automatically updates the cache.",
                    "rationale": "This describes a write-through or write-back scenario potentially with database triggers, not the read flow of Cache-Aside.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which caching write strategy offers the highest immediate data durability guarantee, ensuring data is persisted to the backing store before the write operation is acknowledged to the client?",
            "hint": "Consider the point at which data is written to the persistent storage.",
            "answerOptions": [
                {
                    "text": "Write-Back",
                    "rationale": "Write-Back acknowledges the write immediately after updating the cache, asynchronously writing to the database. This offers lower immediate durability but higher write performance.",
                    "isCorrect": false
                },
                {
                    "text": "Write-Through",
                    "rationale": "Write-Through ensures data is written to both the cache and the backing database synchronously. The write operation is only acknowledged after both writes are successful, providing the highest immediate durability.",
                    "isCorrect": true
                },
                {
                    "text": "Cache-Aside",
                    "rationale": "Cache-Aside is primarily a read strategy. When used with writes, the application writes directly to the database and then invalidates the cache, offering no inherent immediate durability guarantee through the cache layer itself for writes.",
                    "isCorrect": false
                },
                {
                    "text": "Read-Through",
                    "rationale": "Read-Through is a read strategy where the cache handles fetching data from the database on a miss; it does not pertain to write operations or durability guarantees.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A common challenge with caching is ensuring data consistency between the cache and the backing store. Which of the following is the most effective approach to mitigate stale data when the underlying data frequently changes?",
            "hint": "Focus on active measures to keep the cache fresh and consistent with the source of truth.",
            "answerOptions": [
                {
                    "text": "Rely solely on a very long Time-To-Live (TTL) for cached items.",
                    "rationale": "A long TTL would exacerbate stale data problems, as updates would take a long time to propagate to the cache. This is unsuitable for frequently changing data.",
                    "isCorrect": false
                },
                {
                    "text": "Implement a Write-Through strategy combined with explicit cache invalidation on updates.",
                    "rationale": "While Write-Through ensures the database is immediately updated, explicit cache invalidation (e.g., deleting the item from cache) on every write to the database is critical. This ensures that the next read will either fetch fresh data via the cache or directly from the database.",
                    "isCorrect": true
                },
                {
                    "text": "Ignore cache invalidation and let users refresh their browsers manually.",
                    "rationale": "This is not a system design solution and would lead to a poor user experience with highly stale data.",
                    "isCorrect": false
                },
                {
                    "text": "Only cache data that never changes.",
                    "rationale": "While caching immutable data is ideal, many systems require caching frequently changing data. This option avoids the problem rather than solving it.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A 'cache stampede' or 'thundering herd' problem occurs when many clients simultaneously request data that is not in the cache, leading to a flood of requests to the backend database. Which technique is commonly used to mitigate this issue?",
            "hint": "Think about how to prevent multiple identical requests from hitting the database simultaneously for the same missing item.",
            "answerOptions": [
                {
                    "text": "Increase the cache's Time-To-Live (TTL) significantly.",
                    "rationale": "Increasing TTL might reduce cache misses in general, but it doesn't solve the stampede issue for the initial miss or when an item expires, as all concurrent requests would still hit the database simultaneously.",
                    "isCorrect": false
                },
                {
                    "text": "Implement a single-flight or locking mechanism (e.g., mutex) for cache misses.",
                    "rationale": "This technique ensures that when a cache miss occurs for a specific key, only one request is allowed to fetch the data from the backing store. Subsequent concurrent requests for the same key will wait for the first request to complete and populate the cache, thus preventing a stampede.",
                    "isCorrect": true
                },
                {
                    "text": "Use a larger cache memory footprint.",
                    "rationale": "While a larger cache can reduce the overall cache miss rate, it doesn't directly address the problem of many concurrent requests for a newly missing or expired item.",
                    "isCorrect": false
                },
                {
                    "text": "Decrease the number of cache servers.",
                    "rationale": "Decreasing the number of cache servers would likely increase cache misses and concentrate traffic, potentially worsening the stampede problem.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You are designing a system where data is read very frequently, but updated very rarely. High read performance and scalability are critical, while eventual consistency for updates is acceptable within a few seconds. Which combination of caching strategies would be most suitable?",
            "hint": "Prioritize read performance and consider how rare writes affect consistency needs, aiming for a balance.",
            "answerOptions": [
                {
                    "text": "Write-Back caching for writes and Read-Through for reads.",
                    "rationale": "While Write-Back provides eventual consistency and can handle high write throughput, its benefit is less pronounced for 'rarely updated' data, and it introduces complexity and potential data loss risk. Read-Through is good for reads, but Cache-Aside is often simpler for reads and works well with explicit invalidation.",
                    "isCorrect": false
                },
                {
                    "text": "Cache-Aside (lazy loading) for reads and Write-Through for writes.",
                    "rationale": "Cache-Aside for reads is excellent for high read performance. Write-Through for writes ensures immediate consistency, but since writes are rare, it's not strictly necessary to sacrifice write performance (though the impact is minimal here). The 'eventual consistency' requirement makes explicit invalidation often a better fit.",
                    "isCorrect": false
                },
                {
                    "text": "Cache-Aside (lazy loading) for reads and explicit invalidation or Write-Through for writes (with short TTL if needed).",
                    "rationale": "Cache-Aside (lazy loading) is highly effective for high read scenarios as data is only fetched on demand. For rare updates, explicitly invalidating the cache entry (or using Write-Through) ensures that the next read fetches fresh data, achieving eventual consistency without overcomplicating the write path or risking data loss characteristic of Write-Back.",
                    "isCorrect": true
                },
                {
                    "text": "Only use a database without any caching.",
                    "rationale": "This would not meet the requirement for 'high read performance and scalability' in a system with very frequent reads.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a distributed caching system with multiple cache nodes, what is a primary challenge related to data consistency that does not typically apply to a single-node cache?",
            "hint": "Consider what happens when data is updated and different cache nodes hold copies of that data.",
            "answerOptions": [
                {
                    "text": "Managing cache eviction policies (e.g., LRU).",
                    "rationale": "Eviction policies are a challenge in both single-node and distributed caches, though their implementation and coordination can vary in distributed systems.",
                    "isCorrect": false
                },
                {
                    "text": "Ensuring all cache nodes reflect the most up-to-date version of data after a write.",
                    "rationale": "This is a primary challenge in distributed caching. When data is updated via one node, other nodes might still hold stale copies of that data, requiring complex invalidation, replication, or consistency strategies across the cluster to ensure all nodes eventually reflect the latest state.",
                    "isCorrect": true
                },
                {
                    "text": "Handling a high volume of cache hits.",
                    "rationale": "A high volume of cache hits is a benefit, not a challenge, of any caching system, whether single-node or distributed.",
                    "isCorrect": false
                },
                {
                    "text": "Preventing memory leaks within individual cache nodes.",
                    "rationale": "Memory leaks are a software engineering concern for any application, including cache nodes, but are not unique to the distributed nature of the cache.",
                    "isCorrect": false
                }
            ]
        }
    ]
};