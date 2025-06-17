let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.questions.length).fill(null);
let score = 0;
let quizCompleted = false;

const quizArea = document.getElementById('quiz-area');
const resultsArea = document.getElementById('results-area');
const progressIndicator = document.getElementById('progress-indicator');
const hintDisplay = document.getElementById('hint-display');
const questionDisplay = document.getElementById('question-display');
const answerOptionsContainer = document.getElementById('answer-options-container');
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

function renderQuestion() {
    if (currentQuestionIndex < 0 || currentQuestionIndex >= quizData.questions.length) {
        return;
    }

    const question = quizData.questions[currentQuestionIndex];

    progressIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.questions.length}`;
    hintDisplay.textContent = `Hint: ${question.hint}`;
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
        radioInput.id = `q${currentQuestionIndex}-option-${index}`; // Unique ID for each radio button
        optionDiv.querySelector('label').htmlFor = `q${currentQuestionIndex}-option-${index}`; // Link label to unique ID

        if (userAnswers[currentQuestionIndex] !== null && userAnswers[currentQuestionIndex].selectedIndex === index) {
            radioInput.checked = true;
            optionDiv.classList.add('selected');
        }

        if (quizCompleted) {
            radioInput.disabled = true; // Disable radios in review mode
            if (option.isCorrect) {
                optionDiv.classList.add('correct');
            } else if (userAnswers[currentQuestionIndex] !== null && userAnswers[currentQuestionIndex].selectedIndex === index && !option.isCorrect) {
                optionDiv.classList.add('incorrect');
            }
            const rationaleText = document.createElement('p');
            rationaleText.className = 'rationale-text';
            rationaleText.textContent = option.rationale;
            optionDiv.appendChild(rationaleText);
        } else {
            optionDiv.addEventListener('click', () => {
                selectAnswer(index);
            });
            radioInput.addEventListener('change', () => {
                selectAnswer(index);
            });
        }
        answerOptionsContainer.appendChild(optionDiv);
    });

    updateNavigationButtons();
}

function selectAnswer(selectedIndex) {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    // Ensure optionsToRender is correctly mapped back to original answerOptions if shuffled
    // This requires finding the original option based on text, as index might change due to shuffle
    const selectedLabelText = answerOptionsContainer.children[selectedIndex].querySelector('label').textContent;
    const selectedOption = currentQuestion.answerOptions.find(opt => opt.text === selectedLabelText);


    userAnswers[currentQuestionIndex] = {
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
    prevBtn.style.display = currentQuestionIndex > 0 && !quizCompleted ? 'inline-block' : 'none';
    nextBtn.style.display = currentQuestionIndex < quizData.questions.length - 1 && !quizCompleted ? 'inline-block' : 'none';
    submitBtn.style.display = currentQuestionIndex === quizData.questions.length - 1 && !quizCompleted ? 'inline-block' : 'none';
    restartBtn.style.display = quizCompleted ? 'inline-block' : 'none';

    if (quizCompleted) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }
}

function calculateScore() {
    score = userAnswers.filter(answer => answer && answer.isCorrect).length;
}

function showResults() {
    quizCompleted = true;
    calculateScore();
    quizArea.style.display = 'none';
    resultsArea.style.display = 'block';
    finalScoreDisplay.textContent = `You scored ${score} out of ${quizData.questions.length}!`;

    reviewedAnswersContainer.innerHTML = '';
    quizData.questions.forEach((question, qIndex) => {
        const userAnswer = userAnswers[qIndex];
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
        quiz:quizName,
        score: score,
        totalQuestions: quizData.questions.length,
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



function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.questions.length).fill(null);
    score = 0;
    quizCompleted = false;
    quizArea.style.display = 'block';
    resultsArea.style.display = 'none';
    renderQuestion();
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
});

submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);
reviewRestartBtn.addEventListener('click', restartQuiz);

// Initial render
renderQuestion();
