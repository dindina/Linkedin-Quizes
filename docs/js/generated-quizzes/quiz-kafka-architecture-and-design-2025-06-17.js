const quizName = "Kafka Architecture and Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary mechanism Kafka uses to achieve high throughput, parallelism, and scalability within a single topic?",
            "hint": "Think about how a topic's data is divided and distributed.",
            "answerOptions": [
                {
                    "text": "Consumer Groups",
                    "rationale": "Consumer groups enable parallel consumption, but the underlying mechanism for data distribution and storage within a topic that allows this parallelism is different.",
                    "isCorrect": false
                },
                {
                    "text": "Brokers",
                    "rationale": "Brokers host partitions and store data, but they are the physical machines, not the logical unit of parallelism within a topic.",
                    "isCorrect": false
                },
                {
                    "text": "Partitions",
                    "rationale": "Partitions are the fundamental unit of parallelism in Kafka. A topic is divided into one or more partitions, and each partition is an ordered, immutable sequence of records. This allows producers to write to different partitions in parallel and consumers to read from different partitions in parallel.",
                    "isCorrect": true
                },
                {
                    "text": "Replication Factor",
                    "rationale": "Replication factor is primarily concerned with data durability and fault tolerance by creating copies of partitions. While it affects availability, it's not the primary mechanism for inherent parallelism within a single topic.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To ensure data durability and fault tolerance, Kafka maintains a set of In-Sync Replicas (ISRs) for each partition. What does it mean for a replica to be 'in-sync'?",
            "hint": "Consider its state relative to the leader and its readiness to take over.",
            "answerOptions": [
                {
                    "text": "The replica is currently the leader for its partition.",
                    "rationale": "While a leader is always an ISR, not all ISRs are leaders. An ISR is a replica that is caught up with the leader.",
                    "isCorrect": false
                },
                {
                    "text": "The replica has successfully acknowledged receiving all messages from the leader that the leader has committed.",
                    "rationale": "An 'in-sync replica' (ISR) is a follower replica that has caught up to the leader's log and is considered fully synchronized. This means it has replicated all committed messages from the leader and is ready to be elected as the new leader if the current leader fails.",
                    "isCorrect": true
                },
                {
                    "text": "The replica has committed its offset to the internal __consumer_offsets topic.",
                    "rationale": "This refers to consumer progress tracking, which is unrelated to a broker replica's 'in-sync' status.",
                    "isCorrect": false
                },
                {
                    "text": "The replica is connected to the Zookeeper ensemble (or Kafka Raft controller in Kraft mode).",
                    "rationale": "General connectivity is necessary but not sufficient for a replica to be considered 'in-sync.' It must specifically be caught up with the leader's log.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a Kafka consumer group, who or what is primarily responsible for tracking the committed offset for each partition that a consumer in the group is reading from?",
            "hint": "It's not the individual consumer client storing it locally long-term, nor the producer.",
            "answerOptions": [
                {
                    "text": "The Kafka broker where the partition leader resides.",
                    "rationale": "Kafka brokers store the committed offsets for consumer groups in a special internal topic called `__consumer_offsets`. Consumers periodically commit their progress (offsets) to this topic, and the brokers manage this information.",
                    "isCorrect": true
                },
                {
                    "text": "The ZooKeeper ensemble (or Kafka Raft controller in Kraft mode).",
                    "rationale": "Historically, ZooKeeper was used for older consumer APIs (and for broker metadata), but for the modern consumer API, offsets are stored directly in Kafka brokers.",
                    "isCorrect": false
                },
                {
                    "text": "Each individual consumer client application instance.",
                    "rationale": "While consumers *read* their last committed offset and *determine* their next offset, the durable storage and management of the committed offset is handled by the Kafka brokers, not locally by each client.",
                    "isCorrect": false
                },
                {
                    "text": "The producer that originally sent the messages.",
                    "rationale": "Producers are responsible for sending messages to Kafka and are unaware of how or where consumers are reading those messages or their progress.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following `acks` configurations in a Kafka producer provides the strongest guarantee of data durability, ensuring that a message is considered committed only after it has been replicated to all in-sync replicas?",
            "hint": "Think about the most conservative acknowledgment setting.",
            "answerOptions": [
                {
                    "text": "`acks=0`",
                    "rationale": "This setting provides no acknowledgment. The producer does not wait for any confirmation from the broker, resulting in the highest throughput but lowest durability (potential for data loss).",
                    "isCorrect": false
                },
                {
                    "text": "`acks=1`",
                    "rationale": "The producer waits for the leader replica to acknowledge the write. This offers a good balance of durability and performance, but data loss is still possible if the leader fails before its followers have replicated the message.",
                    "isCorrect": false
                },
                {
                    "text": "`acks=all` (or `acks=-1`)",
                    "rationale": "This setting provides the strongest durability guarantee. The producer waits for the leader replica and all in-sync follower replicas to acknowledge the write. Data is considered committed only when it's safely replicated across the cluster.",
                    "isCorrect": true
                },
                {
                    "text": "`acks=auto`",
                    "rationale": "`acks=auto` is not a standard Kafka producer configuration value. Common values are `0`, `1`, or `all` (or `-1`).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Historically, what was the primary role of Apache ZooKeeper in a Kafka cluster, before the introduction of KIP-500 (Kafka Raft / Kraft mode)?",
            "hint": "Think about its function related to cluster coordination and metadata management.",
            "answerOptions": [
                {
                    "text": "Storing all Kafka topic message data.",
                    "rationale": "Kafka topic message data is stored on the Kafka brokers themselves, not in ZooKeeper. ZooKeeper primarily managed metadata.",
                    "isCorrect": false
                },
                {
                    "text": "Storing consumer group offsets for all Kafka applications.",
                    "rationale": "While older consumer APIs (prior to 0.9) might have used ZooKeeper for offsets, modern Kafka consumer groups store their offsets directly within a Kafka topic (`__consumer_offsets`).",
                    "isCorrect": false
                },
                {
                    "text": "Maintaining metadata about brokers, topics, partitions, and handling leader elections.",
                    "rationale": "Historically, ZooKeeper served as the centralized coordination service for Kafka. It managed cluster metadata (like available brokers, topic configurations, partition assignments), tracked the state of the cluster, and was crucial for controller election and leader election for partitions.",
                    "isCorrect": true
                },
                {
                    "text": "Processing stream transformations for Kafka Streams applications.",
                    "rationale": "Kafka Streams is a client library for building stream processing applications; it runs on the client side and leverages Kafka topics for state and communication, but ZooKeeper does not directly process streams for it.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A Kafka topic can be configured with different retention policies. Which policy is best suited for applications that need to retain only the *latest* value for each message key, effectively removing older messages with the same key?",
            "hint": "This policy 'compacts' the log based on keys, ideal for changelog streams.",
            "answerOptions": [
                {
                    "text": "Time-based retention",
                    "rationale": "Time-based retention (e.g., `log.retention.hours`) deletes messages older than a specified duration, regardless of their key.",
                    "isCorrect": false
                },
                {
                    "text": "Size-based retention",
                    "rationale": "Size-based retention (e.g., `log.retention.bytes`) deletes the oldest messages once a partition exceeds a specified size limit, also regardless of key.",
                    "isCorrect": false
                },
                {
                    "text": "Log compaction",
                    "rationale": "Log compaction (configured via `log.cleanup.policy=compact`) is designed to preserve the last known value for each message key. Kafka runs a 'log cleaner' process that removes older records with the same key for compacted topics, ensuring that only the latest value for each key is retained.",
                    "isCorrect": true
                },
                {
                    "text": "Unlimited retention",
                    "rationale": "Unlimited retention means messages are never deleted, which is the opposite of removing older messages with duplicate keys.",
                    "isCorrect": false
                }
            ]
        }
    ]
};