const quizName = "SQL Database Tuning Quiz";
const quizData = {
    "questions": [
        {
            "question": "In the context of database indexing, which statement accurately describes a clustered index?",
            "difficulty": 1,
            "hint": "Think about how data is physically stored and ordered on disk.",
            "answerOptions": [
                {
                    "text": "It creates a separate sorted copy of the indexed columns, storing pointers to the actual data.",
                    "rationale": "This describes a non-clustered index, which is stored separately from the main table data.",
                    "isCorrect": false
                },
                {
                    "text": "It determines the physical order of data rows in the table.",
                    "rationale": "A clustered index defines the physical storage order of the data rows in the table. There can only be one clustered index per table.",
                    "isCorrect": true
                },
                {
                    "text": "It is automatically created for every column with a unique constraint.",
                    "rationale": "While a unique constraint often creates an index, it's typically a unique non-clustered index unless explicitly defined as a clustered index (e.g., on the primary key).",
                    "isCorrect": false
                },
                {
                    "text": "It is primarily used for optimizing LIKE operations with leading wildcards.",
                    "rationale": "Indexes (clustered or non-clustered) are generally not effective for LIKE operations that start with a wildcard (e.g., '%text') because the leading characters are unknown.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "A critical first step in diagnosing a slow-running SQL query is typically to use which database tool or command?",
            "difficulty": 1,
            "hint": "This tool helps you understand the query optimizer's plan for execution.",
            "answerOptions": [
                {
                    "text": "ANALYZE TABLE",
                    "rationale": "ANALYZE TABLE updates table statistics, which helps the optimizer make better decisions, but it doesn't show the execution plan itself.",
                    "isCorrect": false
                },
                {
                    "text": "EXPLAIN (or EXPLAIN ANALYZE)",
                    "rationale": "The EXPLAIN (or EXPLAIN ANALYZE in PostgreSQL/MySQL for actual execution details) command shows the query optimizer's execution plan, revealing how the database intends to retrieve the data (e.g., index usage, join order, scans).",
                    "isCorrect": true
                },
                {
                    "text": "SHOW PROCESSLIST",
                    "rationale": "SHOW PROCESSLIST displays currently executing queries and their status, but it does not provide insight into the query execution plan.",
                    "isCorrect": false
                },
                {
                    "text": "OPTIMIZE TABLE",
                    "rationale": "OPTIMIZE TABLE defragments tables and reclaims unused space, which can improve performance in some cases, but it's not a diagnostic tool for understanding a specific query's plan.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "If your database frequently performs full table scans and your disk I/O utilization is consistently high, which database configuration parameter would you most likely consider increasing to improve performance?",
            "difficulty": 2,
            "hint": "This parameter relates to how much data the database can keep in memory to avoid reading from disk.",
            "answerOptions": [
                {
                    "text": "max_connections",
                    "rationale": "Increasing max_connections allows more concurrent users but doesn't directly address high disk I/O from full table scans.",
                    "isCorrect": false
                },
                {
                    "text": "buffer_pool_size (e.g., innodb_buffer_pool_size for MySQL, shared_buffers for PostgreSQL)",
                    "rationale": "The buffer pool (or shared buffers) caches data pages in memory. A larger buffer pool means more data can be held in RAM, reducing the need for costly disk I/O, especially for frequently accessed data or when full table scans are unavoidable.",
                    "isCorrect": true
                },
                {
                    "text": "wait_timeout",
                    "rationale": "wait_timeout controls how long the database waits for activity on a connection before closing it; it has no direct impact on disk I/O for data retrieval.",
                    "isCorrect": false
                },
                {
                    "text": "query_cache_size",
                    "rationale": "The query cache stores query results. While it can reduce CPU usage for repeated identical queries, it has overhead and is often deprecated/removed in modern database versions due to concurrency issues. It doesn't primarily address high disk I/O from table scans as effectively as the buffer pool.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "When designing a database schema, choosing appropriate data types is crucial for performance. Which of the following is generally the best practice for a column that will store only positive whole numbers up to 1000?",
            "difficulty": 2,
            "hint": "Smaller data types consume less storage and can be processed faster.",
            "answerOptions": [
                {
                    "text": "BIGINT",
                    "rationale": "BIGINT can store very large numbers (up to approximately 9 quintillion), which is overkill for a maximum value of 1000 and wastes storage space.",
                    "isCorrect": false
                },
                {
                    "text": "VARCHAR(10)",
                    "rationale": "VARCHAR is for string data. Storing numbers as strings requires more space, adds conversion overhead for calculations, and prevents efficient numerical operations or indexing.",
                    "isCorrect": false
                },
                {
                    "text": "SMALLINT (or INT if SMALLINT is insufficient for similar ranges)",
                    "rationale": "SMALLINT typically stores values up to 32,767 (signed) or 65,535 (unsigned), making it perfectly suitable and efficient for storing numbers up to 1000. It uses less memory and disk space than larger integer types.",
                    "isCorrect": true
                },
                {
                    "text": "DECIMAL(4,0)",
                    "rationale": "DECIMAL is used for fixed-precision numbers, typically for monetary or scientific data where exact precision is required. It's less efficient than integer types for simple whole numbers.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "You have a slow query that uses a correlated subquery in the WHERE clause to filter results based on a condition from another table. Which common optimization technique is most likely to significantly improve its performance?",
            "difficulty": 3,
            "hint": "Correlated subqueries can be inefficient because they execute once for each row of the outer query.",
            "answerOptions": [
                {
                    "text": "Adding a LIMIT clause to the subquery.",
                    "rationale": "While LIMIT can help if the subquery itself returns a massive dataset, it doesn't fundamentally change the inefficient correlated execution pattern where the subquery runs for every row of the outer query.",
                    "isCorrect": false
                },
                {
                    "text": "Rewriting the subquery as a JOIN (e.g., INNER JOIN or LEFT JOIN).",
                    "rationale": "Rewriting correlated subqueries as joins is a very common and effective optimization. Database optimizers are generally highly optimized for join operations, and this often leads to much more efficient execution plans compared to row-by-row subquery evaluation.",
                    "isCorrect": true
                },
                {
                    "text": "Converting the subquery to a UNION operation.",
                    "rationale": "UNION combines the result sets of two or more SELECT statements; it's not a direct replacement for a correlated subquery used for filtering and doesn't address the performance issue of correlated execution.",
                    "isCorrect": false
                },
                {
                    "text": "Applying DISTINCT to the outer query.",
                    "rationale": "Adding DISTINCT adds overhead to eliminate duplicate rows and does not address the underlying performance issue of the correlated subquery's execution.",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "To optimize a SELECT query that retrieves only specific columns and uses those same columns in its WHERE clause and ORDER BY clause, what type of index would provide the maximum performance benefit by avoiding a separate table lookup?",
            "difficulty": 3,
            "hint": "This index type includes all necessary columns to fulfill the query directly from the index structure.",
            "answerOptions": [
                {
                    "text": "A unique index on the primary key.",
                    "rationale": "A unique index on the primary key is excellent for point lookups, but if the query selects other non-key columns, the database still needs to perform a bookmark lookup (or row lookup) to retrieve those values from the actual table.",
                    "isCorrect": false
                },
                {
                    "text": "A hash index on the WHERE clause column.",
                    "rationale": "Hash indexes are primarily good for exact equality lookups (=) and not for range queries or ORDER BY clauses. More importantly, they typically do not store all columns needed for a covering query.",
                    "isCorrect": false
                },
                {
                    "text": "A covering index (or index with included columns) on all referenced columns.",
                    "rationale": "A covering index (also known as an index with included columns in SQL Server or a composite index with all necessary columns in other databases) contains all the columns required by the query (in SELECT, WHERE, ORDER BY, GROUP BY). This allows the database to retrieve all necessary data directly from the index without having to access the base table, significantly reducing I/O and improving performance.",
                    "isCorrect": true
                },
                {
                    "text": "A full-text index on the ORDER BY column.",
                    "rationale": "Full-text indexes are specifically designed for linguistic searches within large text blocks and are not suitable for general column selection, filtering, or ordering of structured data.",
                    "isCorrect": false
                }
            ]
        }
    ]
};