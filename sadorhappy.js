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
    const blogBtn = document.getElementById('blog-btn');

    const answerElements = [
        { radio: document.getElementById('answer1'), label: document.getElementById('a1_text') },
        { radio: document.getElementById('answer2'), label: document.getElementById('a2_text') },
        { radio: document.getElementById('answer3'), label: document.getElementById('a3_text') },
        { radio: document.getElementById('answer4'), label: document.getElementById('a4_text') }
    ];

    // Променени въпроси на тема Щастие/Тъга
    const questions = [
        {
            question: "Как се чувстваш, когато се събудиш сутрин?",
            answers: [
                { text: " Изпълнен с енергия и желание за деня", score: 20 },
                { text: " Спокоен и в нормално настроение", score: 15 },
                { text: " Малко уморен и без особен ентусиазъм", score: 5 },
                { text: " Подтиснат и не искам да ставам", score: 0 }
            ]
        },
        {
            question: "Колко често намираш причина да се усмихнеш искрено през деня?",
            answers: [
                { text: " Постоянно, дори за малки неща", score: 20 },
                { text: " Няколко пъти на ден", score: 15 },
                { text: " Рядко, по-скоро по задължение", score: 5 },
                { text: " Почти никога напоследък", score: 0 }
            ]
        },
        {
            question: "Как се чувстваш, когато си сам със своите мисли?",
            answers: [
                { text: " Щастлив и удовлетворен", score: 20 },
                { text: " Балансиран и спокоен", score: 15 },
                { text: " Тревожен и леко тъжен", score: 5 },
                { text: " Много самотен и нещастен", score: 0 }
            ]
        },
        {
            question: "Как оценяваш енергията и мотивацията си напоследък?",
            answers: [
                { text: " Много високи, готов съм за нови предизвикателства", score: 20 },
                { text: " Стабилни, справям се добре", score: 15 },
                { text: " Ниски, чувствам се постоянно изтощен", score: 5 },
                { text: " Нямам никаква воля за нищо", score: 0 }
            ]
        },
        {
            question: "Как виждаш бъдещето си в момента?",
            answers: [
                { text: " С голям оптимизъм и вълнение", score: 20 },
                { text: " С умерена увереност", score: 15 },
                { text: " Със страх и несигурност", score: 5 },
                { text: " Като нещо сиво и безнадеждно", score: 0 }
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
        window.open("psiho.html", "_blank"); });
    blogBtn.addEventListener('click', function() {
        window.open("HorS.html", "_blank"); });

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

        let state, message, color;

        if (totalScore >= 80) {
            state = "Много щастлив";
            message = "Ти излъчваш позитивизъм! Продължавай да споделяш тази радост със света.";
            color = "#00b894";
        } else if (totalScore >= 50) {
            state = "Емоционален баланс";
            message = "Ти си в хармония със себе си. Намираш добрия баланс в ежедневието.";
            color = "#6c5ce7";
        } else if (totalScore >= 25) {
            state = "Лека тъга / Меланхолия";
            message = "Нормално е понякога да се чувстваме по-ниско. Подари си време за любимо хоби.";
            color = "orange";
        } else {
            state = "Дълбока тъга";
            message = "Преминаваш през труден период. Не се притеснявай да потърсиш подкрепа от близък човек.";
            color = "#e63946";
        }

        finalScoreMessageElement.innerHTML = `<strong>Твоето състояние: ${state}</strong><br>${message}`;
        finalScoreMessageElement.style.color = color;

        const psychoContainer = document.getElementById('psycho-container');
        if (totalScore < 50) { // Променете на > 75 ако предпочитате
            psychoContainer.classList.remove('hide');
        } else {
            psychoContainer.classList.add('hide');
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
});