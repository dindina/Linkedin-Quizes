const quizName = "Designing Ticket Master application Quiz";
const quizData = {
    "questions": [
        {
            "question": "During a high-demand ticket sale for a Ticketmaster-like system, multiple users might attempt to reserve or purchase the same seat concurrently. Which strategy is most effective at preventing overbooking and ensuring atomicity for seat reservations?",
            "hint": "Consider mechanisms that guarantee strong consistency and handle shared resource contention in a distributed environment.",
            "answerOptions": [
                {
                    "text": "Implementing a distributed lock manager (e.g., using ZooKeeper or Redis) for each seat during the reservation period.",
                    "rationale": "A distributed lock manager provides a robust way to ensure that only one client can acquire a lock on a specific seat at any given time, effectively preventing overbooking and guaranteeing atomicity. This is crucial in high-concurrency scenarios.",
                    "isCorrect": true
                },
                {
                    "text": "Relying solely on database transactions with optimistic locking on the seat record.",
                    "rationale": "Optimistic locking requires retries if a conflict occurs, which can lead to a poor user experience during high contention. While it prevents data corruption, it doesn't prevent multiple concurrent attempts from starting and failing, unlike a global lock.",
                    "isCorrect": false
                },
                {
                    "text": "Using an in-memory cache to track seat availability and updating it periodically from the database.",
                    "rationale": "An in-memory cache updated periodically is highly prone to race conditions and eventual consistency issues, leading to potential overbooking or inaccurate availability information, especially during peak sales.",
                    "isCorrect": false
                },
                {
                    "text": "Queuing all seat reservation requests and processing them one by one in a single consumer.",
                    "rationale": "This approach introduces a significant bottleneck, leading to very high latency and extremely poor scalability, making it unsuitable for a high-volume, real-time system like Ticketmaster.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "In designing the core data model for a Ticketmaster-like application, which approach is best for representing seats within venues and events, ensuring efficient queries for availability and minimizing contention during high-volume sales?",
            "hint": "Consider the trade-offs between normalization, query performance, and the granularity of locking/updates for highly dynamic data like seat status.",
            "answerOptions": [
                {
                    "text": "Denormalizing seat availability and status directly into the `Event` table using a complex JSONB field for all seats.",
                    "rationale": "This approach leads to large `Event` records and high write contention on the `Event` table for any seat status update. Querying specific seat statuses within a large JSONB field can also be inefficient.",
                    "isCorrect": false
                },
                {
                    "text": "Creating a separate `Seat` table with `seat_id`, `venue_id`, `event_id`, `row`, `column`, `status`, `price`, and `booking_id`, and using an index on `event_id` and `status`.",
                    "rationale": "This provides a normalized and highly scalable structure. Each seat is an individual record, allowing granular updates (e.g., changing a seat's status from 'available' to 'reserved') without locking larger data structures. Appropriate indexing enables efficient queries for available seats for a given event, minimizing contention and maximizing concurrency.",
                    "isCorrect": true
                },
                {
                    "text": "Utilizing an in-memory key-value store (like Redis) to hold the real-time status of all seats for an event, syncing with a persistent database asynchronously.",
                    "rationale": "While an in-memory store is excellent for caching and low-latency reads, relying solely on it as the source-of-truth without immediate persistence creates a high risk of data loss and complicates transactional integrity for critical operations like booking, which require strong durability.",
                    "isCorrect": false
                },
                {
                    "text": "Employing a separate NoSQL document database (e.g., MongoDB) where each event is a document containing nested collections for all its seats and their statuses.",
                    "rationale": "While flexible, updating a single seat's status within a large event document can lead to contention and inefficient updates on the entire document, especially if the document size is large, effectively forcing updates to lock the entire event document rather than just the specific seat.",
                    "isCorrect": false
                }
            ]
        }
    ]
};