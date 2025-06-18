const quizName = "Deployment Strategies Quiz";
const quizData = {
    "questions": [
        {
            "question": "Which deployment strategy involves maintaining two identical production environments, only one of which is active at any given time, to facilitate instant rollback and minimal downtime?",
            "hint": "Think about colors representing distinct, parallel environments.",
            "answerOptions": [
                {
                    "text": "Rolling Deployment",
                    "rationale": "Rolling deployment updates instances one by one, which offers gradual rollout and rollback, but not instant switching between two full environments.",
                    "isCorrect": false
                },
                {
                    "text": "Canary Deployment",
                    "rationale": "Canary deployment routes a small percentage of traffic to the new version, but it doesn't involve having two full, active-ready environments to switch between instantly.",
                    "isCorrect": false
                },
                {
                    "text": "Blue/Green Deployment",
                    "rationale": "Blue/Green deployment maintains two identical environments (Blue for current, Green for new). Traffic is switched instantly from Blue to Green (or vice versa), allowing for rapid rollback by simply switching traffic back to the old environment.",
                    "isCorrect": true
                },
                {
                    "text": "A/B Testing",
                    "rationale": "A/B testing is a technique for comparing two versions of a product or feature to determine which performs better, often used with deployment strategies but not a deployment strategy itself in this context.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A new feature needs to be rolled out to a small percentage of users first to gather feedback and monitor performance before a full-scale deployment. Which deployment strategy is best suited for this scenario?",
            "hint": "Consider a strategy that gradually exposes changes to a subset of users, like sending a 'canary' into a mine.",
            "answerOptions": [
                {
                    "text": "Blue/Green Deployment",
                    "rationale": "Blue/Green deployments switch all traffic at once, which doesn't allow for gradual exposure to a small percentage of users.",
                    "isCorrect": false
                },
                {
                    "text": "Canary Deployment",
                    "rationale": "Canary deployment is specifically designed to release changes to a small, controlled group of users first. This allows for real-world testing, performance monitoring, and early detection of issues before rolling out to the entire user base.",
                    "isCorrect": true
                },
                {
                    "text": "Rolling Deployment",
                    "rationale": "Rolling deployment replaces instances gradually, but typically aims for full replacement across all instances rather than targeting a specific percentage of users for initial testing.",
                    "isCorrect": false
                },
                {
                    "text": "Big Bang Deployment",
                    "rationale": "Big Bang deployment releases changes to all users simultaneously, which is high risk and does not allow for phased testing or feedback collection from a small group.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In a deployment scenario where a new version of an application is gradually deployed by replacing instances of the old version one by one, allowing traffic to be slowly shifted to the new instances, what strategy is being used?",
            "hint": "The deployment 'rolls' through the existing infrastructure.",
            "answerOptions": [
                {
                    "text": "Blue/Green Deployment",
                    "rationale": "Blue/Green involves switching between two complete environments, not replacing instances one by one.",
                    "isCorrect": false
                },
                {
                    "text": "Canary Deployment",
                    "rationale": "Canary deployment routes a small percentage of traffic to new instances, but the core mechanism described (replacing instances one by one) is not its defining characteristic.",
                    "isCorrect": false
                },
                {
                    "text": "Rolling Deployment",
                    "rationale": "Rolling deployment works by incrementally updating a subset of instances at a time. Once the new instances are healthy, the old instances are removed, continuing until all instances are updated. This minimizes downtime and distributes risk.",
                    "isCorrect": true
                },
                {
                    "text": "Shadow Deployment",
                    "rationale": "Shadow deployment sends production traffic to a new version alongside the old, but the new version doesn't serve real users. It's for testing, not replacing instances to serve live traffic.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following deployment strategies typically requires the most infrastructure resources (e.g., servers, VMs) to operate, due to the need for duplicate environments?",
            "hint": "Consider which strategy duplicates the entire production setup.",
            "answerOptions": [
                {
                    "text": "Rolling Deployment",
                    "rationale": "Rolling deployments do not require significantly more infrastructure as they replace old instances with new ones in place, often leveraging existing capacity.",
                    "isCorrect": false
                },
                {
                    "text": "Canary Deployment",
                    "rationale": "Canary deployments might require a small number of additional instances for the canary group, but not a full duplicate of the entire production environment.",
                    "isCorrect": false
                },
                {
                    "text": "Blue/Green Deployment",
                    "rationale": "Blue/Green deployment requires maintaining two complete, identical production environments (Blue and Green), one active and one standby. This necessitates roughly double the infrastructure resources compared to a single production environment.",
                    "isCorrect": true
                },
                {
                    "text": "In-place Upgrade",
                    "rationale": "In-place upgrades modify existing instances directly, requiring minimal additional infrastructure.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When the absolute highest priority is the ability to instantly revert to a previous stable version with minimal impact in case of a critical bug, which deployment strategy offers the most straightforward and fastest rollback mechanism?",
            "hint": "Which strategy keeps the 'old' version fully operational and ready?",
            "answerOptions": [
                {
                    "text": "Rolling Deployment",
                    "rationale": "Rolling deployment rollback can be complex as it involves reversing the partial updates, potentially requiring a new rollout of the previous version.",
                    "isCorrect": false
                },
                {
                    "text": "Canary Deployment",
                    "rationale": "Canary deployment allows for quick rollback for the canary group, but if the issue is discovered after a wider rollout, the rollback mechanism isn't as instantaneous or simple as switching entire environments.",
                    "isCorrect": false
                },
                {
                    "text": "Blue/Green Deployment",
                    "rationale": "Blue/Green deployment provides the fastest and most straightforward rollback. If issues arise with the 'Green' (new) environment, traffic can be instantly switched back to the 'Blue' (old, stable) environment, which remains fully operational.",
                    "isCorrect": true
                },
                {
                    "text": "Feature Flag Release",
                    "rationale": "Feature flags help mitigate risk by disabling features, but they are not a full deployment rollback strategy for the underlying application code/infrastructure.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "While not a deployment strategy itself, how do feature flags (or toggles) significantly complement modern deployment strategies?",
            "hint": "Think about separating the act of putting code into production from making it visible to users.",
            "answerOptions": [
                {
                    "text": "They eliminate the need for any other deployment strategy.",
                    "rationale": "Feature flags complement, rather than replace, deployment strategies. They control feature visibility, while deployment strategies manage the actual code rollout.",
                    "isCorrect": false
                },
                {
                    "text": "They enable A/B testing after a full production deployment.",
                    "rationale": "While feature flags can enable A/B testing, their primary complementary role to deployment strategies is broader than just post-deployment A/B testing.",
                    "isCorrect": false
                },
                {
                    "text": "They allow features to be deployed to production but kept hidden or enabled for specific user segments, decoupling deployment from release.",
                    "rationale": "This is the core benefit. Feature flags allow new code to be deployed to production (using any strategy) without immediately exposing the new features to all users. This decouples the 'deployment' (getting code to production) from the 'release' (making features available), enabling progressive rollouts, A/B testing, and instant kill switches.",
                    "isCorrect": true
                },
                {
                    "text": "They only apply to front-end deployments and not backend services.",
                    "rationale": "Feature flags are applicable to both front-end and backend services, allowing control over feature behavior across the entire stack.",
                    "isCorrect": false
                }
            ]
        }
    ]
};