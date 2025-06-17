const quizName = "Load balancers Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "In a system where requests to backend servers can vary significantly in processing time, which load balancing algorithm is generally most effective for optimizing server utilization and preventing bottlenecks?",
            "hint": "Consider how different algorithms account for current server load or the dynamic nature of request characteristics.",
            "answerOptions": [
                {
                    "text": "Round Robin",
                    "rationale": "Round Robin distributes requests sequentially without considering the current load or processing time on servers. If requests vary in processing time, some servers might become overloaded while others are idle.",
                    "isCorrect": false
                },
                {
                    "text": "Least Connections",
                    "rationale": "Least Connections directs new requests to the server with the fewest active connections. This dynamically distributes load based on real-time server activity, making it highly effective for environments where request processing times vary.",
                    "isCorrect": true
                },
                {
                    "text": "IP Hash",
                    "rationale": "IP Hash routes requests from the same IP address to the same server, primarily used for session persistence. It does not account for varying processing times or current server load, which can lead to uneven distribution if one IP sends many long-running requests.",
                    "isCorrect": false
                },
                {
                    "text": "Weighted Round Robin",
                    "rationale": "Weighted Round Robin assigns more requests to servers with higher weights (representing higher capacity), but it is still a static distribution method. It does not dynamically react to actual server load or varying request processing times in real-time.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is a significant drawback of implementing 'sticky sessions' (session persistence) on a load balancer?",
            "hint": "Think about the primary goal of a load balancer versus the effect of sticky sessions on server resource distribution.",
            "answerOptions": [
                {
                    "text": "Increased network latency for client requests.",
                    "rationale": "Sticky sessions generally do not increase network latency. In fact, by keeping a client on the same server, it might avoid re-initialization overheads, potentially reducing perceived latency for subsequent requests in a session.",
                    "isCorrect": false
                },
                {
                    "text": "It makes the load balancer more complex to configure.",
                    "rationale": "While it adds a configuration step, the primary disadvantage of sticky sessions is not the configuration complexity itself, but its operational impact on load distribution.",
                    "isCorrect": false
                },
                {
                    "text": "Potential for uneven load distribution across backend servers.",
                    "rationale": "If a specific backend server hosts many 'sticky' clients, especially those with high activity, that server can become disproportionately overloaded while other servers remain underutilized. This undermines the fundamental goal of a load balancer to evenly distribute traffic.",
                    "isCorrect": true
                },
                {
                    "text": "Incompatibility with modern protocols like HTTP/2.",
                    "rationale": "Sticky sessions are a layer 4/7 concept and are fully compatible with modern protocols including HTTP/2. There is no inherent incompatibility.",
                    "isCorrect": false
                }
            ]
        }
    ]
};