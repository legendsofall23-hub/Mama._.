
// ==========================================
// MAMA'S LITTLE WORLD 💖
// Complete interactive script
// ==========================================

// ------------------------------------------
// 1. OPENING SCREEN
// ------------------------------------------

const introScreen = document.getElementById("introScreen");
const enterBtn = document.getElementById("enterBtn");

if (introScreen && enterBtn) {
  enterBtn.addEventListener("click", () => {
    introScreen.classList.add("hide");

    setTimeout(() => {
      introScreen.style.display = "none";
    }, 950);
  });
}

// ------------------------------------------
// 2. FLOATING SPARKLES ✨
// ------------------------------------------

function createSparkles() {
  const layer = document.createElement("div");
  layer.className = "sparkle-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  const symbols = ["✨", "✧", "✦", "♡"];

  for (let i = 0; i < 38; i++) {
    const sparkle = document.createElement("span");

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 15 + "s";
    sparkle.style.animationDuration =
      10 + Math.random() * 15 + "s";

    sparkle.style.fontSize =
      10 + Math.random() * 15 + "px";

    layer.appendChild(sparkle);
  }
}

createSparkles();

// ------------------------------------------
// 3. BIRTHDAY COUNTDOWN 🎂
// ------------------------------------------

function updateCountdown() {
  const birthday = new Date("December 21, 2027 00:00:00").getTime();
  const now = Date.now();
  const difference = birthday - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement ||
      !minutesElement || !secondsElement) {
    return;
  }

  if (difference <= 0) {
    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = String(days).padStart(3, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ------------------------------------------
// 4. FRIENDSHIP QUIZ 💖
// ------------------------------------------

const quizQuestions = [
  {
    question: "Who is my special?",
    options: [
      "Jeni",
      "Raksha 💖",
      "Sameer",
      "Nobody"
    ],
    correct: 1
  },
  {
    question: "What matters most in our friendship?",
    options: [
      "Trust",
      "Money",
      "Everything",
      "Nothing"
    ],
    correct: 3
  },
  {
    question: "Who is the main character of this little diary?",
    options: [
      "Ahamed",
      "Sameer",
      "Raksha (Mama 💖🫶)",
      "Jeni"
    ],
    correct: 2
  },
  {
    question: "What makes our memories special?",
    options: [
      "Funny moments",
      "Crazy conversations",
      "Being together",
      "All of these"
    ],
    correct: 3
  },
  {
    question: "What should we always do for each other?",
    options: [
      "Ignore each other",
      "Always support you and be with you",
      "Stop talking",
      "Forget everything"
    ],
    correct: 0
  },
  {
    question: "Who is my forever special?",
    options: [
      "Jeni",
      "Sameer",
      "Mama 💖🫶",
      "Nobody"
    ],
    correct: 2
  },
  {
    question: "Who created this little birthday surprise?",
    options: [
      "Sameer",
      "Ahamed",
      "Jeni",
      "Raksha"
    ],
    correct: 1
  },
  {
    question: "What should we never stop doing?",
    options: [
      "Fighting",
      "Irritate each other",
      "Speak",
      "Complaining"
    ],
    correct: 1
  },
  {
    question: "What is the foundation of our friendship?",
    options: [
      "Money",
      "Popularity",
      "Trust",
      "Gifts"
    ],
    correct: 2
  },
  {
    question: "What describes our friendship best?",
    options: [
      "Crazy memories",
      "Endless support",
      "Both",
      "Neither"
    ],
    correct: 2
  }
];

const questionNumber = document.getElementById("questionNumber");
const quizScore = document.getElementById("quizScore");
const quizProgress = document.getElementById("quizProgress");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");
const resultText = document.getElementById("resultText");
const replayQuiz = document.getElementById("replayQuiz");

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  if (
    !questionNumber || !quizScore || !quizProgress ||
    !questionText || !answerOptions || !answerFeedback ||
    !nextQuestion || !quizResult
  ) {
    return;
  }

  const question = quizQuestions[currentQuestion];

  answered = false;

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  quizScore.textContent = `Score: ${score}`;

  quizProgress.style.width =
    `${(currentQuestion / quizQuestions.length) * 100}%`;

  questionText.textContent = question.question;
  answerOptions.innerHTML = "";
  answerFeedback.textContent = "";

  nextQuestion.hidden = true;
  quizResult.hidden = true;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-btn";
    button.textContent =
      `${String.fromCharCode(65 + index)}) ${option}`;

    button.addEventListener("click", () => {
      selectAnswer(index, button);
    });

    answerOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;

  const question = quizQuestions[currentQuestion];
  const buttons = answerOptions.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === question.correct) {
    score++;

    selectedButton.classList.add("correct");

    answerFeedback.textContent = "Correct! You know us so well! 💖";
  } else {
    selectedButton.classList.add("wrong");

    buttons[question.correct].classList.add("correct");

    answerFeedback.textContent =
      "Ahaa u are Wrong !!! 😂 Try the next one!";
  }

  quizScore.textContent = `Score: ${score}`;

  quizProgress.style.width =
    `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

  nextQuestion.hidden = false;

  nextQuestion.textContent =
    currentQuestion === quizQuestions.length - 1
      ? "See your result 💖"
      : "Next question →";
}

function showQuizResult() {
  questionNumber.textContent = "Quiz completed!";
  questionText.textContent = "";
  answerOptions.innerHTML = "";
  answerFeedback.textContent = "";
  nextQuestion.hidden = true;
  quizResult.hidden = false;

  quizProgress.style.width = "100%";
  quizScore.textContent = `Score: ${score}`;

  if (score === 10) {
    resultText.textContent =
      "10/10! Perfect! You know this little friendship inside out! 🥹💖";
  } else if (score >= 7) {
    resultText.textContent =
      `${score}/10! Amazing! You know so many of our little memories! 🫶`;
  } else if (score >= 4) {
    resultText.textContent =
      `${score}/10! Not bad! But you still have some memories to explore! 😂`;
  } else {
    resultText.textContent =
      `${score}/10! Ahaa! Looks like you need to read this diary again! 💌`;
  }
}

if (nextQuestion) {
  nextQuestion.addEventListener("click", () => {
    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showQuizResult();
    }
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

if (replayQuiz) {
  replayQuiz.addEventListener("click", restartQuiz);
}

if (questionText && answerOptions) {
  loadQuestion();
}

// ------------------------------------------
// 5. PHOTO BOOTH 📸
// ------------------------------------------

const photoUpload = document.getElementById("photoUpload");
const boothGallery = document.getElementById("boothGallery");

const PHOTO_STORAGE_KEY = "mamaLittleWorldPhotos";

function getSavedPhotos() {
  try {
    return JSON.parse(localStorage.getItem(PHOTO_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function displayBoothPhotos() {
  if (!boothGallery) return;

  boothGallery.innerHTML = "";

  const photos = getSavedPhotos();

  photos.forEach((photo, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "booth-photo";

    const image = document.createElement("img");
    image.src = photo;
    image.alt = `Photo booth memory ${index + 1}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "Remove photo");

    removeButton.addEventListener("click", () => {
      const updatedPhotos = getSavedPhotos();
      updatedPhotos.splice(index, 1);

      localStorage.setItem(
        PHOTO_STORAGE_KEY,
        JSON.stringify(updatedPhotos)
      );

      displayBoothPhotos();
    });

    wrapper.appendChild(image);
    wrapper.appendChild(removeButton);
    boothGallery.appendChild(wrapper);
  });
}

if (photoUpload) {
  photoUpload.addEventListener("change", async event => {
    const files = Array.from(event.target.files || []);
    const savedPhotos = getSavedPhotos();

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      const dataURL = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);
      });

      savedPhotos.push(dataURL);
    }

    try {
      localStorage.setItem(
        PHOTO_STORAGE_KEY,
        JSON.stringify(savedPhotos)
      );

      displayBoothPhotos();
    } catch {
      alert(
        "Your browser storage is full. Try adding fewer or smaller photos."
      );
    }

    photoUpload.value = "";
  });
}

displayBoothPhotos();

// ------------------------------------------
// 6. SECRET CORNER 🔐
// ------------------------------------------

const secretPassword = document.getElementById("secretPassword");
const unlockSecret = document.getElementById("unlockSecret");
const secretFeedback = document.getElementById("secretFeedback");
const secretMessage = document.getElementById("secretMessage");

function checkSecret() {
  if (!secretPassword || !secretFeedback || !secretMessage) return;

  const enteredPassword = secretPassword.value.trim().toLowerCase();

  if (enteredPassword === "mama") {
    secretFeedback.textContent = "You found the secret! 💖";
    secretMessage.hidden = false;
  } else {
    secretFeedback.textContent = "Ahaa u are Wrong !!! 😂";
    secretMessage.hidden = true;
  }
}

if (unlockSecret) {
  unlockSecret.addEventListener("click", checkSecret);
}

if (secretPassword) {
  secretPassword.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      checkSecret();
    }
  });
}

// ------------------------------------------
// 7. FINAL SURPRISE 💌
// ------------------------------------------

const finalReveal = document.getElementById("finalReveal");
const finalMessage = document.getElementById("finalMessage");

if (finalReveal && finalMessage) {
  finalReveal.addEventListener("click", () => {
    finalMessage.hidden = false;
    finalReveal.textContent = "Your surprise is open 💖";
    finalReveal.disabled = true;
  });
}

// ==========================================
// END OF MAMA'S LITTLE WORLD 💖
// ==========================================
