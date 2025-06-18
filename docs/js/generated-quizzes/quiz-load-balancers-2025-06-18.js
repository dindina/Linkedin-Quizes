const quizName = "Load Balancers Quiz";
const quizData = {
    "questions": [
        {
            "question": "What is the primary purpose of a load balancer in a distributed system?",
            "hint": "Think about how it improves system reliability, scalability, and performance.",
            "answerOptions": [
                {
                    "text": "To cache static content for faster delivery.",
                    "rationale": "Caching is typically handled by Content Delivery Networks (CDNs) or caching proxies, not the primary role of a load balancer.",
                    "isCorrect": false
                },
                {
                    "text": "To distribute incoming network traffic across multiple backend servers.",
                    "rationale": "The fundamental role of a load balancer is to efficiently distribute client requests among a group of servers to ensure optimal resource utilization and prevent overload.",
                    "isCorrect": true
                },
                {
                    "text": "To secure the network perimeter against unauthorized access.",
                    "rationale": "Network security is primarily managed by firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), or Web Application Firewalls (WAFs).",
                    "isCorrect": false
                },
                {
                    "text": "To manage and store user session data.",
                    "rationale": "User session data is typically managed by session stores (e.g., Redis, Memcached) or databases, not directly by a load balancer.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which load balancing algorithm directs new requests to the server with the fewest active connections?",
            "hint": "This algorithm is often ideal for scenarios where backend servers have varying processing capabilities or handle requests of different complexities.",
            "answerOptions": [
                {
                    "text": "Round Robin",
                    "rationale": "Round Robin distributes requests sequentially to each server in the group, regardless of their current load.",
                    "isCorrect": false
                },
                {
                    "text": "IP Hash",
                    "rationale": "IP Hash routes requests based on a hash of the client's IP address, ensuring that a specific client consistently connects to the same server.",
                    "isCorrect": false
                },
                {
                    "text": "Least Connections",
                    "rationale": "Least Connections directs traffic to the server that currently has the fewest open connections, aiming to balance the load based on real-time activity.",
                    "isCorrect": true
                },
                {
                    "text": "Weighted Round Robin",
                    "rationale": "Weighted Round Robin is a variation of Round Robin where servers are assigned a weight, and requests are distributed proportionally to their weight.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A Layer 7 (Application Layer) load balancer can make routing decisions based on which of the following?",
            "hint": "Consider the level of detail available at the application layer of the OSI model.",
            "answerOptions": [
                {
                    "text": "Source IP address and port number.",
                    "rationale": "Routing decisions based on source IP and port number are characteristic of a Layer 4 (Transport Layer) load balancer.",
                    "isCorrect": false
                },
                {
                    "text": "TCP/UDP packet headers.",
                    "rationale": "TCP/UDP packet headers are processed at Layer 4 (Transport Layer).",
                    "isCorrect": false
                },
                {
                    "text": "HTTP headers, URL paths, and cookie data.",
                    "rationale": "Layer 7 load balancers operate at the application level, allowing them to inspect HTTP/HTTPS traffic and make intelligent routing decisions based on application-specific data like URLs, headers, cookies, and even body content.",
                    "isCorrect": true
                },
                {
                    "text": "MAC addresses.",
                    "rationale": "MAC addresses are used for routing at Layer 2 (Data Link Layer).",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Why are health checks critical for a load balancer's operation?",
            "hint": "What happens if a load balancer sends traffic to a server that is down or unhealthy?",
            "answerOptions": [
                {
                    "text": "To encrypt traffic between the load balancer and backend servers.",
                    "rationale": "Traffic encryption is handled by protocols like SSL/TLS, not the primary function of health checks.",
                    "isCorrect": false
                },
                {
                    "text": "To ensure that traffic is only sent to healthy and available backend servers.",
                    "rationale": "Health checks periodically verify the status of backend servers. If a server fails a health check, the load balancer stops sending new requests to it, ensuring high availability and preventing requests from going to unresponsive servers.",
                    "isCorrect": true
                },
                {
                    "text": "To prioritize certain types of traffic over others.",
                    "rationale": "Traffic prioritization is related to Quality of Service (QoS) mechanisms, not health checks.",
                    "isCorrect": false
                },
                {
                    "text": "To store application logs for debugging purposes.",
                    "rationale": "Application logs are typically stored in dedicated logging systems or log files on the servers themselves.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the primary reason for enabling 'sticky sessions' (or session persistence) on a load balancer?",
            "hint": "Consider applications that maintain user-specific state on the server side.",
            "answerOptions": [
                {
                    "text": "To reduce the number of active connections to backend servers.",
                    "rationale": "Sticky sessions can sometimes concentrate connections on fewer servers, potentially increasing connections to specific servers rather than reducing total active connections.",
                    "isCorrect": false
                },
                {
                    "text": "To evenly distribute load across all backend servers.",
                    "rationale": "Sticky sessions inherently break perfect load distribution because a user's requests are 'stuck' to a particular server, even if others are less busy.",
                    "isCorrect": false
                },
                {
                    "text": "To ensure a user's subsequent requests are directed to the same backend server that handled their initial request.",
                    "rationale": "Sticky sessions are crucial for stateful applications where user session data (like shopping cart contents, login status) is stored directly on a specific backend server. It ensures that all requests from a user within a session go to the same server.",
                    "isCorrect": true
                },
                {
                    "text": "To enhance the security of data transmitted between the client and server.",
                    "rationale": "Data security is primarily achieved through encryption (e.g., SSL/TLS), not sticky sessions.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which of the following best describes the function of a Global Server Load Balancer (GSLB)?",
            "hint": "Think about load balancing on a larger, geographical scale.",
            "answerOptions": [
                {
                    "text": "Distributes traffic within a single data center based on server health.",
                    "rationale": "This describes a traditional, local load balancer, not a GSLB.",
                    "isCorrect": false
                },
                {
                    "text": "Distributes traffic across multiple geographically dispersed data centers or regions.",
                    "rationale": "A GSLB's primary function is to direct client requests to the optimal data center or region, considering factors like network latency, data center health, and regional traffic load, for global high availability and disaster recovery.",
                    "isCorrect": true
                },
                {
                    "text": "Balances requests among different microservices within a single application.",
                    "rationale": "This type of load balancing is typically handled by service meshes (e.g., Istio, Linkerd) or API Gateways within a microservices architecture.",
                    "isCorrect": false
                },
                {
                    "text": "Manages database read/write operations across replica sets.",
                    "rationale": "Database load balancing or routing is a specialized function typically handled by database-specific proxies or application logic, not a generic GSLB.",
                    "isCorrect": false
                }
            ]
        }
    ]
};