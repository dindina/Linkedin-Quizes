const quizName ="System Design - Quiz 1"
const quizData = {
    "questions": [
        {
            "question": "An online gaming platform needs to maintain a real-time leaderboard that is updated thousands of times per second. Which type of database is best suited for this high-throughput, write-heavy use case?",
            "hint": "Consider a database model that is optimized for extremely fast reads and writes using a simple data structure, often used for caching and session management.",
            "answerOptions": [
                {
                    "text": "Key-Value Store (e.g., Redis)",
                    "rationale": "Key-value stores are designed for extreme speed and low latency by using simple key-based lookups, making them ideal for high-frequency updates like a real-time leaderboard.",
                    "isCorrect": true
                },
                {
                    "text": "Relational Database (e.g., PostgreSQL)",
                    "rationale": "A relational database would struggle with the high volume of write operations, as its transactional overhead (ACID compliance) would create significant performance bottlenecks.",
                    "isCorrect": false
                },
                {
                    "text": "Graph-Based Database (e.g., Neo4j)",
                    "rationale": "Graph databases excel at managing complex relationships, which is not the primary requirement for a simple leaderboard structure.",
                    "isCorrect": false
                },
                {
                    "text": "Document-Oriented Database (e.g., MongoDB)",
                    "rationale": "While flexible, a document database's overhead for managing JSON-like documents is not as performant for this specific high-frequency update task as a simpler key-value model.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A video streaming service wants to ensure smooth playback for users globally. Which technology is most critical for reducing latency by delivering video content from servers geographically closer to the user?",
            "hint": "Think about a distributed network of servers that caches content at the 'edge' of the network.",
            "answerOptions": [
                {
                    "text": "Content Delivery Network (CDN)",
                    "rationale": "A CDN's primary purpose is to cache content in multiple geographic locations to serve it from the nearest point to the user, which directly reduces network latency.",
                    "isCorrect": true
                },
                {
                    "text": "Load Balancer",
                    "rationale": "A load balancer distributes traffic among origin servers but does not solve the problem of geographic distance between the user and those servers.",
                    "isCorrect": false
                },
                {
                    "text": "API Gateway",
                    "rationale": "An API Gateway manages API requests and routing, but it does not handle the delivery of large static assets like video files across the globe.",
                    "isCorrect": false
                },
                {
                    "text": "Horizontal Scaling of Servers",
                    "rationale": "While scaling servers is important for handling load, it doesn't address the network latency caused by physical distance to the user, which a CDN is specifically designed to solve.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "An IoT system ingests millions of events per minute from sensors. The system must process these events asynchronously to update dashboards, trigger alerts, and store data for analytics. Which architectural pattern is best suited for this scenario?",
            "hint": "This pattern is built around the concept of producers, consumers, and a central broker to handle a high volume of asynchronous messages.",
            "answerOptions": [
                {
                    "text": "Event-Driven Architecture (EDA)",
                    "rationale": "EDA is designed for handling high-throughput, asynchronous data streams, decoupling producers (sensors) from various consumers (dashboards, alerts), which is ideal for this IoT use case.",
                    "isCorrect": true
                },
                {
                    "text": "Monolithic Architecture",
                    "rationale": "A monolithic architecture would struggle to process such a high volume of concurrent events in a resilient and scalable manner due to its tightly coupled nature.",
                    "isCorrect": false
                },
                {
                    "text": "Layered Architecture",
                    "rationale": "A layered architecture organizes code within an application but doesn't inherently provide the asynchronous, decoupled communication needed for this high-volume event processing.",
                    "isCorrect": false
                },
                {
                    "text": "Client-Server Pattern",
                    "rationale": "While the system is a client-server system, this general pattern doesn't specify the asynchronous, decoupled approach that is critical for handling the described event stream.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A financial services application processes critical transactions and must guarantee that data is always correct and up-to-date across all parts of the system, even if it means temporarily halting operations during a network failure. Which two properties of the CAP theorem are being prioritized?",
            "hint": "The system cannot tolerate incorrect or out-of-sync data. What must it sacrifice to maintain this guarantee during a network partition?",
            "answerOptions": [
                {
                    "text": "Consistency and Partition Tolerance (CP)",
                    "rationale": "Prioritizing consistency means the system will refuse to respond if it cannot guarantee the data is correct during a network partition, which aligns with the needs of a critical financial system.",
                    "isCorrect": true
                },
                {
                    "text": "Availability and Partition Tolerance (AP)",
                    "rationale": "Prioritizing availability would mean the system might return stale data during a partition, which is unacceptable for critical financial transactions.",
                    "isCorrect": false
                },
                {
                    "text": "Consistency and Availability (CA)",
                    "rationale": "The CAP theorem posits that achieving both consistency and availability is not possible in a distributed system that experiences network partitions.",
                    "isCorrect": false
                },
                {
                    "text": "Availability and Scalability",
                    "rationale": "Scalability is a related but separate concept and is not one of the three core properties of the CAP theorem.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a system with a microservices architecture, what is the primary role of an API Gateway?",
            "hint": "Consider how clients interact with dozens of individual services. This component acts as a single front door.",
            "answerOptions": [
                {
                    "text": "To provide a single, unified entry point for all client requests and handle cross-cutting concerns like authentication and rate limiting.",
                    "rationale": "An API Gateway simplifies client interaction with a complex backend by routing requests and centralizing common functionalities, abstracting away the underlying service structure.",
                    "isCorrect": true
                },
                {
                    "text": "To store cached data from various microservices to improve performance.",
                    "rationale": "While an API Gateway can perform caching, its primary role is request routing and management, not acting as a dedicated distributed caching layer like Redis or Memcached.",
                    "isCorrect": false
                },
                {
                    "text": "To host the business logic for all of the individual microservices.",
                    "rationale": "This describes a monolithic architecture. The business logic in a microservices pattern is intentionally distributed among the individual services themselves.",
                    "isCorrect": false
                },
                {
                    "text": "To manage the deployment and scaling of each individual microservice container.",
                    "rationale": "This function is handled by a container orchestration platform like Kubernetes, not an API Gateway.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A team is building an e-commerce platform. When an order is placed, the system must write to the database and clear the item from the cache to ensure data consistency. The highest priority is data integrity, even if it makes the write operation slightly slower. Which caching strategy should be used?",
            "hint": "The chosen strategy must guarantee that a write operation is reflected in both the primary data store and the cache before confirming success.",
            "answerOptions": [
                {
                    "text": "Write-Through",
                    "rationale": "This strategy writes data to both the cache and the database simultaneously, ensuring strong consistency at the cost of slightly higher write latency, which meets the stated requirements.",
                    "isCorrect": true
                },
                {
                    "text": "Write-Behind (Write-Back)",
                    "rationale": "Write-behind is faster for writes because it updates the database asynchronously, but it risks data inconsistency if the cache fails before the database is updated, making it unsuitable here.",
                    "isCorrect": false
                },
                {
                    "text": "Cache-Aside (Lazy-Loading)",
                    "rationale": "Cache-aside deals with how data is read and loaded into the cache, not primarily how it is written, making it less relevant to the core requirement of write consistency.",
                    "isCorrect": false
                },
                {
                    "text": "Least Recently Used (LRU) Eviction",
                    "rationale": "LRU is an eviction policy that determines which items to remove when the cache is full; it is not a write strategy.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A web application's user base is growing rapidly, and the single server handling all traffic is nearing its CPU and RAM limits. What is the most common and flexible long-term strategy to ensure the application can handle future growth?",
            "hint": "Instead of making one server more powerful, what if you could just add more servers to the fleet?",
            "answerOptions": [
                {
                    "text": "Horizontal Scaling (Scaling Out)",
                    "rationale": "Adding more machines and distributing the load with a load balancer is the standard, flexible approach for handling large-scale growth in distributed systems.",
                    "isCorrect": true
                },
                {
                    "text": "Vertical Scaling (Scaling Up)",
                    "rationale": "While increasing the resources of the single server is a temporary fix, it has physical limits and creates a single point of failure, making it less flexible for long-term growth.",
                    "isCorrect": false
                },
                {
                    "text": "Database Optimization",
                    "rationale": "Optimizing database queries is important for performance but does not solve the fundamental problem of the application server itself being overloaded with traffic.",
                    "isCorrect": false
                },
                {
                    "text": "Implementing a more efficient programming language.",
                    "rationale": "Rewriting the application might offer performance gains, but it is a massive undertaking and doesn't address the architectural need to distribute load across multiple machines.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a complex distributed system, a single user request often travels through multiple microservices. If a request becomes slow, what is the best observability tool to identify exactly which service is causing the bottleneck?",
            "hint": "You need to see the entire journey of one request, including the time spent in each step, from start to finish.",
            "answerOptions": [
                {
                    "text": "Distributed Tracing",
                    "rationale": "Tracing is specifically designed to follow a single request's path across multiple services, providing a detailed breakdown of latency at each step, making it ideal for pinpointing bottlenecks.",
                    "isCorrect": true
                },
                {
                    "text": "Log Aggregation",
                    "rationale": "Logs provide detailed events within each service, but piecing together the end-to-end journey of one request from aggregated logs is difficult and time-consuming.",
                    "isCorrect": false
                },
                {
                    "text": "Metrics Monitoring",
                    "rationale": "Metrics can show that a service has high average latency, but they can't confirm that it was the bottleneck for a specific slow request without the context provided by a trace.",
                    "isCorrect": false
                },
                {
                    "text": "Health Checks",
                    "rationale": "Health checks only indicate if a service is up or down; they provide no information about the performance or latency of individual requests.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A cloud application needs to allow users to upload large files (e.g., videos, backups). Which type of cloud storage service is designed for storing vast amounts of unstructured data in a highly scalable and durable manner?",
            "hint": "This storage type treats data as discrete units with metadata, unlike a traditional file system's hierarchical structure.",
            "answerOptions": [
                {
                    "text": "Object Storage (e.g., AWS S3, Google Cloud Storage)",
                    "rationale": "Object storage is specifically designed for storing and retrieving large amounts of unstructured data, offering virtually limitless scalability and high durability.",
                    "isCorrect": true
                },
                {
                    "text": "Block Storage (e.g., AWS EBS, GCP Persistent Disk)",
                    "rationale": "Block storage provides raw storage volumes for virtual machines, acting like a hard drive. It is not the ideal model for storing and accessing large, independent files like videos.",
                    "isCorrect": false
                },
                {
                    "text": "File Storage (e.g., AWS EFS, GCP Filestore)",
                    "rationale": "Managed file storage provides a shared file system, which is useful for certain applications but generally doesn't offer the same massive scalability and cost-effectiveness for unstructured data as object storage.",
                    "isCorrect": false
                },
                {
                    "text": "In-Memory Cache (e.g., Redis)",
                    "rationale": "An in-memory cache is used for temporary, fast-access data storage, not for the persistent, long-term storage of large files.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A system processes user requests that are not time-sensitive, such as generating end-of-day reports or sending bulk emails. What component should be used to decouple the initial request from the actual processing to improve system responsiveness and handle load spikes?",
            "hint": "This component acts as a temporary holding area or buffer for tasks that need to be completed later.",
            "answerOptions": [
                {
                    "text": "Message Queue",
                    "rationale": "A message queue allows the main application to quickly accept a request and place it as a message for a separate worker process to handle asynchronously, improving resilience and responsiveness.",
                    "isCorrect": true
                },
                {
                    "text": "Database Trigger",
                    "rationale": "A database trigger can initiate actions, but it couples the processing directly to a database event and is less flexible for managing general application tasks than a message queue.",
                    "isCorrect": false
                },
                {
                    "text": "Load Balancer",
                    "rationale": "A load balancer distributes incoming real-time requests to servers; it does not manage asynchronous, deferred tasks.",
                    "isCorrect": false
                },
                {
                    "text": "CDN",
                    "rationale": "A CDN is for caching and delivering static content. It does not play a role in processing asynchronous application tasks.",
                    "isCorrect": false
                }
            ]
        }
    ]
};
