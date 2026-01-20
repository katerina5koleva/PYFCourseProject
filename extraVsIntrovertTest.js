document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const quizHeader = document.querySelector('.quiz-header');
    const quizBody = document.querySelector('.quiz-body');
    const resultContainer = document.querySelector('.result-container');
    const questionElement = document.getElementById('question');
    const currentQuestionElement = document.getElementById('current');
    const totalQuestionsElement = document.getElementById('total');
    const submitButton = document.getElementById('submit');
    const restartButton = document.getElementById('restart');
    const finalScoreElement = document.getElementById('final-score');
    const finalScoreMessageElement = document.getElementById('final-score-message');

    const answerElements = [
        { radio: document.getElementById('answer1'), label: document.getElementById('a1_text') },
        { radio: document.getElementById('answer2'), label: document.getElementById('a2_text') },
        { radio: document.getElementById('answer3'), label: document.getElementById('a3_text') },
        { radio: document.getElementById('answer4'), label: document.getElementById('a4_text') }
    ];

    const questions = [
        {
            question: "Как предпочитате да прекарвате свободното си време?",
            answers: [
                { text: " Самостоятелно с книги или хобита", score: 0 },
                { text: " С 1-2 близки приятели", score: 5 },
                { text: " В малка група от познати", score: 15 },
                { text: " На голямо събиране с много хора", score: 20 }
            ]
        },
        {
            question: "Как се чувствате след интензивна социална активност?",
            answers: [
                { text: " Изтощен, нуждая се от време сам", score: 0 },
                { text: " Леко изтощен, но доволен", score: 5 },
                { text: " Зареден с енергия за известно време", score: 15 },
                { text: " Пълнен с енергия, готов за още", score: 20 }
            ]
        },
        {
            question: "Как обикновено вземате решения?",
            answers: [
                { text: " Размислям дълго самостоятелно", score: 0 },
                { text: " Мисля сам, но се съветвам с някой близък", score: 5 },
                { text: " Обсъждам с други, но решавам сам", score: 15 },
                { text: " Предпочитам групови дискусии и мнения", score: 20 }
            ]
        },
        {
            question: "Как реагирате на нови социални ситуации?",
            answers: [
                { text: " Предпочитам да наблюдавам отстрани", score: 5 },
                { text: " Присъединявам се след като се запозная с обстановката", score: 10 },
                { text: " Започвам разговор с някой, който изглежда приятелски", score: 15 },
                { text: " Аз съм този, който започва разговорите", score: 20 }
            ]
        },
        {
            question: "Къде черпите енергия?",
            answers: [
                { text: " В уединение и тихи моменти", score: 5 },
                { text: " В балансирани условия, и сам, и с хора", score: 10 },
                { text: " От интеракция с хора, но и нуждая се от време сам", score: 15 },
                { text: " От общуване и взаимодействие с хора", score: 20 }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let totalScore = 0;

    totalQuestionsElement.textContent = questions.length.toString();

    startButton.addEventListener('click', startQuiz);
    submitButton.addEventListener('click', submitAnswer);
    restartButton.addEventListener('click', restartQuiz);

    function startQuiz() {
        startScreen.classList.add('hide');
        quizHeader.classList.remove('hide');
        quizBody.classList.remove('hide');
        updateButtonText();
        showQuestion();
    }

    function showQuestion() {
        currentQuestionElement.textContent = (currentQuestionIndex + 1).toString();
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        for (let i = 0; i < 4; i++) {
            answerElements[i].label.textContent = `${String.fromCharCode(1040 + i)})${currentQuestion.answers[i].text}`;
            answerElements[i].radio.checked = false;
        }
        updateButtonText();
    }

    function updateButtonText() {
        if (currentQuestionIndex === questions.length - 1) {
            submitButton.textContent = "Завърши теста";
        } else {
            submitButton.textContent = "Следващ въпрос";
        }
    }

    function submitAnswer() {
        let selectedAnswerIndex = -1;
        for (let i = 0; i < 4; i++) {
            if (answerElements[i].radio.checked) {
                selectedAnswerIndex = i;
                break;
            }
        }

        if (selectedAnswerIndex === -1) {
            alert("Моля, изберете отговор преди да продължите!");
            return;
        }

        const selectedAnswer = questions[currentQuestionIndex].answers[selectedAnswerIndex];
        totalScore += selectedAnswer.score;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizHeader.classList.add('hide');
        quizBody.classList.add('hide');
        resultContainer.classList.remove('hide');

        finalScoreElement.textContent = totalScore;

        let personalityType, color;

        if (totalScore >= 0 && totalScore <= 20) {
            personalityType = "Ярко изразен интроверт";
            description = "Предпочитате уединение, дълбоки размишления и тиха обстановка. Намирате енергия в самостоятелни дейности и нуждаете се от значително време за себе си след социални взаимодействия.";
            color = "#2E8B57";
        } else if (totalScore <= 40) {
            personalityType = "Интроверт с амбивертни черти";
            description = "Чувствате се комфортно както сами, така и в малка компания от познати. Имате нужда от баланс между социални взаимодействия и време за себе си.";
            color = "#3CB371";
        } else if (totalScore <= 60) {
            personalityType = "Амбиверт";
            description = "Имате балансирани черти на интровертност и екстровертност. Адаптирате се леко към различни социални ситуации и чувствате се комфортно както в групи, така и самостоятелно.";
            color = "#FFA500";
        } else if (totalScore <= 80) {
            personalityType = "Екстроверт с амбивертни черти";
            description = "Наслаждавате се на социални взаимодействия, но също така цените и времето за себе си. Леко започвате разговори и се чувствате енергизиран от общуването с хора.";
            color = "#FF6347";
        } else {
            personalityType = "Ярко изразен екстроверт";
            description = "Черпите енергия от общуването с хора, обичате социални събития и леко завързвате нови контакти. Предпочитате групови дейности и се чувствате комфортно в центъра на вниманието.";
            color = "#DC143C";
        }

        finalScoreMessageElement.innerHTML = `
            <strong>Тип личност: ${personalityType}</strong><br>
            ${description}<br><br>
        `;
        finalScoreMessageElement.style.color = color;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        totalScore = 0;

        resultContainer.classList.add('hide');
        startScreen.classList.remove('hide');
        showQuestion();
    }
});