const quizName = "Load balancers Quiz - 2025-06-18";
const quizData = {
    "questions": [
        {
            "question": "Which load balancing algorithm is most effective for ensuring that a client's subsequent requests during a session are consistently directed to the same backend server, often required for stateful applications?",
            "hint": "Consider algorithms that prioritize session affinity or 'stickiness' rather than just distributing new connections.",
            "answerOptions": [
                {
                    "text": "Round Robin",
                    "rationale": "Round Robin distributes requests sequentially among servers without considering client sessions, meaning subsequent requests from the same client could go to different servers.",
                    "isCorrect": false
                },
                {
                    "text": "Least Connections",
                    "rationale": "Least Connections directs new requests to the server with the fewest active connections. While efficient for load distribution, it doesn't guarantee the same server for subsequent requests from the *same* client if new connections are established.",
                    "isCorrect": false
                },
                {
                    "text": "IP Hash (Source IP Hash)",
                    "rationale": "IP Hash uses a hash of the client's IP address to map requests to a specific server. This ensures all requests from that IP address are consistently directed to the same backend server, making it effective for session stickiness in stateful applications.",
                    "isCorrect": true
                },
                {
                    "text": "Weighted Round Robin",
                    "rationale": "Weighted Round Robin distributes requests sequentially based on predefined server weights. It does not ensure session persistence or direct a client's subsequent requests to the same server.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A new service requires advanced routing capabilities such as path-based routing, HTTP header inspection for A/B testing, and SSL/TLS termination at the load balancer. Which type of load balancer is best suited for these requirements?",
            "hint": "Think about the OSI model layers and the level of intelligence required to process application-specific information like HTTP headers and URLs.",
            "answerOptions": [
                {
                    "text": "Layer 4 (Transport Layer) Load Balancer",
                    "rationale": "Layer 4 load balancers operate at the transport layer (TCP/UDP) and primarily make routing decisions based on IP addresses and port numbers. They cannot inspect application-layer content like HTTP headers or URLs, nor can they typically perform SSL/TLS termination effectively.",
                    "isCorrect": false
                },
                {
                    "text": "Layer 7 (Application Layer) Load Balancer",
                    "rationale": "Layer 7 load balancers operate at the application layer (e.g., HTTP/HTTPS). They can inspect the content of requests, including HTTP headers, URLs, and cookies, enabling advanced features like path-based routing, content-based routing, SSL/TLS termination, and A/B testing. This makes them ideal for the specified requirements.",
                    "isCorrect": true
                },
                {
                    "text": "DNS Load Balancer",
                    "rationale": "DNS load balancing distributes traffic by returning different IP addresses for DNS queries. It operates at a very high level (DNS resolution) and cannot inspect individual request contents, perform SSL/TLS termination, or handle advanced application-layer routing.",
                    "isCorrect": false
                },
                {
                    "text": "Network Load Balancer (NLB)",
                    "rationale": "Network Load Balancers (often synonymous with Layer 4 load balancers in cloud contexts) are highly performant but operate at the network/transport layer. While excellent for high-throughput, low-latency applications, they lack the application-layer intelligence for content-based routing, HTTP header inspection, or SSL/TLS termination.",
                    "isCorrect": false
                }
            ]
        }
    ]
};