const quizName = "SQL vs NoSQL Databases Quiz";
const quizData = {
    "questions": [
        {
            "question": "A critical requirement for a new banking application is maintaining strong data consistency and transaction integrity, even across multiple operations. Which type of database would be the primary recommendation, and why?",
            "hint": "Consider the transaction properties offered by each database paradigm.",
            "answerOptions": [
                {
                    "text": "NoSQL, because it offers eventual consistency, which is faster for financial transactions.",
                    "rationale": "Eventual consistency might be faster, but it is not suitable for financial transactions that require immediate and strong consistency to prevent data discrepancies and ensure all parts of a transaction succeed or fail together.",
                    "isCorrect": false
                },
                {
                    "text": "SQL, because it guarantees ACID properties (Atomicity, Consistency, Isolation, Durability) essential for transactional integrity.",
                    "rationale": "SQL databases are designed with ACID properties, which are fundamental for applications requiring high transactional integrity, such as banking systems, ensuring data reliability and correctness.",
                    "isCorrect": true
                },
                {
                    "text": "NoSQL, because its flexible schema allows for easier management of diverse financial data.",
                    "rationale": "While schema flexibility is a NoSQL advantage, it's not the primary driver for choosing a database for strong transaction integrity. Financial data often has a well-defined structure where ACID is paramount.",
                    "isCorrect": false
                },
                {
                    "text": "SQL, because it scales horizontally more efficiently, handling high transaction volumes better.",
                    "rationale": "SQL databases typically scale vertically rather than horizontally for transactional workloads, and their primary strength for banking is ACID compliance, not superior horizontal scalability compared to NoSQL.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Your social media platform is experiencing exponential user growth, leading to massive amounts of unstructured data (posts, comments, likes) and a need for extreme horizontal scalability and high availability. Which database paradigm is generally better suited for this scenario, and why?",
            "hint": "Think about how each type of database typically scales and handles large, distributed datasets with varying structures.",
            "answerOptions": [
                {
                    "text": "SQL, because its relational model and Joins are ideal for connecting user data across distributed servers.",
                    "rationale": "While SQL handles relationships well, performing joins across massive distributed datasets in a highly scalable environment becomes very complex and inefficient, hindering horizontal scaling.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL, because it is designed for horizontal scaling (sharding/partitioning) and often sacrifices strong consistency for availability and partition tolerance.",
                    "rationale": "NoSQL databases are built for horizontal scalability, high availability, and handling large volumes of semi-structured or unstructured data, making them ideal for rapidly growing social media platforms where eventual consistency is often acceptable.",
                    "isCorrect": true
                },
                {
                    "text": "SQL, because it guarantees strong consistency across all replicas, ensuring data integrity for social interactions.",
                    "rationale": "While SQL offers strong consistency, achieving this efficiently at extreme horizontal scales with high availability for rapidly changing, unstructured data is challenging. Social media often prioritizes availability and partition tolerance over immediate, global consistency.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL, because its rigid schema ensures data consistency even with rapid growth.",
                    "rationale": "NoSQL databases are known for their flexible or schema-less nature, not a rigid schema. A rigid schema would be a hindrance for rapidly evolving, unstructured social media data.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A new IoT project needs to store sensor data from a variety of devices. The data format from these devices is highly variable and changes frequently as new sensors are added or existing ones are updated. Which database paradigm would be most appropriate for handling this evolving data structure, and why?",
            "hint": "Consider how each database type manages its data structure definition and flexibility.",
            "answerOptions": [
                {
                    "text": "SQL, because its predefined schema ensures data quality and makes it easier to query changing data types.",
                    "rationale": "SQL's rigid, predefined schema would necessitate frequent and potentially complex schema migrations (ALTER TABLE operations) as the sensor data formats change, which is impractical for rapidly evolving data.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL (e.g., Document or Key-Value store), because its schema-less or flexible schema approach can easily accommodate varying and evolving data structures.",
                    "rationale": "NoSQL databases, particularly document or key-value stores, allow for dynamic schemas where each record or document can have different fields without requiring a predefined structure. This flexibility is ideal for evolving IoT data.",
                    "isCorrect": true
                },
                {
                    "text": "SQL, because it supports complex joins necessary for analyzing sensor data relationships.",
                    "rationale": "While SQL excels at joins, the primary challenge described is the 'highly variable and frequently changing data format,' for which schema flexibility is a more pressing concern than join capabilities.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL (e.g., Graph database), because it enforces strict relationships between entities, preventing inconsistent sensor readings.",
                    "rationale": "Graph databases are excellent for complex relationships, but the core problem here is the *variability of data structure* within individual sensor readings, not primarily the relationships *between* sensors. They do not enforce strict schema on individual node/edge properties in the way SQL does, but they also aren't the go-to for schema flexibility for individual records.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You are designing a system for a real-time analytics dashboard that aggregates data from various sources. The data needs to be highly available, fast to ingest, and capable of handling semi-structured data from different formats. Ad-hoc querying and quick iteration on data models are more critical than complex multi-table joins. Which database type is generally preferred for this scenario?",
            "hint": "Think about performance for ingestion, schema flexibility, and the priority of joins versus read/write speed for analytics.",
            "answerOptions": [
                {
                    "text": "SQL databases, due to their strong consistency and ability to perform complex analytical queries with joins.",
                    "rationale": "While SQL can do analytics, its rigid schema and challenges with high-volume, semi-structured data ingestion make it less ideal for 'real-time analytics' that prioritizes flexibility and ingestion speed over complex joins.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL databases, especially document or column-family stores, because they excel at high-volume data ingestion, flexible schemas, and horizontal scaling for analytical workloads.",
                    "rationale": "NoSQL databases (like MongoDB, Cassandra) are well-suited for real-time analytics due to their ability to ingest large volumes of semi-structured data quickly, scale horizontally, and offer schema flexibility, which allows for rapid iteration on data models.",
                    "isCorrect": true
                },
                {
                    "text": "Both SQL and NoSQL are equally suitable, depending on the specific vendor.",
                    "rationale": "While specific vendor implementations vary, the general characteristics of SQL (rigid schema, strong consistency, joins) and NoSQL (flexible schema, horizontal scaling, eventual consistency) lead to clear preferences for certain use cases, and this scenario strongly favors NoSQL.",
                    "isCorrect": false
                },
                {
                    "text": "In-memory databases only, as disk-based solutions are too slow for real-time analytics.",
                    "rationale": "While in-memory databases can boost performance, the question specifically asks about SQL vs NoSQL. Many disk-backed NoSQL databases are perfectly capable of handling real-time analytical workloads due to their optimized storage and querying for aggregate operations.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When migrating from a monolithic application with a highly normalized relational database to a microservices architecture, a common consideration is how to manage data. For a service that manages user profiles, which might include varying attributes like social media links, preferred settings, and historical preferences, what is a typical NoSQL approach compared to SQL for modeling this data within a single service's scope?",
            "hint": "Consider how relationships and varied attributes are handled in normalized SQL vs. denormalized or embedded NoSQL.",
            "answerOptions": [
                {
                    "text": "SQL would use a single `Users` table with JSON columns for flexible attributes, similar to NoSQL.",
                    "rationale": "While modern SQL databases increasingly support JSON types, the 'typical' SQL approach for varied attributes in a highly normalized design would be to use separate tables or columns, and it wouldn't be 'similar to NoSQL's' typical denormalization.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL would often embed varying user attributes directly within a single document (e.g., in a Document database) or as columns in a wide-column store, denormalizing the data.",
                    "rationale": "NoSQL databases, especially document and wide-column stores, frequently denormalize data by embedding related attributes directly within a single record or document. This optimizes for single-read operations and eliminates the need for joins, which aligns well with microservices' emphasis on self-contained services.",
                    "isCorrect": true
                },
                {
                    "text": "Both would use separate tables/collections for each attribute, linked by foreign keys/references, maintaining a normalized structure.",
                    "rationale": "While SQL aims for normalization with separate tables and foreign keys, NoSQL's typical approach for performance and query simplicity is to denormalize and embed data to avoid joins, particularly for attributes that are frequently accessed together with the main entity.",
                    "isCorrect": false
                },
                {
                    "text": "SQL would create a separate table for each possible user attribute, while NoSQL would use a graph model exclusively.",
                    "rationale": "SQL would not create a separate table for 'each possible attribute'; it would use columns or a few related tables. While a graph model could work for some profile scenarios, it's not the 'exclusive' or most typical NoSQL choice for varying attributes (document or wide-column are often preferred for this).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A distributed system needs to store session data for millions of users. While occasional slight delays in consistency (e.g., a 'last active' timestamp being a few seconds old) are acceptable, the system must remain highly available and partition tolerant even during network outages. Which consistency model is generally prioritized by NoSQL databases in such scenarios, and what does it imply?",
            "hint": "Recall the CAP theorem and the trade-offs NoSQL databases often make.",
            "answerOptions": [
                {
                    "text": "Strong Consistency: All replicas are updated simultaneously before a read is acknowledged, ensuring data is always up-to-date at the cost of availability.",
                    "rationale": "Strong consistency is difficult to achieve efficiently in highly distributed, available, and partition-tolerant systems without sacrificing one of the other CAP theorem properties. This is typically what SQL aims for, but it would often reduce availability during network partitions.",
                    "isCorrect": false
                },
                {
                    "text": "Eventual Consistency: Writes propagate to all replicas over time; reads might return stale data temporarily but will eventually be consistent, prioritizing availability and partition tolerance.",
                    "rationale": "Eventual consistency is a common model for NoSQL databases, where writes are acknowledged quickly, and data consistency across all replicas is achieved over time. This approach prioritizes high availability and partition tolerance, making it suitable for systems like session stores where slight inconsistencies are acceptable.",
                    "isCorrect": true
                },
                {
                    "text": "Immediate Consistency: Data is consistent across all nodes immediately after a write, but only within a single data center.",
                    "rationale": "This term is not a standard model describing the core difference in distributed systems consistency trade-offs between SQL and NoSQL. While some systems achieve strong consistency within a data center, it doesn't address the distributed system's overall availability and partition tolerance during failures.",
                    "isCorrect": false
                },
                {
                    "text": "Causal Consistency: Guarantees that if event A caused event B, then B will not be seen without A being seen first, but does not guarantee global order or immediate consistency.",
                    "rationale": "Causal consistency is a specific type of consistency model, but 'eventual consistency' is the broader and more frequently discussed trade-off NoSQL databases make when prioritizing availability and partition tolerance over strict, immediate consistency in distributed environments.",
                    "isCorrect": false
                }
            ]
        }
    ]
};