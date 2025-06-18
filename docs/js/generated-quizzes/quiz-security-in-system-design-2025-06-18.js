const quizName = "Security in System Design Quiz";
const quizData = {
    "questions": [
        {
            "question": "In a typical OAuth 2.0 Authorization Code Grant flow, which entity is primarily responsible for securely exchanging the authorization code for an access token?",
            "hint": "Consider which component of the client application needs to keep secrets confidential and communicates directly with the Authorization Server.",
            "answerOptions": [
                {
                    "text": "Resource Owner (End-User)",
                    "rationale": "The Resource Owner grants consent but is not involved in the server-to-server exchange of codes for tokens.",
                    "isCorrect": false
                },
                {
                    "text": "Client Application (Backend Server)",
                    "rationale": "The backend component of the client application receives the authorization code via a redirect and then makes a direct, secure server-to-server call to the Authorization Server to exchange it for an access token, using its client secret for authentication. This keeps the client secret confidential.",
                    "isCorrect": true
                },
                {
                    "text": "Authorization Server",
                    "rationale": "The Authorization Server issues the authorization code and access tokens, but it's the client application that initiates the exchange request to it.",
                    "isCorrect": false
                },
                {
                    "text": "Resource Server",
                    "rationale": "The Resource Server hosts the protected resources and validates access tokens, but it's not involved in the authorization code exchange process.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A system needs to protect sensitive customer data stored in a database and also ensure secure communication between its microservices. Which combination of security measures primarily addresses these two concerns?",
            "hint": "Think about the state of the data (at rest or in transit) when it's being protected.",
            "answerOptions": [
                {
                    "text": "Tokenization for storage and SSL/TLS for communication.",
                    "rationale": "While tokenization is a valid data protection method and SSL/TLS secures communication, 'Encryption at rest' and 'Encryption in transit' are more general and comprehensive terms that encompass these and other techniques for the primary concerns.",
                    "isCorrect": false
                },
                {
                    "text": "Data masking for storage and VPN for communication.",
                    "rationale": "Data masking is typically for obfuscation (e.g., for non-production environments) rather than primary protection of live sensitive data. VPNs create secure tunnels but don't specifically secure individual microservice communications in the same way encryption in transit does within the application layer.",
                    "isCorrect": false
                },
                {
                    "text": "Encryption at rest for storage and encryption in transit for communication.",
                    "rationale": "Encryption at rest directly protects data stored in the database. Encryption in transit (often implemented with TLS/SSL) directly secures data as it moves between microservices over a network. This combination directly addresses both stated concerns comprehensively.",
                    "isCorrect": true
                },
                {
                    "text": "Hashing for storage and Web Application Firewall (WAF) for communication.",
                    "rationale": "Hashing is a one-way function and not suitable for data that needs to be retrieved. A WAF protects against web application attacks, but its primary role isn't to secure general inter-service communication within a microservices architecture.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A web application processes user-supplied input to construct database queries. An attacker attempts to submit a string like `' OR '1'='1' --` into an input field. Which common OWASP Top 10 vulnerability is the system most likely exposed to, and what's the primary mitigation?",
            "hint": "Consider how user input interacts with backend commands and how to prevent it from being executed as code.",
            "answerOptions": [
                {
                    "text": "Cross-Site Scripting (XSS); Mitigation: HTML entity encoding.",
                    "rationale": "XSS involves injecting client-side scripts into web pages, not manipulating database queries. HTML encoding is for XSS.",
                    "isCorrect": false
                },
                {
                    "text": "Broken Access Control; Mitigation: Implement robust authorization checks.",
                    "rationale": "Broken Access Control relates to unauthorized access to functions or data based on insufficient authorization, not direct manipulation of backend queries via input.",
                    "isCorrect": false
                },
                {
                    "text": "Injection (SQL Injection); Mitigation: Use parameterized queries or prepared statements.",
                    "rationale": "The provided string is a classic SQL Injection payload designed to manipulate a database query. Parameterized queries or prepared statements ensure that user input is treated as data, not executable code, effectively mitigating this vulnerability.",
                    "isCorrect": true
                },
                {
                    "text": "Security Misconfiguration; Mitigation: Regularly update server software and configurations.",
                    "rationale": "Security Misconfiguration is a broad category. While updating software is good practice, it's not the specific primary mitigation for this type of input attack.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A company wants to protect its public-facing web applications from common web attacks like SQL Injection, Cross-Site Scripting (XSS), and session hijacking, *before* these requests reach the backend servers. Which security component is best suited for this role?",
            "hint": "Think about the layer at which protection is applied and the types of attacks it specifically targets.",
            "answerOptions": [
                {
                    "text": "Network Firewall",
                    "rationale": "A network firewall operates at lower network layers (L3/L4) and primarily filters traffic based on IP addresses, ports, and protocols, not application-layer attacks like SQLi or XSS.",
                    "isCorrect": false
                },
                {
                    "text": "Intrusion Detection System (IDS)",
                    "rationale": "An IDS detects suspicious activities but typically only alerts, without blocking the traffic. An Intrusion Prevention System (IPS) could block, but a WAF is more specialized for web application-specific attacks.",
                    "isCorrect": false
                },
                {
                    "text": "Web Application Firewall (WAF)",
                    "rationale": "A WAF operates at the application layer (L7) and is specifically designed to inspect HTTP/S traffic, detect, and block common web application attacks like SQL Injection, XSS, and more, before they reach the application server.",
                    "isCorrect": true
                },
                {
                    "text": "Virtual Private Network (VPN)",
                    "rationale": "A VPN provides a secure, encrypted tunnel for network traffic, but it does not inspect the content of application-layer requests for malicious payloads or web attacks.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To adhere to the principle of 'Least Privilege' in a system design, how should a microservice responsible for generating PDF reports interact with a database containing user data?",
            "hint": "Consider the minimal necessary access rights for the specific task of generating reports.",
            "answerOptions": [
                {
                    "text": "Grant the microservice full read/write/delete access to all tables in the database.",
                    "rationale": "This grants excessive privileges, violating the principle of least privilege. If the service is compromised, the blast radius is significantly larger.",
                    "isCorrect": false
                },
                {
                    "text": "Grant the microservice read-only access to only the specific tables and columns required for report generation.",
                    "rationale": "This option perfectly embodies the principle of least privilege: the service is granted only the necessary permissions (read) to only the necessary data (specific tables/columns) to perform its designated function (report generation).",
                    "isCorrect": true
                },
                {
                    "text": "Grant the microservice write-only access to the report generation table and full read access to all other tables.",
                    "rationale": "Granting write access where not needed and full read access to unrelated tables violates the principle of least privilege. A report generation service typically only needs read access.",
                    "isCorrect": false
                },
                {
                    "text": "Allow the microservice to directly query the database using the root user credentials for simplicity.",
                    "rationale": "Using root credentials for an application service is an extremely dangerous security anti-pattern and a severe violation of least privilege, making the entire database vulnerable if the service is compromised.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a system that relies heavily on encryption, which of the following is the *most critical* best practice for managing cryptographic keys?",
            "hint": "Think about where keys should be generated, stored, and accessed in a secure, audited manner.",
            "answerOptions": [
                {
                    "text": "Store all encryption keys directly within the application's configuration files for easy access.",
                    "rationale": "Storing keys directly in application configuration files is highly insecure as it exposes them if the configuration files are compromised or accessed by unauthorized individuals. This is a common security flaw.",
                    "isCorrect": false
                },
                {
                    "text": "Implement a robust Key Management Service (KMS) or Hardware Security Module (HSM) for key generation, storage, and access control.",
                    "rationale": "KMS and HSMs provide secure, centralized, and audited environments for cryptographic key lifecycle management, including generation, storage, usage, and rotation. This isolates keys from applications, making them significantly more secure and resilient to compromise.",
                    "isCorrect": true
                },
                {
                    "text": "Share a single master encryption key across all environments (development, staging, production) to simplify key rotation.",
                    "rationale": "Sharing keys across environments significantly increases the blast radius if a key is compromised. It also complicates proper key rotation and lifecycle management. Keys should be isolated per environment.",
                    "isCorrect": false
                },
                {
                    "text": "Manually generate keys on a developer's workstation and commit them to version control.",
                    "rationale": "Generating keys on insecure workstations and committing them to version control are critical security failures. Keys must be generated in secure, controlled environments and never stored in version control systems.",
                    "isCorrect": false
                }
            ]
        }
    ]
};