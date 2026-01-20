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
        {radio: document.getElementById('answer1'), label: document.getElementById('a1_text')},
        {radio: document.getElementById('answer2'), label: document.getElementById('a2_text')},
        {radio: document.getElementById('answer3'), label: document.getElementById('a3_text')},
        {radio: document.getElementById('answer4'), label: document.getElementById('a4_text')}
    ];

    const questions = [
        {
            question: "Колко често се чувствахте обезпокоени или неспокойни през последния месец?",
            answers: [
                {text: " Почти никога", score: 0},
                {text: " Понякога", score: 5},
                {text: " Често", score: 15},
                {text: " Почти всеки ден", score: 20}
            ]
        },
        {
            question: "Как се справяте с трудни ситуации?",
            answers: [
                {text: " Спокойно и рационално", score: 0},
                {text: " С леко притеснение, но се справям", score: 5},
                {text: " Чувствам се претоварен, но успявам", score: 15},
                {text: " Изпитвам паника и трудно се справям", score: 20}
            ]
        },
        {
            question: "Колко добре спите през нощта?",
            answers: [
                {text: " Отлично, не се пробуждам", score: 0},
                {text: " Добре, но се пробуждам понякога", score: 5},
                {text: " Трудно заспивам или се пробуждам често", score: 15},
                {text: " Будя се с умора/безсъние", score: 20}
            ]
        },
        {
            question: "Как се чувствате по отношение на работата/учебните си задължения?",
            answers: [
                {text: " Задоволен и мотивиран", score: 0},
                {text: " Леко натоварен", score: 5},
                {text: " Претоварен и стресан", score: 15},
                {text: " Нямам енергия и мотивация", score: 20}
            ]
        },
        {
            question: "Колко често изпитвате физически симптоми на стрес (главоболие, напрежение в мускулите и др.)?",
            answers: [
                {text: " Почти никога", score: 0},
                {text: " Рядко", score: 5},
                {text: " Понякога", score: 15},
                {text: " Често", score: 20}
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

            let stressLevel, message, color;

            if (totalScore >= 0 && totalScore <= 25) {
                stressLevel = "Много ниско";
                message = "Имате отличен контрол върху стреса. Продължавайте да поддържате здравословни навици!";
                color = "green";
            } else if (totalScore <= 50) {
                stressLevel = "Умерено";
                message = "Имате нормално ниво на стрес. Обърнете внимание на релаксацията и почивката.";
                color = "#FFC107"; // жълто вместо "yellow"
            } else if (totalScore <= 75) {
                stressLevel = "Високо";
                message = "Нивото на стрес е повишено. Препоръчва се да намерите начини за релакс и да се консултирате със специалист, ако продължи.";
                color = "orange";
            } else {
                stressLevel = "Много високо";
                message = "Нивото на стрес е много високо. Препоръчва се незабавна консултация със специалист и намиране на начини за намаляване на стреса.";
                color = "red";
            }

            finalScoreMessageElement.innerHTML = `<strong>Ниво на стрес: ${stressLevel}</strong><br>${message}`;
            finalScoreMessageElement.style.color = color;

            const psychologistSection = document.getElementById('psychologist-section');
            if (totalScore > 50) { // Променете на > 75 ако предпочитате
                psychologistSection.classList.remove('hide');
            } else {
                psychologistSection.classList.add('hide');
            }

            console.log(`Тест завършен! Резултат: ${totalScore}/100`);
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            totalScore = 0;

            resultContainer.classList.add('hide');
            startScreen.classList.remove('hide');
            showQuestion();
        }
    })