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
    const psychoBtn = document.getElementById('psycho-btn');

    const answerElements = [
        { radio: document.getElementById('answer1'), label: document.getElementById('a1_text') },
        { radio: document.getElementById('answer2'), label: document.getElementById('a2_text') },
        { radio: document.getElementById('answer3'), label: document.getElementById('a3_text') },
        { radio: document.getElementById('answer4'), label: document.getElementById('a4_text') }
    ];

    const questions = [
        {
            question: "Как реагирате, когато някой ви прекъсне, докато говорите?",
            answers: [
                { text: " Изчаквам спокойно да приключи", score: 0 },
                { text: " Леко се дразня, но продължавам", score: 5 },
                { text: " Повишавам тон, за да ме чуят", score: 15 },
                { text: " Прекъсвам го грубо или си тръгвам ядосан", score: 20 }
            ]
        },
        {
            question: "Колко често губите търпение при малки закъснения (на опашка, в трафик)?",
            answers: [
                { text: " Почти никога", score: 0 },
                { text: " Рядко, ако бързам много", score: 5 },
                { text: " Често се изнервям видимо", score: 15 },
                { text: " Всеки път избухвам вътрешно или външно", score: 20 }
            ]
        },
        {
            question: "Когато сте ядосани, проявявате ли физическа агресия (блъскане на предмети, викане)?",
            answers: [
                { text: " Никога, контролирам се напълно", score: 0 },
                { text: " Случвало се е много рядко", score: 5 },
                { text: " Понякога повишавам тон силно", score: 15 },
                { text: " Често удрям по масата или крещя", score: 20 }
            ]
        },
        {
            question: "Колко време ви отнема да ви мине яда след спор?",
            answers: [
                { text: " Няколко минути", score: 0 },
                { text: " До час", score: 5 },
                { text: " Няколко часа", score: 15 },
                { text: " Държа го в себе си дни наред", score: 20 }
            ]
        },
        {
            question: "Чувствате ли, че хората около вас често ви „дразнят“ нарочно?",
            answers: [
                { text: " Не, хората са добронамерени", score: 0 },
                { text: " Рядко имам такова усещане", score: 5 },
                { text: " Понякога мисля, че ме провокират", score: 15 },
                { text: " Постоянно се чувствам нападнат от другите", score: 20 }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let totalScore = 0;

    totalQuestionsElement.textContent = questions.length.toString();

    startButton.addEventListener('click', startQuiz);
    submitButton.addEventListener('click', submitAnswer);
    restartButton.addEventListener('click', restartQuiz);
    psychoBtn.addEventListener('click', function () {
        window.location.href = "psiho.html"; });

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
            answerElements[i].label.textContent = `${String.fromCharCode(1040 + i)}) ${currentQuestion.answers[i].text}`;
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

        let level, message, color;

        if (totalScore <= 20) {
            level = "Много ниско";
            message = "Вие сте изключително спокоен и уравновесен човек. Продължавайте в същия дух!";
            color = "#00b894"; // Зелено
        } else if (totalScore <= 50) {
            level = "Умерено";
            message = "Контролирате гнева си добре, но има моменти, в които емоциите ви вземат превес.";
            color = "#ff9248"; // Оранжево
        } else if (totalScore <= 75) {
            level = "Високо";
            message = "Често се ядосвате и това може да вреди на здравето и отношенията ви. Опитайте дихателни упражнения.";
            color = "#e63946"; // Червено
        } else {
            level = "Много високо";
            message = "Нивото ви на гняв е опасно високо. Препоръчва се консултация със специалист за овладяване на емоциите.";
            color = "#c02424"; // Наситено червено
        }

        finalScoreMessageElement.innerHTML = `<strong>Ниво на гняв: ${level}</strong><br>${message}`;
        finalScoreMessageElement.style.color = color;

        const psychologistSection = document.getElementById('psychologist-section');
        if (totalScore > 50) { // Променете на > 75 ако предпочитате
            psychologistSection.classList.remove('hide');
        } else {
            psychologistSection.classList.add('hide');
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        totalScore = 0;
        resultContainer.classList.add('hide');
        startScreen.classList.remove('hide');
    }
});