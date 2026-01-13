const questions = [
    {
        question: "Determine the estimated weight of an A-36 steel plate size 3/16 “ x 6’ x 20’",
        options: ["919 lbs", "1012 lbs", "829 lbs", "735 lbs"],
        correct: 0
    },
    {
        question: "The minimum clearance allowed for meshing spur gears with a circular pitch of 0.1571 and diametral pitch of 20. The spur gear has 25 teeth.",
        options: ["0.007855", "0.008578", "0.007558", "0.007585"],
        correct: 0
    },
    {
        question: "A 3”φ diameter short shaft carrying two pulleys close to the bearings transmit how much horsepower if the shaft makes 280 rpm?",
        options: ["199 Hp", "198 Hp", "200 Hp", "210 Hp"],
        correct: 0
    },
    {
        question: "What pressure is required to punch a hole 2” diameter through a ¼” steel plate?",
        options: ["10 tons", "20 tons", "30 tons", "40 tons"],
        correct: 3
    },
    {
        question: "Compute the working strength of 1” bolt which is screwed up tightly in packed joint when the allowable working stress is 13,000 psi.",
        options: ["3600 lbs", "3950 lbs", "3900 lbs", "3800 lbs"],
        correct: 2
    },
    {
        question: "What is the working strength of a 2” bolt which is screwed up tightly in a packed joint when the allowable working stress 12,000 psi?",
        options: ["20,120 lbs", "20,400 lbs", "20.400 lbs", "20,200 lbs"],
        correct: 2
    },
    {
        question: "Compute the speed of the gear mounted on a 52.5 mm diameter shaft receiving power from a driving motor with 250 hp.",
        options: ["2182 rpm", "2071 rpm", "2282 rpm", "2341 rpm"],
        correct: 2
    },
    {
        question: "The minimum whole depth of spur gear of 14-1/2 deg. involute type with diameter pitch of 24 and circular pitch of 0.1309:",
        options: ["0.09000", "0.09900", "0.089875", "0.089758"],
        correct: 2
    },
    {
        question: "Heating of the metal to a temperature above the critical temperature and then cooling slowly usually in the furnace to reduce the hardness and improve the machinability is called:",
        options: ["annealing", "tempering", "normalizing", "quenching"],
        correct: 0
    },
    {
        question: "What is the frictional HP acting on a collar loaded with 100 kg weight? The collar has an outside diameter of 100 mm and an internal diameter of 40mm. The collar rotates at 1000 rpm and the coefficient of friction between the collar and the pivot surface is 0.15.",
        options: ["0.8 HP", "0.5 HP", "0.3 HP", "1.2 HP"],
        correct: 0
    },
    {
        question: "A solid cylindrical shaft 48.2 cm long is used for a transmission of mechanical power at a rate of 37 KW running at 1760 rpm. The Ss is 8.13 MPa. Calculate the diameter",
        options: ["30 mm", "35 mm", "40 mm", "50 mm"],
        correct: 3
    },
    {
        question: "An internal gear is set up with a 5-in diameter pinion and center distance of 18 inches. Find the diameter of the internal gear.",
        options: ["36”", "21.5”", "26”", "41”"],
        correct: 3
    },
    {
        question: "What force P is required to punch a ½ in. hole on a 3/8 in. thick plate if the ultimate shear strength of the plate is 42,000 psi?",
        options: ["24,940 lbs", "24,620 lbs", "24,960 lbs", "24,740 lbs"],
        correct: 3
    },
    {
        question: "A 2.5” diameter by 2 in. long journal bearing is to carry a 5500-lb load at 3600 rpm using SAE 40 lube oil at 200°F through a single hole at 25 psi. Compute the bearing pressure.",
        options: ["1100 psi", "900 psi", "1000 psi", "950 psi"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizBody = document.getElementById('quiz-body');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const questionCountSpan = document.getElementById('question-count');
const resultContainer = document.getElementById('result-container');
const quizHeader = document.querySelector('.quiz-header');
const quizFooter = document.querySelector('.quiz-footer');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
    updateProgress();
}

function showQuestion(questionData) {
    // Clear previous content
    quizBody.innerHTML = '';
    nextBtn.disabled = true;

    // Create Question Element
    const questionEl = document.createElement('h2');
    questionEl.innerHTML = `${currentQuestionIndex + 1}. ${questionData.question}`;
    quizBody.appendChild(questionEl);

    // Create Options Container
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options-list');

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerHTML = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(button, index));
        optionsDiv.appendChild(button);
    });

    quizBody.appendChild(optionsDiv);

    // Update footer info
    questionCountSpan.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectOption(selectedButton, selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');

    // Disable all buttons after selection
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        // Highlight the correct answer
        buttons[currentQuestion.correct].classList.add('correct');
    }

    nextBtn.disabled = false;
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    updateProgress();

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
});

function showResults() {
    quizBody.classList.add('hidden');
    quizFooter.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    // 100% progress
    progressBar.style.width = '100%';

    const percentage = (score / questions.length) * 100;
    let message = '';

    if (percentage === 100) {
        message = "Perfect Score! You're a genius! 🎉";
    } else if (percentage >= 50) {
        message = "Good job! Keep practicing. 👍";
    } else {
        message = "Better luck next time. Don't give up! 💪";
    }

    resultContainer.innerHTML = `
        <div class="score-display">${score} / ${questions.length}</div>
        <p class="result-msg">${message}</p>
        <button class="btn primary-btn" onclick="location.reload()">Restart Quiz</button>
    `;
}

// Initialize
startQuiz();
