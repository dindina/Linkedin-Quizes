

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process'); // Import execSync
//const axios = require('axios'); // For LinkedIn API calls
const { quizTopic: configuredQuizTopic, numQuestions: configuredNumQuestions } = require('./config'); // Import from config.js
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    throw new Error("GOOGLE_API_KEY environment variable not set.");
}

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
let LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN; // Can be updated by refresh
const LINKEDIN_REFRESH_TOKEN = process.env.LINKEDIN_REFRESH_TOKEN;

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

function runGitCommands(commitMessage, filesToCommit) {
    try {
        console.log("\n--- Running Git Commands ---");

        const execOptions = { stdio: 'inherit' };

        console.log("Pulling latest changes...");
        execSync('git pull --rebase --autostash', execOptions);

        filesToCommit.forEach(filePath => {
            // filePath should be relative to the Git repository root.
            console.log(`Adding to git: ${filePath}`);
            execSync(`git add "${filePath}"`, execOptions); // Quote filePath for spaces
        });

        // Check if there are actual changes staged for commit
        const statusOutput = execSync('git status --porcelain', { cwd: execOptions.cwd }).toString();
        if (statusOutput.trim().length === 0) {
            console.log("No changes to commit. Skipping commit and push.");
            return; // Exit if nothing is staged
        }

        console.log(`Committing changes with message: "${commitMessage}"`);
        execSync(`git commit -m "${commitMessage}"`, execOptions);

        console.log("Pushing to GitHub...");
        execSync('git push', execOptions);

        console.log("Successfully pushed to GitHub.");
    } catch (error) {
        console.error("Error running Git commands:", error.message);
        console.error("Git command output (if any):", error.stdout?.toString(), error.stderr?.toString());
        // Decide if you want to throw the error further or handle it (e.g., skip LinkedIn post)
    }
}

// --- LinkedIn API Functions ---
/*async function refreshLinkedInAccessToken() {
    if (!LINKEDIN_REFRESH_TOKEN) {
        console.warn("LINKEDIN_REFRESH_TOKEN is not set. Cannot refresh. Please perform initial OAuth flow.");
        return null;
    }
    if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
        console.warn("LinkedIn Client ID or Secret not configured for token refresh. Skipping.");
        return null;
    }
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', LINKEDIN_REFRESH_TOKEN);
    params.append('client_id', LINKEDIN_CLIENT_ID);
    params.append('client_secret', LINKEDIN_CLIENT_SECRET);

    try {
        const response = await axios.post(tokenUrl, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        LINKEDIN_ACCESS_TOKEN = response.data.access_token; // Update global access token
        console.log("LinkedIn Access Token refreshed successfully.");
        // Note: LinkedIn refresh tokens might also be single-use or have their own expiry.
        // You might need to store the new refresh_token if one is returned:
        // if (response.data.refresh_token) process.env.LINKEDIN_REFRESH_TOKEN = response.data.refresh_token;
        return LINKEDIN_ACCESS_TOKEN;
    } catch (error) {
        console.error("Error refreshing LinkedIn access token:", error.response ? error.response.data : error.message);
        return null;
    }
}

async function getLinkedInUserUrn(accessToken) {
    if (!accessToken) return null;
    try {
        const response = await axios.get('https://api.linkedin.com/v2/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return `urn:li:person:${response.data.id}`;
    } catch (error) {
        console.error("Error fetching LinkedIn user URN:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) { // Unauthorized, token likely expired
            return 'EXPIRED_TOKEN';
        }
        return null;
    }
}

async function createLinkedInPost(accessToken, authorUrn, postContent, quizUrl, quizTitle) {
    if (!accessToken || !authorUrn) {
        console.error("Access token or author URN is missing for LinkedIn post.");
        return false;
    }
    const postApiUrl = 'https://api.linkedin.com/v2/ugcPosts';
    const body = {
        author: authorUrn,
        lifecycleState: "PUBLISHED",
        specificContent: {
            "com.linkedin.ugc.ShareContent": {
                shareCommentary: { text: postContent },
                shareMediaCategory: "ARTICLE",
                media: [{
                    status: "READY",
                    originalUrl: quizUrl,
                    title: { text: quizTitle },
                    // description: { text: `Test your knowledge on ${quizTitle.replace(" Quiz", "")}!` }
                }]
            }
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    };

    try {
        await axios.post(postApiUrl, body, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });
        console.log("LinkedIn post created successfully for quiz:", quizTitle);
        return true;
    } catch (error) {
        console.error("Error creating LinkedIn post:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        if (error.response && error.response.status === 401) {
            console.log("Access token might be expired or invalid during post creation.");
            return 'EXPIRED_TOKEN_ON_POST';
        }
        return false;
    }
}*/

async function updateQuizManifest(newQuizTitle, absoluteHtmlFilePath) {
    const manifestPath = path.resolve(__dirname, '..', 'js', 'quiz-manifest.js');
    let currentQuizzes = [];

    try {
        if (require.cache[require.resolve(manifestPath)]) {
            delete require.cache[require.resolve(manifestPath)];
        }
        const manifestModule = require(manifestPath);
        if (Array.isArray(manifestModule.allQuizzes)) {
            currentQuizzes = manifestModule.allQuizzes;
        } else {
            console.warn(`Warning: 'allQuizzes' in ${manifestPath} is not an array or is missing. Initializing with an empty list for update.`);
        }
    } catch (error) {
        console.warn(`Warning: Could not read or parse existing ${manifestPath}. A new manifest will be created if it doesn't exist, or an error occurred: ${error.message}`);
    }

    const docsDirectoryPath = path.resolve(__dirname, '..');
    const relativeHtmlPathForManifest = `./${path.relative(docsDirectoryPath, absoluteHtmlFilePath).replace(/\\/g, '/')}`; // Ensure forward slashes

    const existingQuizIndex = currentQuizzes.findIndex(quiz => quiz.path === relativeHtmlPathForManifest);

    if (existingQuizIndex !== -1) {
        if (currentQuizzes[existingQuizIndex].title !== newQuizTitle) {
            console.log(`Updating title for existing quiz in manifest: ${relativeHtmlPathForManifest}`);
            currentQuizzes[existingQuizIndex].title = newQuizTitle;
        } else {
            console.log(`Quiz ${relativeHtmlPathForManifest} already in manifest with the same title. No update needed.`);
        }
    } else {
        currentQuizzes.push({ title: newQuizTitle, path: relativeHtmlPathForManifest });
        console.log(`Added new quiz to manifest: ${newQuizTitle} (${relativeHtmlPathForManifest})`);
    }

    currentQuizzes.sort((a, b) => a.title.localeCompare(b.title));

    const newManifestContent = `const allQuizzes = ${JSON.stringify(currentQuizzes, null, 4)};\n\nmodule.exports = { allQuizzes };`;

    try {
        await fs.writeFile(manifestPath, newManifestContent, 'utf8');
        console.log(`Successfully updated quiz manifest at ${manifestPath}`);
    } catch (writeError) {
        console.error(`Error writing to quiz manifest at ${manifestPath}:`, writeError);
        throw writeError;
    }
}


async function main() {
    const quizTopic = configuredQuizTopic || "Today's quiz"; // Use imported topic, with a fallback
    const totalQuestions = configuredNumQuestions || 6; // Use imported topic, with a fallback
    const today = new Date().toISOString().split('T')[0];
    const generatedQuestions = await generateQuizQuestionsNode(quizTopic, totalQuestions);

    if (generatedQuestions) {
        console.log("\n--- Generated Quiz Questions (Parsed) ---");
        const today = new Date().toISOString().split('T')[0];
        const quizFileName = `quiz-${quizTopic.toLowerCase().replace(/\s+/g, '-')}-${today}`;

        //const quizFileContent = `const quizName = "${quizTopic} Quiz - ${today}";\nconst quizData = ${JSON.stringify({ questions: generatedQuestions }, null, 4)};`;
        const quizFileContent = `const quizName = "${quizTopic} Quiz";\nconst quizData = ${JSON.stringify({ questions: generatedQuestions }, null, 4)};`; // Date removed from quizName variable in JS


        const finalJsDirectory = path.resolve(__dirname, '..', 'js', 'generated-quizzes');
        const finalJsFilePath = path.join(finalJsDirectory, `${quizFileName}.js`);

        await fs.mkdir(finalJsDirectory, { recursive: true });
        await fs.writeFile(finalJsFilePath, quizFileContent);
        console.log(`Quiz data saved to ${finalJsFilePath}`);


        console.log("\n--- JS File Content ---");
        console.log(quizFileContent);

        // --- Generate HTML File from Template ---
        //const htmlQuizTitle = `${quizTopic} Quiz - ${today}`;
        //const htmlFileName = `${quizTopic.toLowerCase().replace(/\s+/g, '-')}-${today}-quiz.html`;
        const htmlQuizTitle = `${quizTopic}`; // Date removed from display title
        const htmlFileName = `${quizTopic.toLowerCase().replace(/\s+/g, '-')}-${today}-quiz.html`; // Date kept in HTML filename

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

        // --- Update Quiz Manifest ---
        await updateQuizManifest(htmlQuizTitle, htmlFilePath);


        // --- Run Git Commands ---
        // Construct paths relative to the Git repository root for `git add`
        // Assuming docs/src/index.js, so ../js/... and ../system-design/...
        const gitJsFilePath = path.join('docs', 'js', 'generated-quizzes', `${quizFileName}.js`);
        const gitHtmlFilePath = path.join('docs', 'system-design', htmlFileName);
        const manifestGitPath = path.join('docs', 'js', 'quiz-manifest.js'); // Relative to repo root
        const commitMessage = `feat: Add new quiz on '${quizTopic}' for ${today}`;

        runGitCommands(commitMessage, [gitJsFilePath, gitHtmlFilePath, manifestGitPath]);


        // --- Post to LinkedIn ---
        /*console.log("\n--- Attempting to Post to LinkedIn ---");
        if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
            console.warn("LinkedIn Client ID or Secret not configured. Skipping LinkedIn post.");
        } else {
            let currentAccessToken = LINKEDIN_ACCESS_TOKEN;

            if (!currentAccessToken && LINKEDIN_REFRESH_TOKEN) {
                console.log("No initial access token, attempting refresh...");
                currentAccessToken = await refreshLinkedInAccessToken();
            } else if (!currentAccessToken && !LINKEDIN_REFRESH_TOKEN) {
                console.warn("No LinkedIn Access or Refresh Token. Please perform initial OAuth flow. Skipping LinkedIn post.");
                return; // Exit if no way to get a token
            }

            if (currentAccessToken) {
                let authorUrn = await getLinkedInUserUrn(currentAccessToken);

                if (authorUrn === 'EXPIRED_TOKEN' && LINKEDIN_REFRESH_TOKEN) {
                    console.log("Access token expired fetching URN. Attempting refresh...");
                    currentAccessToken = await refreshLinkedInAccessToken();
                    if (currentAccessToken) {
                        authorUrn = await getLinkedInUserUrn(currentAccessToken);
                    }
                }

                if (authorUrn && authorUrn !== 'EXPIRED_TOKEN') {
                    const githubUsername = process.env.GITHUB_USERNAME || "your-github-username"; // Set GITHUB_USERNAME in .env
                    const repoName = process.env.GITHUB_REPONAME || "Linkedin-Quizes"; // Set GITHUB_REPONAME in .env
                    const publicQuizPath = gitHtmlFilePath.startsWith('docs/') ? gitHtmlFilePath.substring(5) : gitHtmlFilePath;
                    const quizUrl = `https://${githubUsername}.github.io/${repoName}/${publicQuizPath}`;
                    const postText = `🚀 New Quiz Alert! 🚀\n\nCheck out today's quiz on "${htmlQuizTitle}"! Test your knowledge and see how you score.\n\n${quizUrl}\n\n#Quiz #${quizTopic.replace(/\s+/g, '')} #TechQuiz #DailyChallenge`;

                    const postStatus = await createLinkedInPost(currentAccessToken, authorUrn, postText, quizUrl, htmlQuizTitle);
                    if (postStatus === 'EXPIRED_TOKEN_ON_POST' && LINKEDIN_REFRESH_TOKEN) {
                        console.log("Access token expired during post. Attempting refresh and retry...");
                        currentAccessToken = await refreshLinkedInAccessToken();
                        if (currentAccessToken) {
                           await createLinkedInPost(currentAccessToken, authorUrn, postText, quizUrl, htmlQuizTitle);
                        }
                    }
                } else {
                    console.error("Failed to obtain LinkedIn User URN or token still expired. Skipping post.");
                }
            } else {
                console.error("Failed to obtain LinkedIn Access Token. Skipping post.");
            }
        }*/
        const githubUsername = process.env.GITHUB_USERNAME || "dindina"; // Set GITHUB_USERNAME in .env
        const repoName = process.env.GITHUB_REPONAME || "Linkedin-Quizes"; // Set GITHUB_REPONAME in .env
        const publicQuizPath = gitHtmlFilePath.startsWith('docs/') ? gitHtmlFilePath.substring(5) : gitHtmlFilePath;
        const quizUrl = `https://${githubUsername}.github.io/${repoName}/${publicQuizPath}`;
        const postText = `🚀 New Quiz Alert! 🚀\n\nCheck out today's quiz on "${htmlQuizTitle}"! Test your knowledge and see how you score.\n\n${quizUrl}\n\n#Quiz #${quizTopic.replace(/\s+/g, '')} #TechQuiz #DailyChallenge`;
        console.log(postText)

    } else {
        console.log("Failed to generate quiz questions.");
    }
}
main();
