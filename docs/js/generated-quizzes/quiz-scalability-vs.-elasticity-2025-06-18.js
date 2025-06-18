const quizName = "Scalability vs. Elasticity Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which of the following best describes *elasticity* in a system design context?",
            "hint": "Consider the system's ability to react to fluctuating demand by adjusting resources.",
            "answerOptions": [
                {
                    "text": "The ability of a system to handle a steadily growing amount of work over time without performance degradation.",
                    "rationale": "This describes scalability, which focuses on handling increased workload capacity.",
                    "isCorrect": false
                },
                {
                    "text": "The ability of a system to gracefully degrade under extreme load conditions.",
                    "rationale": "This refers to resilience or graceful degradation, not elasticity.",
                    "isCorrect": false
                },
                {
                    "text": "The ability of a system to acquire and release resources automatically based on fluctuating demand.",
                    "rationale": "Elasticity specifically refers to the dynamic and automatic adjustment of resources (scaling up or down) in response to changes in workload.",
                    "isCorrect": true
                },
                {
                    "text": "The ability of a system to continue operating despite the failure of one or more components.",
                    "rationale": "This describes fault tolerance or high availability, which focuses on system uptime despite failures.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary characteristic of a *scalable* system?",
            "hint": "Think about how a system performs as its workload permanently increases.",
            "answerOptions": [
                {
                    "text": "It can recover quickly from failures and outages.",
                    "rationale": "This describes resilience or disaster recovery, not the core concept of scalability.",
                    "isCorrect": false
                },
                {
                    "text": "It can adapt quickly to unpredictable changes in demand by automatically adjusting resources.",
                    "rationale": "This describes elasticity, which is about dynamic resource allocation, rather than sustained growth.",
                    "isCorrect": false
                },
                {
                    "text": "It can handle an increasing amount of workload or users by adding resources, without degrading performance.",
                    "rationale": "Scalability is about a system's capacity to grow its workload-handling capability (either vertically or horizontally) without impacting performance.",
                    "isCorrect": true
                },
                {
                    "text": "It ensures data consistency across distributed components at all times.",
                    "rationale": "While important in distributed systems, this relates to data consistency models (e.g., ACID vs. BASE), not the fundamental definition of scalability.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A retail e-commerce platform experiences massive, unpredictable traffic surges during flash sales and holiday seasons. Which system design concept is *most crucial* for efficiently handling these specific demand patterns, minimizing wasted resources during off-peak times?",
            "hint": "Focus on the *unpredictable surges* and *resource optimization* (cost efficiency).",
            "answerOptions": [
                {
                    "text": "Scalability",
                    "rationale": "While scalability allows the system to handle more load, elasticity is specifically about the *efficiency* and *dynamism* needed for unpredictable peaks and troughs, preventing over-provisioning.",
                    "isCorrect": false
                },
                {
                    "text": "Elasticity",
                    "rationale": "Elasticity is designed precisely for dynamic and automated resource adjustment (scaling up and down) in response to fluctuating, unpredictable demand, optimizing resource utilization and cost.",
                    "isCorrect": true
                },
                {
                    "text": "High Availability",
                    "rationale": "High availability focuses on ensuring continuous uptime, but not directly on the efficient management of fluctuating workload demand.",
                    "isCorrect": false
                },
                {
                    "text": "Durability",
                    "rationale": "Durability relates to the long-term persistence and integrity of data, which is not the primary concern for handling fluctuating traffic efficiently.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A new SaaS application is experiencing steady, predictable user growth month-over-month. The team anticipates a 20% increase in daily active users every quarter for the next two years. Which design principle is *foremost* in ensuring the system can meet future demands without constant re-architecture?",
            "hint": "Consider *predictable growth* and *long-term capacity planning* for a sustained increase.",
            "answerOptions": [
                {
                    "text": "Elasticity",
                    "rationale": "While elasticity could be used, it's primarily for *unpredictable* fluctuations. For predictable, steady growth, the focus is on the system's inherent ability to handle increasing load, which is scalability.",
                    "isCorrect": false
                },
                {
                    "text": "Scalability",
                    "rationale": "Scalability is the core principle that ensures a system can grow its capacity to handle a progressively increasing and predictable workload over time without requiring fundamental design changes.",
                    "isCorrect": true
                },
                {
                    "text": "Observability",
                    "rationale": "Observability is crucial for monitoring and understanding system behavior, but it's not the design principle that dictates how the system handles growth itself.",
                    "isCorrect": false
                },
                {
                    "text": "Atomicity",
                    "rationale": "Atomicity is a property of database transactions, ensuring operations are treated as single, indivisible units, which is unrelated to handling long-term user growth.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Implementing an 'Auto Scaling Group' in a cloud environment that automatically adds or removes compute instances based on CPU utilization metrics is a direct application of which system design concept?",
            "hint": "Think about automation and dynamic adjustment of resources.",
            "answerOptions": [
                {
                    "text": "Scalability",
                    "rationale": "While auto-scaling contributes to achieving scalability, the act of *automatically adding/removing resources based on demand* is the definition of elasticity.",
                    "isCorrect": false
                },
                {
                    "text": "Elasticity",
                    "rationale": "Auto Scaling Groups are a prime example of implementing elasticity, as they allow systems to dynamically expand or contract their resource footprint to match the current workload, optimizing cost and performance.",
                    "isCorrect": true
                },
                {
                    "text": "Fault Tolerance",
                    "rationale": "While auto-scaling can contribute to fault tolerance (by replacing failed instances), its primary function in this context is managing workload fluctuations, which is elasticity.",
                    "isCorrect": false
                },
                {
                    "text": "Load Balancing",
                    "rationale": "Load balancing distributes traffic across instances, and often works *with* auto-scaling, but it is not the concept being implemented by the auto-scaling group itself.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which statement accurately describes the relationship between Scalability and Elasticity?",
            "hint": "Consider if one is a specific way to achieve the other, or if they are entirely separate concerns.",
            "answerOptions": [
                {
                    "text": "Scalability is a subset of Elasticity; all elastic systems are inherently scalable.",
                    "rationale": "This is incorrect. Elasticity is a *type* or *mechanism* of scalability, specifically automated and dynamic scaling. Not all scalable systems are elastic (e.g., a vertically scaled system might be highly scalable but not elastic).",
                    "isCorrect": false
                },
                {
                    "text": "Elasticity is a subset of Scalability; it refers specifically to automated, dynamic scaling.",
                    "rationale": "This is the most accurate description. Scalability is the broader concept of handling increased load. Elasticity is a specific, modern approach to achieving scalability by dynamically adjusting resources (usually horizontally) to match demand, often in cloud environments.",
                    "isCorrect": true
                },
                {
                    "text": "Scalability and Elasticity are two completely independent concepts with no overlap.",
                    "rationale": "This is incorrect. They are closely related; elasticity is a sophisticated means to achieve efficient scalability, particularly for variable workloads.",
                    "isCorrect": false
                },
                {
                    "text": "Scalability primarily concerns vertical scaling, while Elasticity primarily concerns horizontal scaling.",
                    "rationale": "This is partially incorrect. Scalability can be achieved through both vertical and horizontal scaling. While elasticity *primarily* relies on horizontal scaling (adding/removing instances), the core distinction is the *dynamic, automated adjustment* to demand, not just the scaling direction itself.",
                    "isCorrect": false
                }
            ]
        }
    ]
};