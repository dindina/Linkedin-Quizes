const quizName = "Resilient Applications Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary characteristic that differentiates a resilient application from a merely fault-tolerant one in modern distributed systems?",
            "hint": "Consider how an application behaves when a dependency is experiencing issues, not just a complete outage.",
            "answerOptions": [
                {
                    "text": "It guarantees 100% uptime regardless of external failures.",
                    "rationale": "No application can guarantee 100% uptime. Resilience is about graceful degradation and recovery, not absolute prevention of all failures.",
                    "isCorrect": false
                },
                {
                    "text": "It can recover automatically from partial failures and degrade gracefully.",
                    "rationale": "Resilience specifically focuses on the system's ability to recover from, adapt to, and continue functioning despite failures, often by degrading gracefully rather than collapsing entirely.",
                    "isCorrect": true
                },
                {
                    "text": "It relies solely on redundant hardware to prevent failures.",
                    "rationale": "While hardware redundancy contributes to fault tolerance, resilience extends to how software handles failures (e.g., transient network issues, slow dependencies, service outages), often without needing new hardware.",
                    "isCorrect": false
                },
                {
                    "text": "It logs all errors meticulously for manual intervention.",
                    "rationale": "Logging is crucial for debugging and monitoring, but it doesn't, by itself, make an application resilient. Resilience is about automated recovery and continuous operation.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a microservices architecture, a `Circuit Breaker` pattern is primarily used to:",
            "hint": "Think about what happens when a service repeatedly fails and how to prevent cascading failures.",
            "answerOptions": [
                {
                    "text": "Distribute incoming requests evenly across multiple service instances.",
                    "rationale": "This describes load balancing, not the Circuit Breaker pattern.",
                    "isCorrect": false
                },
                {
                    "text": "Prevent an application from repeatedly invoking a failing service, allowing it to recover.",
                    "rationale": "The Circuit Breaker pattern stops requests from going to a failing service for a period, preventing the caller from wasting resources and giving the failing service time to recover, thus preventing cascading failures.",
                    "isCorrect": true
                },
                {
                    "text": "Cache frequently accessed data to reduce latency.",
                    "rationale": "This describes a caching mechanism, which is distinct from a Circuit Breaker.",
                    "isCorrect": false
                },
                {
                    "text": "Ensure data consistency across distributed transactions.",
                    "rationale": "This relates to distributed transaction management or eventual consistency models, not the Circuit Breaker pattern.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A `Bulkhead` pattern is effective in improving application resilience by:",
            "hint": "Imagine dividing a ship's hull into compartments. What does that prevent?",
            "answerOptions": [
                {
                    "text": "Isolating failures within one part of the system so they don0t affect others.",
                    "rationale": "Similar to compartments in a ship, the Bulkhead pattern segregates resources (e.g., thread pools, connection pools) based on caller or service, preventing a failure or resource exhaustion in one area from consuming all resources and affecting the entire system.",
                    "isCorrect": true
                },
                {
                    "text": "Automatically retrying failed operations a fixed number of times.",
                    "rationale": "This describes the Retry pattern, not the Bulkhead pattern.",
                    "isCorrect": false
                },
                {
                    "text": "Limiting the rate at which a client can call a service.",
                    "rationale": "This describes Rate Limiting, which protects services from overload but isn't the primary function of a Bulkhead.",
                    "isCorrect": false
                },
                {
                    "text": "Prioritizing critical requests over less important ones.",
                    "rationale": "While resource isolation can be used to prioritize, the core concept of Bulkhead is about containment of failures, not dynamic prioritization.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing for resilience, why is it crucial to use a `Timeout` mechanism *in conjunction with* a `Retry` mechanism for external service calls?",
            "hint": "What if a service is slow but not completely down?",
            "answerOptions": [
                {
                    "text": "To ensure that retries are always executed immediately without delay.",
                    "rationale": "Retries often use exponential backoff, which introduces delays. The combination is not for immediate execution.",
                    "isCorrect": false
                },
                {
                    "text": "To prevent the application from waiting indefinitely for a slow service and consuming resources unnecessarily.",
                    "rationale": "Timeouts prevent requests from hanging indefinitely, freeing up resources. Retries handle transient failures. Together, they ensure that temporary issues are handled efficiently without prolonged resource consumption.",
                    "isCorrect": true
                },
                {
                    "text": "To automatically escalate every failed retry attempt to an administrator.",
                    "rationale": "While escalation might be a consequence of repeated failures, it's not the primary reason for combining these two patterns.",
                    "isCorrect": false
                },
                {
                    "text": "To guarantee eventual consistency across all distributed data stores.",
                    "rationale": "This concerns data consistency models in distributed systems, unrelated to the interplay of Timeouts and Retries for service calls.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary goal of practicing `Chaos Engineering` in a system?",
            "hint": "It's not about making things fail for the sake of it, but understanding the system's limits.",
            "answerOptions": [
                {
                    "text": "To prevent all possible failures from occurring in production.",
                    "rationale": "It's impossible to prevent all failures. Chaos Engineering is about understanding how the system behaves when failures do occur.",
                    "isCorrect": false
                },
                {
                    "text": "To proactively discover weaknesses and vulnerabilities in the system's resilience before they cause major outages.",
                    "rationale": "Chaos Engineering involves intentionally injecting faults into a system in a controlled manner to identify how it responds and uncover hidden weaknesses that might lead to outages in a real-world scenario.",
                    "isCorrect": true
                },
                {
                    "text": "To improve the performance and speed of critical application features.",
                    "rationale": "While related, Chaos Engineering focuses on resilience and reliability, not directly on performance optimization.",
                    "isCorrect": false
                },
                {
                    "text": "To simplify the deployment process for new software versions.",
                    "rationale": "Chaos Engineering is a testing methodology, not a deployment process improvement.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In the context of resilient message processing or API calls, why is `Idempotency` a critical property?",
            "hint": "What happens if a message is delivered or an API call is made multiple times due to retries or network issues?",
            "answerOptions": [
                {
                    "text": "It ensures that a request, even if processed multiple times, produces the same result and side effects as if processed only once.",
                    "rationale": "Idempotency is crucial in distributed systems where messages or requests might be duplicated due to retries, network glitches, or server failures. An idempotent operation can be safely executed multiple times without causing unintended side effects (e.g., double-charging a customer).",
                    "isCorrect": true
                },
                {
                    "text": "It encrypts all message payloads to prevent unauthorized access.",
                    "rationale": "This describes encryption and security, which is unrelated to idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "It guarantees the order of message delivery in a distributed queue.",
                    "rationale": "Message ordering is a separate concern in messaging systems and is not directly related to idempotency.",
                    "isCorrect": false
                },
                {
                    "text": "It automatically scales the processing capacity based on message volume.",
                    "rationale": "This describes auto-scaling, which is a different aspect of system design.",
                    "isCorrect": false
                }
            ]
        }
    ]
};