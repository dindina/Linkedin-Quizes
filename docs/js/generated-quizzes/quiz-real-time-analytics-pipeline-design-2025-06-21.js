const quizName = "Real-time Analytics Pipeline Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which sequence best represents the core logical components of a typical real-time analytics pipeline?",
            "hint": "Consider the flow of data from its source to its consumption by analysts or dashboards.",
            "answerOptions": [
                {
                    "text": "Data Source -> Message Queue -> Stream Processor -> Real-time Analytics Database/Serving Layer",
                    "rationale": "This sequence aligns with standard real-time pipeline architecture: data is generated, buffered in a message queue, processed by a stream processor (e.g., Flink, Spark Streaming), and then made queryable in a specialized real-time database (e.g., Druid, Pinot) or served to a dashboard.",
                    "isCorrect": true
                },
                {
                    "text": "Data Source -> Batch Processor -> Data Warehouse -> BI Tool",
                    "rationale": "This describes a traditional *batch* analytics pipeline, not a real-time one, due to the batch processor and data warehouse which typically have higher latency.",
                    "isCorrect": false
                },
                {
                    "text": "Message Queue -> ETL Tool -> Relational Database -> Report Generator",
                    "rationale": "While some components are relevant, an ETL tool is often for batch/near-real-time and a generic relational database isn't optimized for real-time OLAP queries at scale. It lacks the explicit stream processing step.",
                    "isCorrect": false
                },
                {
                    "text": "Data Lake -> Data Mart -> OLAP Cube -> Dashboard",
                    "rationale": "This represents a data warehousing architecture, which can support analytics, but isn't specifically optimized for *real-time* ingestion and processing, and the initial data ingestion/processing layers are missing.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a real-time analytics pipeline, what is often the most critical non-functional requirement that distinguishes it from a batch analytics pipeline?",
            "hint": "The 'real-time' aspect directly relates to how quickly data can be processed and made available.",
            "answerOptions": [
                {
                    "text": "High data throughput",
                    "rationale": "While high throughput is important, it's often balanced with latency. A batch system might prioritize throughput over latency.",
                    "isCorrect": false
                },
                {
                    "text": "End-to-end latency (freshness of data)",
                    "rationale": "The defining characteristic of a 'real-time' pipeline is its ability to process and serve data with minimal delay from when the event occurred. Low end-to-end latency ensures data freshness.",
                    "isCorrect": true
                },
                {
                    "text": "Strict ACID properties for transactions",
                    "rationale": "ACID properties are crucial for transactional systems (OLTP) but are often relaxed in real-time analytics for performance, focusing instead on eventual consistency or strong consistency for specific operations.",
                    "isCorrect": false
                },
                {
                    "text": "Low storage cost per terabyte",
                    "rationale": "Storage cost is a general consideration for any data system but not the primary distinguishing factor for *real-time* systems, which often involve in-memory processing or specialized storage, which can be more expensive per TB.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following technologies is primarily designed for low-latency, high-throughput stream processing and stateful computations over unbounded data streams?",
            "hint": "Look for a distributed framework that handles data *in motion* and supports complex event processing or continuous transformations.",
            "answerOptions": [
                {
                    "text": "Apache Hadoop HDFS",
                    "rationale": "HDFS is a distributed file system for storing large datasets, primarily used for batch processing with frameworks like MapReduce, not low-latency stream processing.",
                    "isCorrect": false
                },
                {
                    "text": "Apache Flink",
                    "rationale": "Apache Flink is a powerful distributed stream processing framework known for its ability to handle high-throughput, low-latency data streams with event-time processing, state management, and fault tolerance.",
                    "isCorrect": true
                },
                {
                    "text": "Apache Cassandra",
                    "rationale": "Cassandra is a NoSQL distributed database suitable for high-availability, high-write throughput applications, but it's a data store, not a stream processing engine.",
                    "isCorrect": false
                },
                {
                    "text": "PostgreSQL",
                    "rationale": "PostgreSQL is a traditional relational database, excellent for transactional data and structured queries, but not designed for real-time, high-volume stream processing.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a real-time analytics pipeline, what is the primary role of a distributed message queue like Apache Kafka?",
            "hint": "Think about how data producers and consumers interact in a scalable, fault-tolerant manner.",
            "answerOptions": [
                {
                    "text": "Performing complex aggregations and transformations on data.",
                    "rationale": "This is the role of a stream processing engine (e.g., Flink, Spark Streaming), not primarily a message queue. While Kafka Connect can do simple transformations, it's not its core role.",
                    "isCorrect": false
                },
                {
                    "text": "Storing long-term historical data for compliance and auditing.",
                    "rationale": "While Kafka can retain data for some period (days/weeks), it's not typically the primary long-term storage solution for historical data (that's usually a data lake or data warehouse). Its strength is in real-time buffering.",
                    "isCorrect": false
                },
                {
                    "text": "Decoupling data producers from consumers, buffering event streams, and ensuring durability and fault tolerance.",
                    "rationale": "Kafka acts as a central nervous system for data, allowing different services to produce and consume events asynchronously, providing a durable log of events, and handling backpressure, which are critical for real-time pipelines.",
                    "isCorrect": true
                },
                {
                    "text": "Providing a real-time OLAP database for interactive dashboard queries.",
                    "rationale": "This is the role of a specialized real-time analytics database (e.g., Druid, Pinot), not a message queue.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "For a real-time analytics dashboard requiring sub-second query response times on continuously updated, pre-aggregated or raw event metrics (e.g., website clicks per second, active users), which type of database is most suitable as the serving layer?",
            "hint": "Consider databases designed for high-concurrency, low-latency analytical queries on streaming data.",
            "answerOptions": [
                {
                    "text": "Traditional OLTP Relational Database (e.g., MySQL)",
                    "rationale": "OLTP databases are optimized for transactional integrity and many small reads/writes, not for high-volume analytical queries on aggregated real-time data which often involves scans over large datasets.",
                    "isCorrect": false
                },
                {
                    "text": "Key-Value Store (e.g., Redis)",
                    "rationale": "Key-Value stores are excellent for very fast lookups of specific values, but not typically for complex aggregations or analytical queries over large datasets.",
                    "isCorrect": false
                },
                {
                    "text": "Real-time OLAP Database (e.g., Apache Druid, Apache Pinot, ClickHouse)",
                    "rationale": "These databases are specifically designed for low-latency ingest of streaming data and sub-second analytical queries (OLAP) on large volumes of data, making them ideal for real-time dashboards.",
                    "isCorrect": true
                },
                {
                    "text": "Document Database (e.g., MongoDB)",
                    "rationale": "Document databases are flexible and scalable but are generally not optimized for the kind of columnar aggregations and analytical query patterns required for high-performance real-time OLAP.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A common challenge in real-time stream processing is handling out-of-order events. Which of the following strategies is most effective for addressing this in a stream processing framework (e.g., Apache Flink, Spark Streaming)?",
            "hint": "These frameworks often use a concept of 'time' to define boundaries for processing, allowing for some leniency in event arrival.",
            "answerOptions": [
                {
                    "text": "Rejecting all events that arrive out of order.",
                    "rationale": "This is overly simplistic and would lead to significant data loss in many real-world scenarios where network latency or system clock skews are common.",
                    "isCorrect": false
                },
                {
                    "text": "Buffering events and using watermarks to define processing windows.",
                    "rationale": "Watermarks are a fundamental concept in stream processing. They provide a notion of 'event time progress' and allow the system to buffer events until the watermark indicates that all (or most) events up to a certain timestamp have been received, thus correctly processing events within their proper temporal windows even if they arrive out of order.",
                    "isCorrect": true
                },
                {
                    "text": "Storing all events in a relational database and processing them nightly in batch.",
                    "rationale": "This describes a batch processing approach, not a real-time solution, and would introduce significant latency.",
                    "isCorrect": false
                },
                {
                    "text": "Processing events immediately upon arrival, regardless of their timestamps.",
                    "rationale": "This is 'processing time' semantics and can lead to incorrect or inconsistent results when aggregations or windowed operations depend on 'event time,' as later-arriving but earlier-timestamped events would be missed from their correct window.",
                    "isCorrect": false
                }
            ]
        }
    ]
};