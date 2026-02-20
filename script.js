const questions = [
  // ===== BEGINNER =====
  {
    question: "What does 'phishing' usually involve?",
    options: [
      "Catching fish online",
      "Tricking users into revealing sensitive information",
      "Improving internet speed",
      "Blocking viruses"
    ],
    answer: 1,
    level: "beginner"
  },
  {
    question: "Which of the following is the strongest password?",
    options: [
      "password123",
      "12345678",
      "MyName",
      "T9#kL2!pQ7"
    ],
    answer: 3,
    level: "beginner"
  },
  {
    question: "What should you do before clicking a suspicious link?",
    options: [
      "Click immediately",
      "Ignore security warnings",
      "Verify the sender and URL",
      "Forward it to everyone"
    ],
    answer: 2,
    level: "beginner"
  },
  {
    question: "Antivirus software is mainly used to:",
    options: [
      "Speed up games",
      "Protect against malware",
      "Increase storage",
      "Improve graphics"
    ],
    answer: 1,
    level: "beginner"
  },
  {
    question: "Public Wi-Fi is generally:",
    options: [
      "Always safe",
      "More secure than home Wi-Fi",
      "Potentially unsafe",
      "Faster and protected"
    ],
    answer: 2,
    level: "beginner"
  },

  // ===== INTERMEDIATE =====
  {
    question: "What does 2FA stand for?",
    options: [
      "Two-Factor Authentication",
      "Two File Access",
      "Second Firewall Access",
      "Two Form Authorization"
    ],
    answer: 0,
    level: "intermediate"
  },
  {
    question: "Which attack involves overwhelming a server with traffic?",
    options: [
      "Phishing",
      "DDoS attack",
      "Brute force",
      "Spyware"
    ],
    answer: 1,
    level: "intermediate"
  },
  {
    question: "HTTPS in a website URL indicates:",
    options: [
      "The site is always virus-free",
      "Encrypted communication",
      "Free internet access",
      "Faster loading speed"
    ],
    answer: 1,
    level: "intermediate"
  },
  {
    question: "Which of the following is a form of malware?",
    options: [
      "Firewall",
      "Router",
      "Ransomware",
      "Switch"
    ],
    answer: 2,
    level: "intermediate"
  },
  {
    question: "What is social engineering in cybersecurity?",
    options: [
      "Building social media apps",
      "Manipulating people to reveal information",
      "Fixing network cables",
      "Designing websites"
    ],
    answer: 1,
    level: "intermediate"
  },

  // ===== ADVANCED =====
  {
    question: "A brute-force attack attempts to:",
    options: [
      "Physically damage hardware",
      "Guess passwords repeatedly",
      "Encrypt user files",
      "Monitor network traffic"
    ],
    answer: 1,
    level: "advanced"
  },
  {
    question: "What is the primary purpose of a firewall?",
    options: [
      "Increase internet speed",
      "Filter incoming and outgoing traffic",
      "Store passwords",
      "Backup files"
    ],
    answer: 1,
    level: "advanced"
  },
  {
    question: "Zero-day vulnerability refers to:",
    options: [
      "An old fixed bug",
      "A publicly known patch",
      "A newly discovered unpatched flaw",
      "A secure system update"
    ],
    answer: 2,
    level: "advanced"
  },
  {
    question: "Which practice best protects against ransomware?",
    options: [
      "Ignoring updates",
      "Regular data backups",
      "Using weak passwords",
      "Disabling antivirus"
    ],
    answer: 1,
    level: "advanced"
  },
  {
    question: "Principle of least privilege means:",
    options: [
      "Give all users admin access",
      "Users get only the access they need",
      "Disable all accounts",
      "Share passwords"
    ],
    answer: 1,
    level: "advanced"
  }
];

// ===== APP LOGIC (unchanged) =====

let currentLevel = "";
let filteredQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let answered = false;

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

function setLevel(level) {
  currentLevel = level;
  filteredQuestions = questions.filter(q => q.level === level);
  currentQuestion = 0;
  score = 0;

  document.querySelector(".level-select").style.display = "none";
  quizBox.style.display = "block";
  resultBox.style.display = "none";

  loadQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = `⏱ ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function updateProgress() {
  progressText.textContent =
    `Question ${currentQuestion + 1}/${filteredQuestions.length}`;

  const percent =
    ((currentQuestion) / filteredQuestions.length) * 100;
  progressBar.style.width = percent + "%";
}

function loadQuestion() {
  answered = false;
  const q = filteredQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  updateProgress();
  startTimer();

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => selectAnswer(btn, index);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  if (answered) return;
  answered = true;

  clearInterval(timerInterval);

  const correctIndex = filteredQuestions[currentQuestion].answer;
  const buttons = optionsEl.children;

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < filteredQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";

  progressBar.style.width = "100%";

  resultBox.innerHTML = `
    <h2>🏆 Quiz Completed</h2>
    <p>Level: ${currentLevel.toUpperCase()}</p>
    <p>Your Score: ${score} / ${filteredQuestions.length}</p>
  `;
}