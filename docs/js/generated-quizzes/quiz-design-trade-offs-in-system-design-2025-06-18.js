const quizName = "Design Trade-offs in System Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "In the context of distributed systems, the CAP theorem states that a distributed data store cannot simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance. If a system designer prioritizes strong Consistency (C) and Partition Tolerance (P) in their distributed database, which guarantee must they be willing to sacrifice?",
            "hint": "Recall the 'CP' choice in the CAP theorem. What happens when network partitions occur and you need data to be consistent?",
            "answerOptions": [
                {
                    "text": "Availability",
                    "rationale": "When prioritizing Consistency and Partition Tolerance (CP), the system must sacrifice Availability. In the event of a network partition, the system will choose to return an error or become unavailable for writes/reads on the partitioned side to ensure that all committed data remains consistent.",
                    "isCorrect": true
                },
                {
                    "text": "Scalability",
                    "rationale": "Scalability is a general system property but not one of the three core guarantees defined by the CAP theorem. While a system's chosen CAP trade-off can impact scalability, it's not the direct sacrifice.",
                    "isCorrect": false
                },
                {
                    "text": "Durability",
                    "rationale": "Durability (ensuring committed data is not lost) is a crucial aspect of databases but is not one of the three trade-offs in the CAP theorem. The CAP theorem assumes durability.",
                    "isCorrect": false
                },
                {
                    "text": "Performance",
                    "rationale": "Performance (latency, throughput) is an important metric but not one of the three direct guarantees in the CAP theorem. While consistency often comes at the cost of performance, it's not the explicit sacrifice in the 'CP' choice.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A popular news website's backend system is predominantly read-heavy, with millions of users frequently accessing articles. To improve performance and reduce database load, a caching layer is introduced. What is the primary trade-off faced when deciding on the cache invalidation strategy for such a system?",
            "hint": "Consider the balance between serving data quickly from the cache versus ensuring users see the most up-to-date information.",
            "answerOptions": [
                {
                    "text": "Cost of storage vs. Ease of implementation",
                    "rationale": "While cost and implementation complexity are factors in system design, they are not the primary trade-off directly related to cache invalidation strategies for data freshness versus performance.",
                    "isCorrect": false
                },
                {
                    "text": "Data Freshness (Consistency) vs. Read Performance (Availability/Latency)",
                    "rationale": "This is the core trade-off. Aggressive caching improves read performance and reduces database load but risks serving stale data. Conversely, frequently invalidating or not caching reduces the risk of stale data but increases database hits and read latency.",
                    "isCorrect": true
                },
                {
                    "text": "Write Throughput vs. Data Durability",
                    "rationale": "This trade-off is more relevant to database writes and persistence mechanisms (e.g., write-back cache vs. write-through) rather than the general cache invalidation strategy for read-heavy systems.",
                    "isCorrect": false
                },
                {
                    "text": "Security vs. Scalability",
                    "rationale": "These are important system attributes but are not the direct trade-off involved in cache invalidation strategies.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A rapidly growing e-commerce platform decides to implement database sharding to handle increasing traffic and data volume. While sharding offers significant benefits for horizontal scaling, what is a major challenge or trade-off introduced by this architectural decision?",
            "hint": "Think about the complexity involved in managing data distributed across multiple nodes and how queries might be affected.",
            "answerOptions": [
                {
                    "text": "Reduced data durability and increased data loss risk",
                    "rationale": "Sharding itself doesn't inherently reduce data durability; proper backup and replication strategies are still applied to shards. In fact, distributing data can sometimes improve overall system resilience against single node failures.",
                    "isCorrect": false
                },
                {
                    "text": "Simplified data backups and recovery processes",
                    "rationale": "Backups and recovery often become more complex with sharding, requiring coordination across multiple shards and ensuring data consistency during restoration.",
                    "isCorrect": false
                },
                {
                    "text": "Increased operational complexity, data rebalancing challenges, and complex cross-shard queries",
                    "rationale": "This is a major trade-off. Sharding introduces challenges like choosing a sharding key, rebalancing data as traffic patterns change, handling cross-shard transactions, and making queries that span multiple shards more complex.",
                    "isCorrect": true
                },
                {
                    "text": "Elimination of single points of failure within the database layer",
                    "rationale": "While sharding can mitigate single points of failure by distributing data, it doesn't eliminate all of them (e.g., sharding coordinator, configuration management) and introduces new failure modes related to managing distributed systems.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For a global social networking application displaying 'likes' on posts, the design team opts for eventual consistency for the like counts, rather than strong consistency. What is the primary benefit gained by making this trade-off?",
            "hint": "When you relax strict consistency requirements, what do you typically gain in a distributed system, especially globally?",
            "answerOptions": [
                {
                    "text": "Guaranteed real-time accuracy of all like counts across all regions",
                    "rationale": "This is the opposite of what eventual consistency provides. With eventual consistency, there's a delay before all replicas converge to the same state, meaning real-time accuracy cannot be guaranteed across all regions simultaneously.",
                    "isCorrect": false
                },
                {
                    "text": "Simplified data model and database schema design",
                    "rationale": "The choice of consistency model (eventual vs. strong) is separate from the complexity of the data model or schema design, although eventual consistency often pairs well with flexible NoSQL databases.",
                    "isCorrect": false
                },
                {
                    "text": "Higher availability and improved write performance across geographically distributed data centers",
                    "rationale": "By relaxing strong consistency, systems can accept writes more quickly and stay available even if some nodes are unreachable or partitioned, as replicas don't need to be immediately synchronized before acknowledging a write. This allows for better performance and availability, especially in globally distributed systems.",
                    "isCorrect": true
                },
                {
                    "text": "Reduced data storage requirements for the like counts",
                    "rationale": "The consistency model does not directly reduce data storage requirements. If anything, replication for availability might increase storage requirements.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A development team is designing a system to store user session data for an analytics dashboard. The data schema is highly dynamic (new attributes can appear frequently), and the system needs to handle extremely high write volumes and scale horizontally with ease. Which database type would likely be chosen, and what core trade-off is involved in this decision?",
            "hint": "Consider the need for schema flexibility and the ability to scale out horizontally for high write throughput.",
            "answerOptions": [
                {
                    "text": "Relational Database (SQL): Prioritizes ACID properties and strict schema over schema flexibility and horizontal scalability.",
                    "rationale": "Relational databases excel with fixed schemas and strong ACID guarantees but struggle with highly dynamic schemas and are generally more complex to scale horizontally for extreme write volumes.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Database (e.g., Document Store): Prioritizes schema flexibility and horizontal scalability over strong ACID guarantees and strict schema enforcement.",
                    "rationale": "NoSQL databases, particularly document stores, are well-suited for dynamic schemas and horizontal scaling to handle high write loads. The trade-off is often weaker consistency models (like eventual consistency) and less strict ACID properties compared to SQL databases.",
                    "isCorrect": true
                },
                {
                    "text": "Graph Database: Prioritizes complex relationship queries over high write volume and dynamic schema for session data.",
                    "rationale": "Graph databases are optimized for interconnected data and relationship traversal, not typically for high-volume, dynamic schema session data, nor are they primarily chosen for their write performance in this context.",
                    "isCorrect": false
                },
                {
                    "text": "Time-Series Database: Prioritizes chronological data analysis over general-purpose dynamic schema and user session storage.",
                    "rationale": "Time-series databases are specialized for data points indexed by time. While session data has time components, the primary drivers here are dynamic schema and high write volume, for which a general-purpose NoSQL solution is usually better.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To handle unpredictable spikes in user requests for image processing, a system designer proposes using a message queue between the web server (front-end) and the image processing service (back-end). What is the main trade-off accepted when introducing a message queue for such a scenario?",
            "hint": "Think about what happens to the user's request immediately after it's sent to the queue versus when it's fully processed.",
            "answerOptions": [
                {
                    "text": "Reduced system reliability and increased likelihood of request loss.",
                    "rationale": "Message queues generally enhance reliability by decoupling services and providing buffering, ensuring requests are processed even if the backend is temporarily down or overloaded.",
                    "isCorrect": false
                },
                {
                    "text": "Tighter coupling between the web server and the image processing service.",
                    "rationale": "Message queues promote loose coupling and asynchronous communication, allowing services to operate independently without direct knowledge of each other's availability.",
                    "isCorrect": false
                },
                {
                    "text": "Increased immediate user feedback latency for task completion.",
                    "rationale": "When a message queue is used, the web server can quickly acknowledge the request (e.g., 'Your image is being processed') and return control to the user. However, the actual image processing happens asynchronously, meaning the user doesn't get immediate, synchronous confirmation of the task's completion. This introduces a delay in the user being able to confirm the task is *fully* done.",
                    "isCorrect": true
                },
                {
                    "text": "Lower overall system throughput during peak loads.",
                    "rationale": "Message queues help to smooth out peak loads, preventing the backend from being overwhelmed and allowing it to process requests at its own pace. This typically leads to higher *overall* system throughput by preventing cascading failures and enabling efficient resource utilization.",
                    "isCorrect": false
                }
            ]
        }
    ]
};