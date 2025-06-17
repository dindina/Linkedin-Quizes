const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

//const API_KEY = process.env.GEMINI_API_KEY;
const API_KEY = 'AIzaSyCcDyr8Z-sgWmcmPLHP8tmsPqnFtjg4COw';
if (!API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateQuizQuestionsNode(topic, numQuestions = 1) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" }); // Or "gemini-1.5-flash" etc.

    const prompt = `
You are an expert quiz question writer specializing in System Design Interview and specfically on the topic "${topic}".
Generate ${numQuestions} new quiz question(s) on this topic.
For each question, provide:
1. "question": The question text.
2. "hint": A helpful hint for the user.
3. "answerOptions": An array of 4 objects, each with:
    a. "text": The answer option text.
    b. "rationale": A brief explanation for why this option is correct or incorrect.
    c. "isCorrect": A boolean value (true for only one option, false for the others).

Ensure the output is a valid JSON object containing a "questions" array, where each element is a question object structured as described above.

Example of a single question object format:
{
    "question": "Sample question text?",
    "hint": "Sample hint.",
    "answerOptions": [
        {"text": "Option A", "rationale": "Rationale A.", "isCorrect": true},
        {"text": "Option B", "rationale": "Rationale B.", "isCorrect": false},
        {"text": "Option C", "rationale": "Rationale C.", "isCorrect": false},
        {"text": "Option D", "rationale": "Rationale D.", "isCorrect": false}
    ]
}

Do not include any text outside of the JSON object itself.
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("--- Gemini Raw Response Text ---");
        console.log(text);
        console.log("--------------------------------");

        let cleanedText = text.trim();
        if (cleanedText.startsWith("```json")) {
            cleanedText = cleanedText.substring(7);
        }
        if (cleanedText.endsWith("```")) {
            cleanedText = cleanedText.slice(0, -3);
        }
        cleanedText = cleanedText.trim();

        const data = JSON.parse(cleanedText);
        return data.questions; // Assuming the root of the JSON is an object with a "questions" key

    } catch (error) {
        if (error instanceof SyntaxError) { // JSON.parse error
            console.error("Error decoding JSON from Gemini response:", error);
            console.error("Problematic response text:", text); // 'text' might be undefined if API call failed earlier
        } else {
            console.error("An error occurred with Gemini API:", error);
        }
        return null;
    }
}
function runGitCommands(commitMessage, newFilePaths) {
    try {
        console.log("\n--- Running Git Commands ---");

        // Navigate to the root of your Git repository if necessary.
        // This assumes your script is run from a location where these relative paths make sense,
        // or you adjust the CWD (Current Working Directory) for execSync.
        // For simplicity, let's assume the script's CWD allows direct git operations on the repo.
        // const repoRoot = path.resolve(__dirname, '..', '..'); // Adjust if your script is deeper

        console.log("Pulling latest changes...");
        execSync('git pull', { stdio: 'inherit' }); // stdio: 'inherit' shows git output in console

        newFilePaths.forEach(filePath => {
            execSync(`git add ${filePath}`, { stdio: 'inherit' });
        });
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log("Successfully pushed to GitHub.");
    } catch (error) {
        console.error("Error running Git commands:", error.message);
        console.error("Git command output (if any):", error.stdout?.toString(), error.stderr?.toString());
        // Decide if you want to throw the error further or handle it (e.g., skip LinkedIn post)
    }
}

async function main() {
    const quizTopic = "Rest API Design Principles";
    const generatedQuestions = await generateQuizQuestionsNode(quizTopic, 2);

    if (generatedQuestions) {
        console.log("\n--- Generated Quiz Questions (Parsed) ---");
        const today = new Date().toISOString().split('T')[0];
        const quizFileName = `quiz-${quizTopic.toLowerCase().replace(/\s+/g, '-')}-${today}`;

        const quizFileContent = `const quizName = "${quizTopic} Quiz - ${today}";\nconst quizData = ${JSON.stringify({ questions: generatedQuestions }, null, 4)};`;

        const finalJsDirectory = path.resolve(__dirname, '..', 'js', 'generated-quizzes');
        const finalJsFilePath = path.join(finalJsDirectory, `${quizFileName}.js`);

        await fs.mkdir(finalJsDirectory, { recursive: true });
        await fs.writeFile(finalJsFilePath, quizFileContent);
        console.log(`Quiz data saved to ${finalJsFilePath}`);


        console.log("\n--- JS File Content ---");
        console.log(quizFileContent);

        // --- Generate HTML File from Template ---
        const htmlQuizTitle = `${quizTopic} Quiz - ${today}`;
        const htmlFileName = `${quizTopic.toLowerCase().replace(/\s+/g, '-')}-${today}-quiz.html`;
        const htmlFilePath = path.resolve(__dirname, '..', 'system-design', htmlFileName);
        const relativeJsPathForHtml = `../js/generated-quizzes/${quizFileName}.js`;

        // Read the HTML template
        const templatePath = path.join(__dirname, 'quiz-page-template.html'); // Assuming template is in the same dir as index.js
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders
        htmlTemplate = htmlTemplate.replace(/{{QUIZ_PAGE_TITLE}}/g, htmlQuizTitle);
        htmlTemplate = htmlTemplate.replace(/{{QUIZ_HEADER_TITLE}}/g, htmlQuizTitle);
        htmlTemplate = htmlTemplate.replace(/{{QUIZ_DATA_SCRIPT_PATH}}/g, relativeJsPathForHtml);

        await fs.writeFile(htmlFilePath, htmlTemplate);
        console.log(`Quiz HTML file saved to ${htmlFilePath}`);

        const gitJsFilePath = path.join('docs', 'js', 'generated-quizzes', `${quizFileName}.js`);
        const gitHtmlFilePath = path.join('docs', 'system-design', htmlFileName);
        const commitMessage = `feat: Add new quiz on '${quizTopic}' for ${today}`;

        runGitCommands(commitMessage, [gitJsFilePath, gitHtmlFilePath]);

    } else {
        console.log("Failed to generate quiz questions.");
    }
}

main();
