const quizName = "Load balancers Quiz - 2025-06-17";
const quizData = {
    "questions": [
        {
            "question": "In a system design where user sessions must be maintained on the same backend server to preserve state (session stickiness), which load balancing algorithm is most appropriate?",
            "hint": "Consider algorithms that ensure subsequent requests from the same client are directed to the same server.",
            "answerOptions": [
                {
                    "text": "Round Robin",
                    "rationale": "Round Robin distributes incoming requests sequentially to each server in the group, without any regard for session stickiness.",
                    "isCorrect": false
                },
                {
                    "text": "Least Connections",
                    "rationale": "Least Connections directs new connections to the server with the fewest active connections. While efficient for load distribution, it doesn't guarantee that subsequent requests from the same user session will go to the same server.",
                    "isCorrect": false
                },
                {
                    "text": "Source IP Hashing",
                    "rationale": "Source IP Hashing (or IP Hash) uses the client's IP address to determine which server to send the request to. This ensures that all requests from a specific client IP are consistently routed to the same backend server, thus providing session stickiness.",
                    "isCorrect": true
                },
                {
                    "text": "Weighted Round Robin",
                    "rationale": "Weighted Round Robin is similar to Round Robin but assigns a 'weight' to each server, sending more requests to servers with higher weights. It still cycles through servers and does not inherently provide session stickiness.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A new feature requires routing incoming API requests to different backend microservices based on specific HTTP request headers (e.g., 'User-Agent' or 'X-API-Version'). Which type of load balancer is best suited for this advanced routing logic?",
            "hint": "Think about which OSI layer provides the necessary context for inspecting application-level data.",
            "answerOptions": [
                {
                    "text": "Network Load Balancer (L4)",
                    "rationale": "Network Load Balancers operate at Layer 4 (Transport Layer) of the OSI model, primarily focusing on IP addresses and ports. They cannot inspect HTTP headers or URL paths for routing decisions.",
                    "isCorrect": false
                },
                {
                    "text": "Application Load Balancer (L7)",
                    "rationale": "Application Load Balancers operate at Layer 7 (Application Layer) of the OSI model. This allows them to inspect HTTP/HTTPS traffic, including headers, URLs, and methods, enabling advanced content-based routing decisions.",
                    "isCorrect": true
                },
                {
                    "text": "DNS Load Balancer",
                    "rationale": "DNS Load Balancers distribute traffic by returning different IP addresses for a given domain name at the DNS resolution stage. They operate at a much higher level than the actual connection and cannot perform routing based on HTTP headers.",
                    "isCorrect": false
                },
                {
                    "text": "Hardware Load Balancer",
                    "rationale": "Hardware Load Balancer describes the deployment method (physical appliance) rather than its functional layer (L4 or L7). While a hardware load balancer *can* be L7, the term itself doesn't specify the capability required for HTTP header inspection.",
                    "isCorrect": false
                }
            ]
        }
    ]
};