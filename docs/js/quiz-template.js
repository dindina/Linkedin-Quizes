// --- State for Adaptive Quiz ---
let questionPools = { 1: [], 2: [], 3: [] }; // Easy, Medium, Hard
let answeredQuestionIds = new Set();
let currentSkillLevel = 2; // Start at Medium difficulty
let currentQuestion = null;
let totalQuestions = 0;
let questionsAnsweredCount = 0;

// --- General Quiz State ---
let userAnswers = {}; // Use an object to store answers by question ID
let score = 0;
let quizCompleted = false;

// --- DOM Elements ---
const quizArea = document.getElementById('quiz-area');
const resultsArea = document.getElementById('results-area');
const progressIndicator = document.getElementById('progress-indicator');
const questionDisplay = document.getElementById('question-display');
const answerOptionsContainer = document.getElementById('answer-options-container');
const hintToggleBtn = document.getElementById('hint-toggle-btn');
const hintContent = document.getElementById('hint-content');
const hintToggleText = hintToggleBtn ? hintToggleBtn.querySelector('span:first-child') : null;
const hintToggleArrow = hintToggleBtn ? hintToggleBtn.querySelector('.hint-arrow') : null;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreDisplay = document.getElementById('final-score');
const reviewedAnswersContainer = document.getElementById('reviewed-answers');
const reviewRestartBtn = document.getElementById('review-restart-btn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeQuiz() {
    // Reset all state for a new quiz run
    questionPools = { 1: [], 2: [], 3: [] };
    answeredQuestionIds = new Set();
    currentSkillLevel = 2;
    currentQuestion = null;
    questionsAnsweredCount = 0;
    userAnswers = {};
    score = 0;
    quizCompleted = false;

    totalQuestions = quizData.questions.length;

    // Populate question pools based on difficulty
    quizData.questions.forEach((q, index) => {
        q.id = index; // Assign a unique ID to each question
        const difficulty = q.difficulty || 2; // Default to medium if not specified
        if (questionPools[difficulty]) {
            questionPools[difficulty].push(q);
        }
    });

    // Shuffle each difficulty pool to randomize question order within a level
    Object.values(questionPools).forEach(pool => shuffleArray(pool));

    // Get the first question and render it
    currentQuestion = getNextQuestion();
    if (currentQuestion) {
        renderQuestion(currentQuestion);
    } else {
        console.error("No questions available to start the quiz.");
        progressIndicator.textContent = "No questions found for this quiz.";
    }
}

function getNextQuestion() {
    // Try to find an unanswered question at the current skill level
    let pool = questionPools[currentSkillLevel] || [];
    let nextQuestion = pool.find(q => !answeredQuestionIds.has(q.id));

    // If no questions at current level, try other levels (e.g., easier, then harder)
    if (!nextQuestion) {
        const levelsToTry = [currentSkillLevel - 1, currentSkillLevel + 1].filter(l => l >= 1 && l <= 3);
        for (const level of levelsToTry) {
            pool = questionPools[level] || [];
            nextQuestion = pool.find(q => !answeredQuestionIds.has(q.id));
            if (nextQuestion) break;
        }
    }

    // If still no question, grab any unanswered question from any pool
    if (!nextQuestion) {
        for (const level in questionPools) {
            nextQuestion = questionPools[level].find(q => !answeredQuestionIds.has(q.id));
            if (nextQuestion) break;
        }
    }

    return nextQuestion;
}

function renderQuestion(question) {
    progressIndicator.textContent = `Question ${questionsAnsweredCount + 1} of ${totalQuestions}`;
    if (hintContent) {
        hintContent.textContent = question.hint;
    }
    resetHintState();

    questionDisplay.textContent = question.question;
    answerOptionsContainer.innerHTML = '';

    // Shuffle answer options only if the quiz is not completed
    const optionsToRender = quizCompleted ? question.answerOptions : [...question.answerOptions];
    if (!quizCompleted) {
        shuffleArray(optionsToRender);
    }

    optionsToRender.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.innerHTML = `
            <input type="radio" name="answer" id="option-${index}" value="${index}" class="form-radio h-5 w-5 text-blue-600">
            <label for="option-${index}" class="ml-2 flex-grow text-lg">${option.text}</label>
        `;

        const radioInput = optionDiv.querySelector('input[type="radio"]');
        radioInput.id = `q${question.id}-option-${index}`; // Unique ID for each radio button
        optionDiv.querySelector('label').htmlFor = `q${question.id}-option-${index}`; // Link label to unique ID

        if (userAnswers[question.id] && userAnswers[question.id].selectedIndex === index) {
            radioInput.checked = true;
            optionDiv.classList.add('selected');
        }

        if (quizCompleted) {
            radioInput.disabled = true; // Disable radios in review mode
            if (option.isCorrect) {
                optionDiv.classList.add('correct');
            } else if (userAnswers[question.id] && userAnswers[question.id].selectedIndex === index && !option.isCorrect) {
                optionDiv.classList.add('incorrect');
            }
            const rationaleText = document.createElement('p');
            rationaleText.className = 'rationale-text';
            rationaleText.textContent = option.rationale;
            optionDiv.appendChild(rationaleText);
        } else {
            optionDiv.addEventListener('click', () => {
                selectAnswer(question, index);
            });
            radioInput.addEventListener('change', () => {
                selectAnswer(question, index);
            });
        }
        answerOptionsContainer.appendChild(optionDiv);
    });

    updateNavigationButtons();
}

function selectAnswer(question, selectedIndex) {
    // Find the original option based on text, as index might change due to shuffle
    const selectedLabelText = answerOptionsContainer.children[selectedIndex].querySelector('label').textContent;
    const selectedOption = question.answerOptions.find(opt => opt.text === selectedLabelText);

    userAnswers[question.id] = {
        selectedIndex: selectedIndex, // This index is relative to the potentially shuffled options displayed
        isCorrect: selectedOption.isCorrect,
        questionText: currentQuestion.question,
        selectedAnswerText: selectedOption.text,
        correctAnswerText: currentQuestion.answerOptions.find(opt => opt.isCorrect).text,
        rationale: selectedOption.rationale // Rationale of the selected option
    };

    // Remove 'selected' class from all options
    document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
    // Add 'selected' class to the clicked option
    answerOptionsContainer.children[selectedIndex].classList.add('selected');
}

function updateNavigationButtons() {
    prevBtn.style.display = 'none'; // 'Previous' button is complex with adaptive logic, so we disable it.
    nextBtn.style.display = questionsAnsweredCount < totalQuestions - 1 && !quizCompleted ? 'inline-block' : 'none';
    submitBtn.style.display = questionsAnsweredCount === totalQuestions - 1 && !quizCompleted ? 'inline-block' : 'none';
    restartBtn.style.display = quizCompleted ? 'inline-block' : 'none';

    if (quizCompleted) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }
}

function calculateScore() {
    score = Object.values(userAnswers).filter(answer => answer && answer.isCorrect).length;
}

function showResults() {
    quizCompleted = true;
    calculateScore();
    quizArea.style.display = 'none';
    resultsArea.style.display = 'block';
    finalScoreDisplay.textContent = `You scored ${score} out of ${totalQuestions}!`;

    reviewedAnswersContainer.innerHTML = '';
    quizData.questions.forEach((question, qIndex) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer ? userAnswer.isCorrect : false;
        const answeredText = userAnswer ? userAnswer.selectedAnswerText : "Not answered";
        const correctAnswerOriginal = question.answerOptions.find(opt => opt.isCorrect);
        const correctAnswerText = correctAnswerOriginal.text;
        const correctRationale = correctAnswerOriginal.rationale;


        const questionReviewDiv = document.createElement('div');
        questionReviewDiv.className = `p-4 rounded-lg shadow-sm ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`;
        questionReviewDiv.innerHTML = `
            <p class="font-semibold mb-2 text-gray-800">Question ${qIndex + 1}: ${question.question}</p>
            <p class="text-gray-600">Your Answer: <span class="${isCorrect ? 'text-green-700' : 'text-red-700 font-semibold'}">${answeredText}</span></p>
            ${!isCorrect ? `<p class="text-gray-600">Correct Answer: <span class="text-green-700 font-semibold">${correctAnswerText}</span></p>` : ''}
            <p class="rationale-text mt-2">${userAnswer ? (userAnswer.isCorrect ? userAnswer.rationale : correctRationale) : correctRationale}</p>
        `;
        // If the user answered correctly, show their selected rationale.
        // If they answered incorrectly, show the rationale for the correct answer.
        // If not answered, show the rationale for the correct answer.
        reviewedAnswersContainer.appendChild(questionReviewDiv);
    });

    // Prepare data for submission to Google Form
    const resultsToSubmit = {
        quiz: quizName,
        score: score,
        totalQuestions: totalQuestions,
        timestamp: new Date().toISOString()
    };
    submitResultsToGoogleForm(resultsToSubmit);
}


async function submitResultsToGoogleForm(data) {
    const googleFormId = "1FAIpQLSeXUwoByGIq5UxbSChZPHMnOWeoTDyHPFfUGdqZEPKY5CUohQ";
    const entryIdQuiz = "entry.409572363";
    const entryIdScore = "entry.1919703662";
    const entryIdTotalQuestions = "entry.152766744";
    const entryIdTimestamp = "entry.1892249807";

    const formData = new FormData();
    formData.append(entryIdQuiz, data.quiz);
    formData.append(entryIdScore, data.score);
    formData.append(entryIdTotalQuestions, data.totalQuestions);
    const dateFromISO = new Date(data.timestamp); // data.timestamp is expected to be an ISO string
    const year = dateFromISO.getFullYear();
    const month = String(dateFromISO.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateFromISO.getDate()).padStart(2, '0');
    const hours = String(dateFromISO.getHours()).padStart(2, '0');
    const minutes = String(dateFromISO.getMinutes()).padStart(2, '0');
    const formattedTimestamp = `${year}-${month}-${day}+${hours}:${minutes}`;
    formData.append(entryIdTimestamp, formattedTimestamp);

    const url = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;

    try {
        await fetch(url, {
            method: "POST",
            mode: "no-cors", // Important: Google Forms don't support CORS for direct fetch POSTs from other domains.
            // This means your JS won't get a direct success/failure response,
            // but the data should still be submitted.
            body: formData,
        });
        console.log("Quiz results submission attempted. Please check your Google Sheet.");
    } catch (error) {
        // error.body is not accessible with mode: "no-cors"
        console.error("Error attempting to submit quiz results:", error);
    }
}

function resetHintState() {
    if (hintContent && hintToggleBtn && hintToggleText && hintToggleArrow) {
        hintContent.style.display = 'none';
        hintToggleBtn.classList.remove('open');
        hintToggleText.textContent = 'Show Hint';
        hintToggleArrow.innerHTML = '&#9660;'; // Down arrow
    }
}

if (hintToggleBtn) {
    hintToggleBtn.addEventListener('click', () => {
        const isOpen = hintContent.style.display === 'block';
        hintContent.style.display = isOpen ? 'none' : 'block';
        hintToggleBtn.classList.toggle('open', !isOpen);
        hintToggleText.textContent = isOpen ? 'Show Hint' : 'Hide Hint';
        hintToggleArrow.innerHTML = isOpen ? '&#9660;' : '&#9650;'; // Toggle arrow
    });
}


function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(totalQuestions).fill(null);
    score = 0;
    quizCompleted = false;
    quizArea.style.display = 'block';
    resultsArea.style.display = 'none';
    initializeQuiz();
}

function handleNext() {
    if (!currentQuestion || userAnswers[currentQuestion.id] === undefined) {
        // Optional: alert user they must select an answer
        // For now, we allow proceeding without an answer.
    }

    // Adjust skill level based on the last answer
    if (userAnswers[currentQuestion.id]) {
        const isCorrect = userAnswers[currentQuestion.id].isCorrect;
        currentSkillLevel = isCorrect ? Math.min(3, currentSkillLevel + 1) : Math.max(1, currentSkillLevel - 1);
    }

    answeredQuestionIds.add(currentQuestion.id);
    questionsAnsweredCount++;

    if (questionsAnsweredCount >= totalQuestions) {
        showResults();
    } else {
        currentQuestion = getNextQuestion();
        if (currentQuestion) {
            renderQuestion(currentQuestion);
        } else {
            // Should not happen if counts are correct, but as a fallback:
            showResults();
        }
    }
}

nextBtn.addEventListener('click', handleNext);
submitBtn.addEventListener('click', handleNext); // Submit button now also triggers the final 'next' logic
restartBtn.addEventListener('click', restartQuiz);
reviewRestartBtn.addEventListener('click', restartQuiz);

// Initial render
if (typeof quizData !== 'undefined' && quizData.questions && quizData.questions.length > 0) {
    initializeQuiz();
} else {
    if (progressIndicator) progressIndicator.textContent = "Quiz loading or no questions available.";
    console.error("Quiz data is not available or is empty.");
}
