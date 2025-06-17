const quizName = "Event streaming in Kafka Quiz";
const quizData = {
    "questions": [
        {
            "question": "How does Apache Kafka guarantee the order of messages?",
            "hint": "Consider the smallest unit of parallelism and data storage within a Kafka topic.",
            "answerOptions": [
                {
                    "text": "Globally across the entire topic.",
                    "rationale": "Kafka guarantees message order only within a single partition, not globally across the entire topic.",
                    "isCorrect": false
                },
                {
                    "text": "Within a single partition.",
                    "rationale": "Messages sent to the same partition are guaranteed to be ordered and delivered to consumers in that order. Order is not guaranteed across different partitions of the same topic.",
                    "isCorrect": true
                },
                {
                    "text": "By consumer group across all partitions.",
                    "rationale": "Consumer groups handle load balancing across partitions, but they don't impose a global order across those partitions.",
                    "isCorrect": false
                },
                {
                    "text": "Based on the timestamp of message production.",
                    "rationale": "While messages have timestamps, ordering is based on their offset within a partition, not solely on the timestamp.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary mechanism Apache Kafka employs to achieve fault tolerance and high availability for messages?",
            "hint": "Think about how data durability is ensured even if a broker fails.",
            "answerOptions": [
                {
                    "text": "Storing messages in Apache ZooKeeper.",
                    "rationale": "ZooKeeper is used by Kafka for cluster coordination and metadata storage, but not for storing the actual message data.",
                    "isCorrect": false
                },
                {
                    "text": "Replicating topic partitions across multiple brokers.",
                    "rationale": "Kafka achieves fault tolerance and durability by replicating each topic partition across a configurable number of brokers. If a leader broker fails, one of the in-sync replicas can be promoted to leader.",
                    "isCorrect": true
                },
                {
                    "text": "Automatically backing up all messages to an S3 bucket.",
                    "rationale": "While integrations with object storage are possible, this is not a core, built-in mechanism for Kafka's fault tolerance; replication is the primary method.",
                    "isCorrect": false
                },
                {
                    "text": "Using a distributed file system like HDFS underneath its logs.",
                    "rationale": "Kafka uses its own optimized, log-structured file system for storing messages and does not rely on external distributed file systems like HDFS for its core storage.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When multiple consumer instances belong to the same Kafka consumer group and subscribe to a topic, how do they distribute the message processing load?",
            "hint": "Consider how partitions are assigned within a group.",
            "answerOptions": [
                {
                    "text": "All consumers in the group process all messages from the topic.",
                    "rationale": "This would lead to redundant processing and is not how consumer groups provide load balancing.",
                    "isCorrect": false
                },
                {
                    "text": "Messages are randomly assigned to consumers in the group.",
                    "rationale": "Messages are not randomly assigned; partitions are assigned to consumers.",
                    "isCorrect": false
                },
                {
                    "text": "Each consumer instance is assigned an exclusive subset of the topic's partitions to consume.",
                    "rationale": "Within a consumer group, each partition is consumed by exactly one consumer instance. This allows for load balancing and parallel processing across the group.",
                    "isCorrect": true
                },
                {
                    "text": "Only the leader consumer in the group processes messages.",
                    "rationale": "All active consumers in a group process messages from their assigned partitions; the 'leader' is typically for coordination during rebalancing, not for sole message processing.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which producer configuration is crucial for achieving 'at-least-once' message delivery semantics in Kafka?",
            "hint": "Think about how the producer ensures the broker has received the message and whether it should retry.",
            "answerOptions": [
                {
                    "text": "`enable.auto.commit=true` on the consumer.",
                    "rationale": "This setting affects how consumers commit their offsets, which is related to consumer delivery guarantees, not producer delivery guarantees.",
                    "isCorrect": false
                },
                {
                    "text": "Producer `acks=all` (or `acks=-1`).",
                    "rationale": "Setting `acks=all` (or `acks=-1`) means the producer will wait for all in-sync replicas to acknowledge the message. Combined with retries (which are enabled by default for idempotent producers), this ensures that a message is delivered at least once, even if a broker fails after receiving but before replicating.",
                    "isCorrect": true
                },
                {
                    "text": "Consumer `isolation.level=read_committed`.",
                    "rationale": "This consumer setting is used for 'exactly-once' semantics with transactional producers, ensuring only committed messages are read, not for 'at-least-once' producer guarantees.",
                    "isCorrect": false
                },
                {
                    "text": "Broker's `min.insync.replicas` setting.",
                    "rationale": "While `min.insync.replicas` (together with `acks=all`) helps ensure durability by defining the minimum number of in-sync replicas required for a write to be considered successful, `acks=all` is the direct producer configuration for ensuring 'at-least-once' delivery from the producer's perspective.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of an event sourcing architecture, why is Apache Kafka frequently chosen as the underlying event store?",
            "hint": "Consider the fundamental properties of Kafka's message storage model.",
            "answerOptions": [
                {
                    "text": "Its ability to perform complex SQL queries on historical event data.",
                    "rationale": "Kafka is not a SQL database; while stream processing engines (like Kafka Streams or Flink) can query streams, Kafka itself does not offer SQL querying on its raw log.",
                    "isCorrect": false
                },
                {
                    "text": "Its native support for ACID transactions across multiple topics.",
                    "rationale": "While Kafka introduced transactional producers for 'exactly-once' processing, its primary strength for event sourcing isn't multi-topic ACID transactions in the traditional database sense, but rather its append-only log.",
                    "isCorrect": false
                },
                {
                    "text": "Its append-only, immutable, and ordered log nature with high throughput and durability.",
                    "rationale": "Kafka's core design as a distributed, immutable, append-only commit log, combined with its high throughput, durability through replication, and strong ordering guarantees within partitions, perfectly aligns with the requirements of an event store in event sourcing.",
                    "isCorrect": true
                },
                {
                    "text": "Its built-in mechanisms for automatic data cleanup and compaction of all historical events.",
                    "rationale": "While Kafka offers log compaction and retention policies, its choice for event sourcing is primarily due to its log-like structure that preserves events, not because it 'cleans up' all historical events.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Where does Kafka primarily store the committed offsets for consumer groups by default?",
            "hint": "It's an internal Kafka mechanism that ensures consumer progress is durably stored.",
            "answerOptions": [
                {
                    "text": "In Apache ZooKeeper.",
                    "rationale": "While older versions of Kafka (0.8 and earlier) used ZooKeeper for offset storage, modern Kafka versions (0.9+) store offsets in an internal Kafka topic.",
                    "isCorrect": false
                },
                {
                    "text": "On the local file system of each consumer instance.",
                    "rationale": "Storing offsets locally would prevent consumer groups from sharing progress or rebalancing effectively, as consumer state would not be centralized.",
                    "isCorrect": false
                },
                {
                    "text": "In a special internal topic named `__consumer_offsets`.",
                    "rationale": "Kafka stores committed offsets for consumer groups in a highly replicated and fault-tolerant internal topic called `__consumer_offsets`. This allows for durable storage and easy recovery during consumer rebalances or failures.",
                    "isCorrect": true
                },
                {
                    "text": "In the memory of the Kafka brokers, resetting on restart.",
                    "rationale": "Storing offsets only in memory would mean losing consumer progress upon a broker restart or failure, making it unsuitable for durable tracking of consumer positions.",
                    "isCorrect": false
                }
            ]
        }
    ]
};