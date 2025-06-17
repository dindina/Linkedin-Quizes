const quizName = "SQL vs. NoSQL Databases Quiz";
const quizData = {
    "questions": [
        {
            "question": "Your e-commerce application requires strict transactional integrity for processing orders and managing inventory, ensuring that operations are atomic, consistent, isolated, and durable (ACID). Which database type is fundamentally designed to provide these guarantees?",
            "hint": "Think about the traditional database model that prioritizes data reliability and consistency through well-defined transaction rules.",
            "answerOptions": [
                {
                    "text": "SQL Relational Databases (e.g., PostgreSQL, MySQL)",
                    "rationale": "SQL databases are built around the ACID model, making them ideal for applications where data integrity and transactional consistency are paramount, such as financial transactions or inventory management.",
                    "isCorrect": true
                },
                {
                    "text": "NoSQL Document Databases (e.g., MongoDB)",
                    "rationale": "While some NoSQL databases offer ACID transactions for limited scopes (e.g., single document), they often prioritize availability and scalability (BASE model) over strict, global ACID compliance typical of SQL systems.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Key-Value Stores (e.g., Redis)",
                    "rationale": "Key-value stores are optimized for speed and simple lookups, and generally do not provide the complex transactional capabilities or ACID guarantees across multiple operations that SQL databases offer.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Column-Family Databases (e.g., Cassandra)",
                    "rationale": "Column-family databases excel at handling large volumes of writes and reads but typically offer eventual consistency and are not primarily designed for strong ACID transactional integrity across diverse operations.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You are developing a content management system where the structure of articles and user-generated content can vary greatly and is expected to evolve rapidly. The system also needs to scale horizontally to handle a large, growing number of users and content items. Which database approach is generally better suited?",
            "hint": "Consider databases that don't enforce a rigid schema upfront and are designed to distribute data across many servers easily.",
            "answerOptions": [
                {
                    "text": "NoSQL Document Databases (e.g., MongoDB)",
                    "rationale": "Document databases offer schema flexibility (schema-on-read), allowing diverse data structures to coexist and evolve easily. They are also typically designed for horizontal scalability.",
                    "isCorrect": true
                },
                {
                    "text": "SQL Relational Databases (e.g., MySQL)",
                    "rationale": "SQL databases enforce a predefined schema (schema-on-write). Frequent schema changes can be complex, and while they can scale, horizontal scaling often requires more intricate setups compared to many NoSQL solutions designed for it.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Graph Databases (e.g., Neo4j)",
                    "rationale": "Graph databases are specialized for relationship-heavy data. While they offer schema flexibility, a document database is often a more direct fit for general content management with varied structures.",
                    "isCorrect": false
                },
                {
                    "text": "In-Memory SQL Databases (e.g., HSQLDB)",
                    "rationale": "In-memory SQL databases are fast but are limited by RAM and typically used for specific use cases like caching or embedded systems, not for large-scale, persistent content management with evolving schemas.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A financial analytics platform needs to perform complex queries that involve joining data from many different, highly structured tables (e.g., customer accounts, transaction histories, market data). Which database type offers the most mature and powerful capabilities for such relational queries?",
            "hint": "This database type uses a standardized query language specifically designed for managing and querying structured, related data across multiple tables.",
            "answerOptions": [
                {
                    "text": "SQL Relational Databases",
                    "rationale": "SQL (Structured Query Language) is specifically designed for complex queries, including multi-table JOINs, aggregations, and subqueries, making relational databases ideal for scenarios requiring deep analysis of structured, interconnected data.",
                    "isCorrect": true
                },
                {
                    "text": "NoSQL Graph Databases",
                    "rationale": "Graph databases excel at traversing relationships, but for traditional, multi-table JOINs on highly structured data as described, SQL databases are generally more established and optimized.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Document Databases",
                    "rationale": "Document databases can store related data embedded within documents, reducing the need for some joins. However, performing complex, ad-hoc joins across different collections (tables) is often less efficient or straightforward than in SQL.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Key-Value Stores",
                    "rationale": "Key-value stores are not designed for complex querying or joining data; such operations would need to be implemented in the application layer, which is inefficient for this use case.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For a high-traffic web application, you need to implement a caching layer to store frequently accessed data (like user session information or popular product details) for extremely fast retrieval, primarily using simple key-based lookups. Which type of NoSQL database excels at this?",
            "hint": "This database type is optimized for speed and simplicity, storing data as pairs of unique identifiers and their corresponding values, often in memory.",
            "answerOptions": [
                {
                    "text": "NoSQL Key-Value Store (e.g., Redis, Memcached)",
                    "rationale": "Key-value stores, especially in-memory ones like Redis, are designed for very low-latency reads and writes based on keys, making them perfect for caching frequently accessed data.",
                    "isCorrect": true
                },
                {
                    "text": "SQL Relational Database (e.g., MySQL)",
                    "rationale": "While SQL databases can be used for caching, they typically have more overhead than specialized key-value stores for simple lookups, making them less ideal for high-performance caching layers.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Document Database (e.g., MongoDB)",
                    "rationale": "Document databases can be used for caching, but key-value stores are generally simpler and faster for direct key-based retrieval scenarios typical of caching.",
                    "isCorrect": false
                },
                {
                    "text": "NoSQL Column-Family Database (e.g., Cassandra)",
                    "rationale": "Column-family databases are built for massive datasets and high write throughput, which is often overkill and less optimized for the typical low-latency, simple lookup patterns of a caching layer.",
                    "isCorrect": false
                }
            ]
        }
    ]
};