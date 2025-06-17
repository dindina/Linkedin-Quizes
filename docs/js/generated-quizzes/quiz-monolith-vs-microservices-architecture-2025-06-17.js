const quizName = "Monolith vs Microservices Architecture Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "A new startup is developing an MVP (Minimum Viable Product) for its first core product. They have a small development team and prioritize speed of initial development and deployment to validate market fit quickly. Which architectural style is generally more suitable for this initial phase?",
            "hint": "Consider the overhead of setting up infrastructure, managing deployments, and coordinating a small team in the early stages of a project with uncertain future scope.",
            "answerOptions": [
                {
                    "text": "Microservices: Offers high scalability and technology diversity from the outset.",
                    "rationale": "While microservices offer these benefits at scale, they introduce significant complexity and overhead in early development for a small team, potentially slowing down MVP delivery and market validation.",
                    "isCorrect": false
                },
                {
                    "text": "Monolithic: Provides a simpler development, testing, and deployment pipeline for rapid iteration.",
                    "rationale": "Correct. Monoliths are often preferred for MVPs due to lower initial overhead, simpler codebase management, and faster development cycles for small teams aiming to quickly validate a product idea.",
                    "isCorrect": true
                },
                {
                    "text": "Distributed Event-Driven: Enables asynchronous communication and high throughput for future growth.",
                    "rationale": "This is a pattern often used within or between services (including microservices) but is not the primary architectural choice (monolith vs microservices) for initial MVP and adds significant complexity upfront.",
                    "isCorrect": false
                },
                {
                    "text": "Service-Oriented Architecture (SOA): Promotes reusability and loose coupling across large enterprises.",
                    "rationale": "SOA is a broader concept from which microservices evolved, but for an MVP, its focus on extensive service definition and integration layers can be an overkill, similar to microservices in terms of initial complexity.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A large enterprise is considering migrating a legacy monolithic application to a microservices architecture. What is one of the *primary operational trade-offs* they must prepare for during and after this transition?",
            "hint": "Consider the implications of moving from a single deployable unit to many independent, interacting units in terms of infrastructure, networking, and observability.",
            "answerOptions": [
                {
                    "text": "Significantly reduced operational overhead due to smaller, isolated deployments.",
                    "rationale": "Incorrect. While individual service deployments might be simpler, the *overall* operational overhead of managing *many* services, their interactions, and underlying infrastructure is significantly higher.",
                    "isCorrect": false
                },
                {
                    "text": "Simplified end-to-end debugging and tracing across the distributed system.",
                    "rationale": "Incorrect. Debugging and tracing become much more complex in a distributed microservices environment compared to a single monolithic application, requiring specialized tools and techniques (e.g., distributed tracing).",
                    "isCorrect": false
                },
                {
                    "text": "Increased complexity in deployment, monitoring, logging, and inter-service communication management.",
                    "rationale": "Correct. This is a major trade-off. Managing multiple deployment pipelines, distributed logging, consolidated monitoring, and robust inter-service communication mechanisms (like API gateways, service mesh) adds substantial operational complexity.",
                    "isCorrect": true
                },
                {
                    "text": "Elimination of the need for robust CI/CD pipelines as services are independent.",
                    "rationale": "Incorrect. Microservices *demand* robust CI/CD pipelines to manage the frequent and independent deployments of many services efficiently and reliably.",
                    "isCorrect": false
                }
            ]
        }
    ]
};