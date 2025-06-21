const quizName = "Security in Distributed Systems Quiz";
const quizData = {
    "questions": [
        {
            "question": "In a microservices architecture, what is the primary benefit of implementing Mutual TLS (mTLS) for inter-service communication?",
            "hint": "Think about what mTLS adds beyond regular TLS in terms of identity verification between communicating parties.",
            "answerOptions": [
                {
                    "text": "It encrypts data at rest within each microservice's database.",
                    "rationale": "mTLS is designed for securing data in transit (network communication), not data at rest.",
                    "isCorrect": false
                },
                {
                    "text": "It ensures that both the client and server authenticate each other using digital certificates.",
                    "rationale": "The core feature of mTLS is the bi-directional authentication, where both parties verify each other's identities using certificates, providing stronger security for service-to-service communication.",
                    "isCorrect": true
                },
                {
                    "text": "It automatically performs load balancing across service instances.",
                    "rationale": "Load balancing is a separate concern handled by load balancers, not by mTLS.",
                    "isCorrect": false
                },
                {
                    "text": "It prevents SQL injection attacks on microservice APIs.",
                    "rationale": "SQL injection is an application-layer vulnerability that mTLS does not directly address. mTLS focuses on secure communication channels.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A distributed payment processing system often implements idempotency keys for transactions. While primarily ensuring consistency, how does idempotency also indirectly contribute to security, specifically against a certain type of attack?",
            "hint": "Consider what happens if a malicious actor captures and resends a legitimate request.",
            "answerOptions": [
                {
                    "text": "It prevents Distributed Denial of Service (DDoS) attacks by limiting request rates.",
                    "rationale": "While related to request handling, idempotency primarily addresses repeated logical operations, not traffic volume. Rate limiting is more direct for DDoS.",
                    "isCorrect": false
                },
                {
                    "text": "It makes it harder for attackers to perform SQL injection by requiring unique keys.",
                    "rationale": "Idempotency keys ensure operations are processed once logically; they do not inherently protect against SQL injection, which targets database queries.",
                    "isCorrect": false
                },
                {
                    "text": "It mitigates replay attacks by ensuring that repeated, identical requests are processed only once.",
                    "rationale": "By ensuring an operation has the same effect regardless of how many times it is performed, idempotency prevents a malicious actor from replaying a captured legitimate request to cause multiple unintended state changes (e.g., multiple payments).",
                    "isCorrect": true
                },
                {
                    "text": "It encrypts sensitive payment information during transit, making it unreadable to attackers.",
                    "rationale": "Encryption (e.g., TLS) handles data confidentiality during transit, not idempotency.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a secure distributed system, a Key Management System (KMS) is crucial. What is the primary role of a KMS?",
            "hint": "Think about the lifecycle and protection of cryptographic keys, which are fundamental to encryption and digital signatures.",
            "answerOptions": [
                {
                    "text": "To monitor network traffic for malicious activity and block intruders.",
                    "rationale": "This is the role of an Intrusion Detection/Prevention System (IDS/IPS) or a firewall, not a KMS.",
                    "isCorrect": false
                },
                {
                    "text": "To securely generate, store, manage, and distribute cryptographic keys.",
                    "rationale": "A KMS provides a centralized, secure service for managing the entire lifecycle of cryptographic keys, which are essential for data encryption, digital signatures, and other security operations.",
                    "isCorrect": true
                },
                {
                    "text": "To authenticate user identities using multi-factor authentication.",
                    "rationale": "This is typically handled by an Identity Provider (IdP) or an authentication service, not a KMS.",
                    "isCorrect": false
                },
                {
                    "text": "To ensure data consistency across distributed databases.",
                    "rationale": "Data consistency is a concern for distributed database design and transaction management, not the primary role of a KMS.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "The core principle of a Zero Trust architecture in a distributed system is best described as:",
            "hint": "Consider the default assumption made about any user, device, or service attempting to access resources, regardless of its location.",
            "answerOptions": [
                {
                    "text": "All internal network traffic is inherently trusted, while external traffic is strictly monitored.",
                    "rationale": "This describes a traditional perimeter-based security model, which Zero Trust actively moves away from.",
                    "isCorrect": false
                },
                {
                    "text": "Trust is granted only after strict authentication and authorization, regardless of location or prior access.",
                    "rationale": "The essence of Zero Trust is 'never trust, always verify'. It dictates that no user, device, or service is inherently trusted, requiring continuous verification of identity and authorization for every access request.",
                    "isCorrect": true
                },
                {
                    "text": "Security relies solely on strong perimeter defenses, such as firewalls and VPNs.",
                    "rationale": "Zero Trust extends security beyond the network perimeter, focusing on identity and context rather than network location.",
                    "isCorrect": false
                },
                {
                    "text": "Users are granted broad access permissions by default to facilitate collaboration.",
                    "rationale": "Zero Trust adheres to the principle of least privilege, meaning users and services are granted only the minimum access necessary for their tasks, not broad access by default.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When using JSON Web Tokens (JWTs) for authentication in a distributed system, which of the following is a critical security consideration to prevent common attacks like token theft or tampering?",
            "hint": "Think about how JWTs are signed, their lifetime, and how they are stored on the client-side.",
            "answerOptions": [
                {
                    "text": "Storing JWTs primarily in browser Local Storage for easy client-side access.",
                    "rationale": "Local Storage is vulnerable to Cross-Site Scripting (XSS) attacks, where malicious scripts can easily access and steal JWTs.",
                    "isCorrect": false
                },
                {
                    "text": "Ensuring JWTs are always signed with a strong cryptographic algorithm and a secure secret.",
                    "rationale": "Signing JWTs with a strong algorithm and a well-protected secret key is crucial. This signature verifies the token's integrity (it hasn't been tampered with) and authenticity (it came from the expected issuer).",
                    "isCorrect": true
                },
                {
                    "text": "Embedding sensitive user data directly within the JWT payload.",
                    "rationale": "JWTs are base64 encoded, not encrypted by default. Embedding sensitive data directly makes it visible to anyone who intercepts the token, which is a significant security risk.",
                    "isCorrect": false
                },
                {
                    "text": "Using very long expiration times for JWTs to reduce the need for frequent re-authentication.",
                    "rationale": "Long expiration times increase the window during which a stolen or compromised token can be misused. Shorter lifetimes (and refresh tokens) are generally preferred for security.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Why is 'data at rest' encryption crucial in a distributed system, particularly for databases and storage services?",
            "hint": "Consider the scenarios where data might be compromised when it's not actively being transmitted or processed.",
            "answerOptions": [
                {
                    "text": "It prevents unauthorized access to data while it is being transmitted over the network.",
                    "rationale": "This describes 'data in transit' encryption (e.g., using TLS/SSL), not 'data at rest' encryption.",
                    "isCorrect": false
                },
                {
                    "text": "It protects data from physical theft of storage devices or unauthorized access to backup media.",
                    "rationale": "Data at rest encryption protects data when it's stored on disk, in databases, or on backup tapes. If storage media is physically stolen or accessed without authorization, the data remains unreadable without the decryption key.",
                    "isCorrect": true
                },
                {
                    "text": "It ensures that only authorized users can make changes to database schemas.",
                    "rationale": "This is related to access control, permissions, and database administration best practices, not directly to encryption of data at rest.",
                    "isCorrect": false
                },
                {
                    "text": "It speeds up query performance by pre-processing encrypted data.",
                    "rationale": "Encryption typically adds processing overhead, potentially slowing down performance, rather than speeding it up.",
                    "isCorrect": false
                }
            ]
        }
    ]
};