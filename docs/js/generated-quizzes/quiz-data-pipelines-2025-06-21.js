const quizName = "Data Pipelines Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary difference in data flow between an ETL (Extract, Transform, Load) and an ELT (Extract, Load, Transform) data pipeline?",
            "hint": "Focus on *when* the transformation step occurs relative to loading the data into the target system.",
            "answerOptions": [
                {
                    "text": "ETL transforms data before loading into the target system, while ELT transforms data after loading it into the target system.",
                    "rationale": "In ETL, data is transformed in a staging area before being loaded into the data warehouse. In ELT, raw data is loaded directly into a data lake or data warehouse, and transformations are performed within the target system itself, leveraging its processing power.",
                    "isCorrect": true
                },
                {
                    "text": "ETL is exclusively for streaming data, while ELT is for batch data.",
                    "rationale": "Both ETL and ELT can be applied to both batch and streaming contexts, although ELT often aligns well with data lake architectures that handle large volumes of raw data.",
                    "isCorrect": false
                },
                {
                    "text": "ETL prioritizes data quality over performance, whereas ELT prioritizes performance over data quality.",
                    "rationale": "Neither ETL nor ELT inherently prioritizes one over the other; both can be designed for high data quality and performance. The choice often depends on the tools, scale, and specific requirements.",
                    "isCorrect": false
                },
                {
                    "text": "ETL uses only relational databases, while ELT uses only NoSQL databases.",
                    "rationale": "The choice of database type is independent of whether a pipeline is ETL or ELT. Both can integrate with various database types.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of a streaming data pipeline, what is 'backpressure' and why is it a critical concern?",
            "hint": "Consider what happens when a downstream component cannot keep up with the rate of data coming from an upstream component.",
            "answerOptions": [
                {
                    "text": "It refers to the accumulation of unprocessed data when a downstream processing stage cannot keep up with the incoming data rate from an upstream stage.",
                    "rationale": "Backpressure occurs when data producers send data faster than consumers can process it, leading to a build-up of messages in queues or buffers, which can cause resource exhaustion, increased latency, or even system crashes if not handled gracefully.",
                    "isCorrect": true
                },
                {
                    "text": "It's the process of pushing processed data back to the source system for validation.",
                    "rationale": "This describes a feedback loop or data synchronization, not backpressure. Backpressure specifically refers to congestion in the data flow.",
                    "isCorrect": false
                },
                {
                    "text": "It's a mechanism for compressing data to reduce network load in high-throughput systems.",
                    "rationale": "Data compression is a technique to optimize network usage, but it's not the definition of backpressure. While compression might alleviate some pressure, it doesn't describe the phenomenon itself.",
                    "isCorrect": false
                },
                {
                    "text": "It describes the latency introduced by network hops between different components of the pipeline.",
                    "rationale": "Network latency is a separate performance metric. While high latency can contribute to backpressure, backpressure itself is the result of differing processing speeds.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following best describes the role of a distributed message queue (e.g., Apache Kafka, RabbitMQ) in a modern data pipeline?",
            "hint": "Think about how data producers and consumers are decoupled and how data is durably stored for streaming.",
            "answerOptions": [
                {
                    "text": "Its main purpose is to perform complex transformations and aggregations on large datasets.",
                    "rationale": "Complex transformations and aggregations are typically performed by processing engines (e.g., Apache Spark, Flink) that consume data from the message queue.",
                    "isCorrect": false
                },
                {
                    "text": "Acts as a durable, fault-tolerant buffer and communication backbone for streaming data, decoupling producers from consumers.",
                    "rationale": "Distributed message queues serve as central hubs where data producers can write events and multiple consumers can read them asynchronously. They provide durability, fault tolerance, and enable asynchronous processing.",
                    "isCorrect": true
                },
                {
                    "text": "Primarily used for long-term archival storage of processed data in a data lake.",
                    "rationale": "While message queues can be a source for data lakes, their primary role is not long-term archival storage but rather real-time stream ingestion and reliable data transport.",
                    "isCorrect": false
                },
                {
                    "text": "Serves as the primary analytical database for end-users to query processed information.",
                    "rationale": "Message queues are not designed as analytical databases. Processed data is usually loaded into data warehouses or data marts for analytical querying.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a robust data pipeline, what does the term 'idempotency' refer to, and why is it important for fault tolerance?",
            "hint": "Consider the effect of re-running an operation or processing the same data multiple times.",
            "answerOptions": [
                {
                    "text": "The ability of a pipeline to process data within a specified time limit, ensuring low latency.",
                    "rationale": "This describes latency or real-time processing capabilities, not idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "The property that a data operation can be applied multiple times without changing the result beyond the initial application, crucial for 'at-least-once' processing guarantees.",
                    "rationale": "Idempotency ensures that if a data record is accidentally processed more than once due to retries or system failures (common in 'at-least-once' delivery systems), the final state or result remains consistent and correct, preventing duplicates or incorrect calculations.",
                    "isCorrect": true
                },
                {
                    "text": "The measure of how many different data sources a pipeline can ingest from simultaneously.",
                    "rationale": "This relates to source integration capabilities, not idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "The process of validating data schema against a predefined standard to prevent malformed data.",
                    "rationale": "This describes schema validation, which is important for data quality but separate from idempotency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Consider a scenario where an ETL pipeline processes customer orders. If the source system later adds a new optional field 'discount_code' to the order data, what design principle is crucial for the pipeline to handle this change gracefully without failure?",
            "hint": "Think about how changes in data structure (schemas) are managed over time.",
            "answerOptions": [
                {
                    "text": "Strict schema enforcement, requiring immediate full pipeline redeployment.",
                    "rationale": "Strict schema enforcement without built-in flexibility would likely cause the pipeline to break when an unexpected field appears, requiring immediate manual intervention and redeployment.",
                    "isCorrect": false
                },
                {
                    "text": "Schema-on-read or supporting schema evolution, allowing the pipeline to adapt to new or changed fields without immediate breakage.",
                    "rationale": "Schema evolution (e.g., using Avro, Parquet with schema evolution support) or schema-on-read (common in data lakes with JSON/CSV) allows the pipeline to process data even when the schema changes, often by ignoring unknown fields or defining them as optional.",
                    "isCorrect": true
                },
                {
                    "text": "Switching from batch processing to real-time streaming processing.",
                    "rationale": "The choice between batch and streaming processing is orthogonal to handling schema changes gracefully. Both types of pipelines need a strategy for schema evolution.",
                    "isCorrect": false
                },
                {
                    "text": "Using an in-memory database for all intermediate storage.",
                    "rationale": "The type of database used for intermediate storage doesn't directly solve the problem of handling evolving data schemas.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You are designing a data pipeline that needs to join data from multiple disparate sources, perform complex aggregations over large historical datasets, and then load the results into a data warehouse daily. Which processing paradigm is generally most suitable for this scenario?",
            "hint": "Consider the characteristics of periodic, large-scale, and complex transformations versus continuous, real-time reactions.",
            "answerOptions": [
                {
                    "text": "Real-time streaming processing",
                    "rationale": "Real-time streaming is best for immediate, low-latency insights on continuously arriving data, not typically for daily, complex aggregations over large historical datasets.",
                    "isCorrect": false
                },
                {
                    "text": "Micro-batch processing",
                    "rationale": "Micro-batching is a form of streaming that processes data in small batches, reducing latency compared to traditional batching but still geared towards continuous data flows rather than daily, complex historical aggregations.",
                    "isCorrect": false
                },
                {
                    "text": "Batch processing",
                    "rationale": "Batch processing is ideal for scenarios involving large volumes of historical data, complex transformations, joins across multiple sources, and periodic (e.g., daily) updates to a data warehouse, where latency of minutes to hours is acceptable.",
                    "isCorrect": true
                },
                {
                    "text": "Event-driven processing",
                    "rationale": "Event-driven processing focuses on reacting to individual events as they occur, which aligns more with streaming paradigms rather than large-scale, periodic historical data processing.",
                    "isCorrect": false
                }
            ]
        }
    ]
};