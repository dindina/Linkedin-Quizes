const quizName = "Fault Tolerance Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which of the following best describes the primary goal of implementing fault tolerance in a system?",
            "hint": "Think about what happens when a critical component fails.",
            "answerOptions": [
                {
                    "text": "To optimize system performance under heavy load.",
                    "rationale": "While a resilient system might perform better under stress, performance optimization is not the primary goal of fault tolerance. Its main focus is continuous operation.",
                    "isCorrect": false
                },
                {
                    "text": "To ensure the system continues operating correctly despite the failure of some of its components.",
                    "rationale": "This is the core definition of fault tolerance: the ability of a system to continue performing its intended function without interruption despite component failures.",
                    "isCorrect": true
                },
                {
                    "text": "To reduce the total cost of ownership (TCO) of the system.",
                    "rationale": "Implementing fault tolerance often involves redundancy and more complex designs, which typically increase, rather than decrease, the TCO.",
                    "isCorrect": false
                },
                {
                    "text": "To prevent any security vulnerabilities from being exploited.",
                    "rationale": "Security is a critical aspect of system design, but it's a distinct discipline from fault tolerance, which primarily deals with operational continuity in the face of failures, not malicious attacks.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In an active-passive failover setup for a database, what is the state of the passive node during normal operation?",
            "hint": "Consider how quickly the passive node needs to take over if the active node fails.",
            "answerOptions": [
                {
                    "text": "It actively processes a subset of incoming write requests alongside the active node.",
                    "rationale": "This describes an active-active setup, where both nodes serve traffic. In active-passive, only the active node handles client requests.",
                    "isCorrect": false
                },
                {
                    "text": "It is powered off to save energy and only booted upon primary failure.",
                    "rationale": "While possible in some low-availability scenarios (cold standby), a typical active-passive setup (hot or warm standby) keeps the passive node running and ready for faster failover.",
                    "isCorrect": false
                },
                {
                    "text": "It continuously receives replicated data from the active node but does not process client requests.",
                    "rationale": "In a hot standby active-passive configuration, the passive node stays synchronized by receiving replicated data but remains idle until it needs to take over, ensuring minimal data loss and quick failover.",
                    "isCorrect": true
                },
                {
                    "text": "It acts as a load balancer, distributing requests between multiple active nodes.",
                    "rationale": "A load balancer distributes requests to active servers. A passive node is a standby server, not a request distributor.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A microservice encounters frequent timeouts when calling an external third-party API. Which fault tolerance pattern is most appropriate to prevent these failures from cascading and degrading the entire system?",
            "hint": "Think about a mechanism that stops repeated calls to a failing service to allow it to recover.",
            "answerOptions": [
                {
                    "text": "Exponential Backoff Retry",
                    "rationale": "While useful for transient errors, continuous retries with exponential backoff can still exhaust resources and worsen the problem if the external API is truly down or severely degraded, rather than preventing cascading failures.",
                    "isCorrect": false
                },
                {
                    "text": "Bulkhead Pattern",
                    "rationale": "The Bulkhead pattern isolates resources (e.g., thread pools) to prevent one failing service from consuming all resources. It doesn't, however, stop calls to the failing service itself like a circuit breaker does.",
                    "isCorrect": false
                },
                {
                    "text": "Circuit Breaker",
                    "rationale": "The Circuit Breaker pattern is designed to prevent an application from repeatedly invoking a failing service, thereby preventing cascading failures. It 'opens the circuit' to the problematic service, allowing it to recover and preserving the calling service's resources.",
                    "isCorrect": true
                },
                {
                    "text": "Leader Election",
                    "rationale": "Leader election is a mechanism for selecting a single coordinator or leader in a distributed system, primarily for high availability and distributed consensus, not for handling external API call failures.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a fault-tolerant distributed database, using asynchronous replication typically prioritizes which aspect, potentially at the expense of another?",
            "hint": "Consider the trade-offs between how quickly a write operation completes and how consistent all copies of data are at any given moment.",
            "answerOptions": [
                {
                    "text": "Strong Consistency over Availability.",
                    "rationale": "Asynchronous replication sacrifices strong consistency (data might be temporarily inconsistent across nodes) to gain higher availability and better write performance. Strong consistency is typically achieved with synchronous replication.",
                    "isCorrect": false
                },
                {
                    "text": "Immediate Durability over Read Performance.",
                    "rationale": "Asynchronous replication means immediate durability is only guaranteed on the primary node, not all replicas. It generally improves write performance rather than read performance directly.",
                    "isCorrect": false
                },
                {
                    "text": "Availability and Write Performance over Strong Consistency.",
                    "rationale": "With asynchronous replication, a write operation completes as soon as it's committed to the primary node, without waiting for all replicas. This improves write performance and availability (as the system can continue even if some replicas are temporarily unreachable), at the cost of eventual consistency.",
                    "isCorrect": true
                },
                {
                    "text": "Data Locality over Global Accessibility.",
                    "rationale": "Data locality and global accessibility are concerns related to data partitioning and distribution, not the primary trade-offs introduced by asynchronous replication compared to synchronous replication.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "While both contribute to system resilience, how does Disaster Recovery (DR) primarily differ from typical Fault Tolerance (FT) mechanisms?",
            "hint": "Consider the scale and type of failure each is designed to handle.",
            "answerOptions": [
                {
                    "text": "FT focuses on preventing data loss, while DR focuses on data recovery.",
                    "rationale": "Both aim to prevent data loss. FT keeps the system running to avoid loss, while DR aims to restore services and data after a catastrophic event, including data recovery.",
                    "isCorrect": false
                },
                {
                    "text": "FT handles component failures within a single system/datacenter, whereas DR addresses large-scale outages like regional disasters.",
                    "rationale": "This is the key distinction. Fault tolerance mechanisms (e.g., redundant power supplies, RAID, active-passive failover) typically handle failures within a single operational site or system. Disaster Recovery planning accounts for much larger, often site-wide or regional, catastrophic events.",
                    "isCorrect": true
                },
                {
                    "text": "FT is a proactive measure, while DR is a reactive measure.",
                    "rationale": "Both have proactive elements (designing for FT, planning for DR) and reactive elements (failover for FT, execution of DR plan). The distinction isn't primarily about proactivity vs. reactivity.",
                    "isCorrect": false
                },
                {
                    "text": "FT ensures system uptime, while DR ensures system performance.",
                    "rationale": "Both FT and DR aim to ensure system uptime. Neither's primary focus is performance, although performance recovery is part of a complete DR plan.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A video streaming service experiences a sudden surge in traffic, causing its recommendation engine to become overloaded and slow. To maintain core service availability, the system is designed to temporarily disable recommendations and serve only popular videos. This strategy is an example of what fault tolerance principle?",
            "hint": "The system is not completely broken, but it's operating with reduced functionality to survive.",
            "answerOptions": [
                {
                    "text": "Circuit Breaking",
                    "rationale": "Circuit breaking would stop all calls to the recommendation engine if it's failing to prevent cascading issues. This scenario describes intentionally reducing functionality.",
                    "isCorrect": false
                },
                {
                    "text": "Redundancy",
                    "rationale": "Redundancy involves having duplicate components. While it contributes to overall fault tolerance, this specific action of selectively reducing features is not an example of redundancy itself.",
                    "isCorrect": false
                },
                {
                    "text": "Graceful Degradation",
                    "rationale": "Graceful degradation (or degraded mode) is a design principle where a system maintains partial functionality when some components fail or are under extreme load, rather than failing completely. The system sacrifices less critical features to preserve core functionality.",
                    "isCorrect": true
                },
                {
                    "text": "Rollback",
                    "rationale": "Rollback is reverting a system to a previous stable state, typically after a faulty deployment or configuration change. It's not about operating with reduced features during an overload event.",
                    "isCorrect": false
                }
            ]
        }
    ]
};