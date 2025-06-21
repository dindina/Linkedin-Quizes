const quizName = "Serverless Architecture Trade-offs Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is a primary performance trade-off of serverless functions, especially for applications requiring very low latency for initial user interactions?",
            "hint": "Consider the time it takes for an inactive serverless function to become active and process a request.",
            "answerOptions": [
                {
                    "text": "Reduced operational overhead, speeding up deployment.",
                    "rationale": "While reduced operational overhead is a benefit of serverless, it's not a direct performance trade-off related to latency for individual requests.",
                    "isCorrect": false
                },
                {
                    "text": "Increased vendor lock-in, which complicates performance tuning.",
                    "rationale": "Vendor lock-in is a trade-off, but it's not the primary performance trade-off specifically related to initial latency.",
                    "isCorrect": false
                },
                {
                    "text": "Cold starts, leading to increased initial invocation latency.",
                    "rationale": "Cold starts occur when a function needs to be initialized (container spun up, code loaded) after a period of inactivity, directly causing higher latency for the first request.",
                    "isCorrect": true
                },
                {
                    "text": "Unlimited execution duration, making long-running tasks less efficient.",
                    "rationale": "Serverless functions typically have execution duration limits, not unlimited duration, and this option describes a constraint rather than an initial latency issue.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A company is considering migrating a constantly running backend service with predictable, high utilization to a serverless architecture. What is a potential cost-related trade-off they should carefully analyze compared to a traditional provisioned server?",
            "hint": "Think about the billing model for serverless versus fixed capacity.",
            "answerOptions": [
                {
                    "text": "Predictable fixed monthly costs, regardless of usage.",
                    "rationale": "Serverless costs are usage-based and highly variable, not fixed.",
                    "isCorrect": false
                },
                {
                    "text": "Higher costs for idle time, even when the service is not in use.",
                    "rationale": "Serverless architectures generally charge zero for idle time, which is a significant cost benefit, not a trade-off.",
                    "isCorrect": false
                },
                {
                    "text": "Potentially higher total costs for very high, sustained loads compared to an optimally provisioned, traditional server.",
                    "rationale": "While serverless excels at variable loads, for extremely high and consistently sustained loads, provisioning and optimizing a traditional server can sometimes be more cost-effective per unit of work.",
                    "isCorrect": true
                },
                {
                    "text": "Elimination of all infrastructure costs.",
                    "rationale": "Serverless shifts operational costs from direct infrastructure management to a pay-per-use model, but 'infrastructure costs' in the form of execution fees still exist.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "One common criticism and a key trade-off of adopting a heavily serverless architecture is 'vendor lock-in'. Which of the following best describes this trade-off?",
            "hint": "Consider the unique features and APIs offered by specific cloud providers.",
            "answerOptions": [
                {
                    "text": "Difficulty in integrating with third-party APIs and services.",
                    "rationale": "Serverless functions are generally good at integrating with various APIs, so this is not the primary meaning of vendor lock-in.",
                    "isCorrect": false
                },
                {
                    "text": "Reliance on a specific cloud provider's proprietary services, APIs, and tooling, making migration to another cloud challenging.",
                    "rationale": "Serverless platforms often involve using cloud-specific services, APIs, and development models (e.g., AWS Lambda, Azure Functions, Google Cloud Functions), which can make migrating a complex serverless application to a different cloud provider difficult.",
                    "isCorrect": true
                },
                {
                    "text": "Inability to use popular open-source frameworks or libraries within serverless functions.",
                    "rationale": "Most serverless platforms support a wide range of languages and allow the use of common open-source libraries and frameworks.",
                    "isCorrect": false
                },
                {
                    "text": "Increased overall project cost due to the use of proprietary cloud technology.",
                    "rationale": "While cost can be a factor, 'reliance on specific proprietary services' is the core definition of vendor lock-in, rather than just increased cost.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "While serverless significantly reduces infrastructure management burden, what is a common operational trade-off related to monitoring and debugging serverless applications?",
            "hint": "Think about the distributed and ephemeral nature of serverless functions.",
            "answerOptions": [
                {
                    "text": "Reduced need for logging and tracing, simplifying operations.",
                    "rationale": "The opposite is true; robust logging and tracing become even more critical due to the distributed and ephemeral nature.",
                    "isCorrect": false
                },
                {
                    "text": "Simplified debugging due to direct access to the underlying server's file system and processes.",
                    "rationale": "Serverless abstracts away the underlying server, meaning you don't have direct access to the file system or processes for debugging.",
                    "isCorrect": false
                },
                {
                    "text": "Increased complexity in monitoring, logging, and debugging distributed, ephemeral functions across multiple services.",
                    "rationale": "Debugging distributed systems with many small, ephemeral functions (each with its own logs) can be more complex than debugging a monolithic application on a single server, requiring sophisticated tracing and aggregation tools.",
                    "isCorrect": true
                },
                {
                    "text": "The ability to perform in-place upgrades and rollbacks directly on the function's runtime.",
                    "rationale": "While rollbacks are often supported, 'in-place upgrades' in the traditional sense don't apply; the environment is managed by the provider.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Serverless functions typically operate within predefined resource constraints (e.g., maximum memory, CPU, execution duration). What is a key architectural trade-off associated with these limitations?",
            "hint": "Consider the types of workloads that might not be suitable for serverless.",
            "answerOptions": [
                {
                    "text": "Unrestricted access to CPU and memory, making them ideal for all types of workloads.",
                    "rationale": "This is incorrect; serverless functions have defined limits, making them unsuitable for certain workloads.",
                    "isCorrect": false
                },
                {
                    "text": "Guaranteed minimal latency for high-throughput, real-time video processing.",
                    "rationale": "While latency can be low, the resource and duration limits might make them impractical or inefficient for very high-throughput, long-running, or extremely resource-intensive tasks like real-time video processing.",
                    "isCorrect": false
                },
                {
                    "text": "Limitations on execution duration and available memory, potentially restricting suitability for complex, long-running batch processes or large data transformations.",
                    "rationale": "Serverless functions are designed for short, event-driven tasks. Their limits on execution time and memory make them less ideal for computationally intensive or long-duration jobs that might be better suited for containerized or VM-based solutions.",
                    "isCorrect": true
                },
                {
                    "text": "The need for persistent local storage, which increases application complexity.",
                    "rationale": "Serverless functions are generally stateless and do not offer persistent local storage across invocations, which is a different trade-off (state management) than resource limits.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Serverless functions are inherently stateless, meaning they do not retain state between invocations. What is the primary architectural trade-off that arises from this characteristic for applications requiring persistent data?",
            "hint": "How do serverless functions typically manage data that needs to survive across multiple executions or for multiple users?",
            "answerOptions": [
                {
                    "text": "Simplified data persistence without the need for external databases or storage.",
                    "rationale": "The opposite is true; their stateless nature mandates external persistence.",
                    "isCorrect": false
                },
                {
                    "text": "Automatic state synchronization across all function instances, reducing design complexity.",
                    "rationale": "They are stateless; state is not automatically synchronized. This is a common misconception.",
                    "isCorrect": false
                },
                {
                    "text": "The necessity of externalizing all state management to services like databases, object storage, or caching layers, adding architectural complexity.",
                    "rationale": "Since functions don't retain state, any data that needs to persist or be shared across invocations must be stored in an external, dedicated state management service, which adds architectural components and complexity.",
                    "isCorrect": true
                },
                {
                    "text": "Higher internal memory utilization due to the retention of user session data within the function.",
                    "rationale": "Functions are stateless and typically discard memory contents between invocations, so they don't retain session data internally.",
                    "isCorrect": false
                }
            ]
        }
    ]
};