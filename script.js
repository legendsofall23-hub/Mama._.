// ==========================================
// MAMA'S LITTLE WORLD 💖
// ==========================================


// ------------------------------------------
// 1. OPENING SCREEN
// ------------------------------------------

const introScreen = document.getElementById("introScreen");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  introScreen.classList.add("hide");

  setTimeout(() => {
    introScreen.style.display = "none";
  }, 950);
});


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

    sparkle.className = "sparkle";
    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.setProperty(
      "--size",
      (10 + Math.random() * 15) + "px"
    );
    sparkle.style.setProperty(
      "--duration",
      (9 + Math.random() * 12) + "s"
    );
    sparkle.style.setProperty(
      "--delay",
      (-Math.random() * 20) + "s"
    );
    sparkle.style.setProperty(
      "--drift",
      (Math.random() * 100 - 50) + "px"
    );

    layer.appendChild(sparkle);
  }
}

createSparkles();


// ------------------------------------------
// 3. COUNTDOWN TO DECEMBER 21, 2027
// ------------------------------------------

function updateCountdown() {
  // Birthday target: December 21, 2027
  const target = new Date("2027-12-21T00:00:00");
  const now = new Date();

  let difference = target.getTime() - now.getTime();

  if (difference < 0) {
    difference = 0;
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

  document.getElementById("days").textContent =
    String(days).padStart(3, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ------------------------------------------
// 4. MEMORY PHOTO LIGHTBOX
// ------------------------------------------

const lightbox = document.createElement("div");
lightbox.className = "photo-lightbox";
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close photo">&times;</button>
  <img src="" alt="Expanded memory">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

document.querySelectorAll(".photo-grid img, .special-memory-row img")
  .forEach((photo) => {
    photo.addEventListener("click", () => {
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightbox.classList.add("active");
    });
  });

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});


// ------------------------------------------
// 5. FRIENDSHIP QUIZ 🎀
// ------------------------------------------

const questions = [
  {
    q: "What do I call you?",
    options: ["Mama", "Sister", "Boss", "Friend"],
    answer: 0
  },
  {
    q: "What do you mean to me?",
    options: ["Nothing", "Everything", "A classmate", "A stranger"],
    answer: 1
  },
  {
    q: "Who is my special to me?",
    options: ["Jeni", "Raksha", "Sameer", "Someone else"],
    answer: 1
  },
  {
    q: "What makes our friendship special?",
    options: ["Trust", "Support", "All of these", "Memories"],
    answer: 2
  },
  {
    q: "What will I always do?",
    options: [
      "Ignore you",
      "Always support you and be with you",
      "Forget you",
      "Avoid you"
    ],
    answer: 1
  },
  {
    q: "What's your special nickname?",
    options: [
      "Mama 💖🫶",
      "Kullachi 😆",
      "Gay 🌈🏳️‍🌈",
      "Lesbian 👻"
    ],
    answer: 0
  },
  {
    q: "Who's your favourite troublemaker?",
    options: ["Ahamed", "Sameer", "Uncle", "Jeni"],
    answer: 0
  },
  {
    q: "What's one thing we should never stop doing?",
    options: [
      "Irritate each other",
      "Speak",
      "Stay silent",
      "Ignore"
    ],
    answer: 1
  },
  {
    q: "What matters most in our friendship?",
    options: ["Fame", "Trust", "Money", "Popularity"],
    answer: 1
  },
  {
    q: "Our friendship is...?",
    options: [
      "Temporary",
      "Both — silly & special",
      "Just ordinary",
      "Nothing"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizScore = document.getElementById("quizScore");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const resultText = document.getElementById("resultText");

function showQuestion() {
  const question = questions[currentQuestion];

  answered = false;

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = question.q;
  quizScore.textContent = `Score: ${score}`;

  quizProgress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  answerOptions.innerHTML = "";
  answerFeedback.textContent = "";

  nextQuestion.hidden = true;
  quizResult.hidden = true;

  answerOptions.hidden = false;
  questionText.hidden = false;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerOptions.appendChild(button);
  });
}

function selectAnswer(selected) {
  if (answered) return;

  answered = true;

  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
    answerFeedback.textContent =
      "Correct! You know us well! 💖";
  } else {
    answerFeedback.textContent =
      `Ahaa! The correct answer was "${questions[currentQuestion].options[correct]}". 😂`;
  }

  [...answerOptions.children].forEach((button, index) => {
    button.disabled = true;

    if (index === correct) {
      button.classList.add("correct-answer");
    } else if (index === selected) {
      button.classList.add("wrong-answer");
    }
  });

  quizScore.textContent = `Score: ${score}`;

  nextQuestion.textContent =
    currentQuestion === questions.length - 1
      ? "See my result ✨"
      : "Next question →";

  nextQuestion.hidden = false;
}

nextQuestion.addEventListener("click", () => {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionNumber.textContent = "Quiz completed!";
  questionText.hidden = true;
  answerOptions.hidden = true;
  answerFeedback.textContent = "";
  nextQuestion.hidden = true;
  quizResult.hidden = false;

  quizProgress.style.width = "100%";

  let message;

  if (score === 10) {
    message =
      "10/10! Perfect! You really know our friendship. 🏆💖";
  } else if (score >= 7) {
    message =
      `${score}/10! Pretty impressive, Mama! 🫶`;
  } else if (score >= 4) {
    message =
      `${score}/10! Not bad! We need more silly memories. 😂`;
  } else {
    message =
      `${score}/10! Ahaa, we have some catching up to do! 💖`;
  }

  resultText.textContent = message;
}

document.getElementById("replayQuiz").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

showQuestion();


// ------------------------------------------
// 6. SECRET PASSWORD 🔐
// ------------------------------------------

const secretPassword =
  document.getElementById("secretPassword");

const secretFeedback =
  document.getElementById("secretFeedback");

const secretMessage =
  document.getElementById("secretMessage");

document.getElementById("unlockSecret").addEventListener("click", () => {
  const password = secretPassword.value.trim();

  if (password.toLowerCase() === "mama") {
    secretFeedback.textContent = "You found the secret! 💖";
    secretMessage.hidden = false;
  } else {
    secretFeedback.textContent = "Ahaa u are Wrong !!! 😂";
    secretMessage.hidden = true;
  }
});

secretPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("unlockSecret").click();
  }
});


// ------------------------------------------
// 7. FINAL SECRET 💌
// ------------------------------------------

const finalReveal = document.getElementById("finalReveal");
const finalMessage = document.getElementById("finalMessage");

finalReveal.addEventListener("click", () => {
  finalMessage.hidden = false;

  finalReveal.textContent = "Your surprise is open ♡";
  finalReveal.disabled = true;
});


// ------------------------------------------
// 8. MUSIC PLAYERS 🎵
// Only one chapter plays at a time.
// No autoplay.
// ------------------------------------------

const audioPlayers = document.querySelectorAll(".chapter-card audio");

audioPlayers.forEach((player) => {
  player.addEventListener("play", () => {
    audioPlayers.forEach((otherPlayer) => {
      if (otherPlayer !== player) {
        otherPlayer.pause();
      }
    });
  });
});


// ------------------------------------------
// 9. PHOTO BOOTH
// Saves photos in this browser using IndexedDB.
// ------------------------------------------

const DB_NAME = "MamaPhotoBooth";
const STORE_NAME = "photos";

let photoDB;

function openPhotoDB() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is unavailable."));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function savePhoto(file) {
  return new Promise((resolve, reject) => {
    const transaction =
      photoDB.transaction(STORE_NAME, "readwrite");

    transaction.objectStore(STORE_NAME).add({
      name: file.name,
      image: file,
      created: Date.now()
    });

    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

function loadPhotos() {
  return new Promise((resolve, reject) => {
    const transaction =
      photoDB.transaction(STORE_NAME, "readonly");

    const request =
      transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => {
      renderPhotos(request.result);
      resolve();
    };

    request.onerror = () => reject(request.error);
  });
}

function renderPhotos(photos) {
  const gallery = document.getElementById("boothGallery");

  gallery.innerHTML = "";

  photos.forEach((photo) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const remove = document.createElement("button");

    const imageURL = URL.createObjectURL(photo.image);

    img.src = imageURL;
    img.alt = photo.name;

    img.addEventListener("load", () => {
      URL.revokeObjectURL(imageURL);
    }, { once: true });

    remove.textContent = "Remove";
    remove.type = "button";

    remove.addEventListener("click", () => {
      deletePhoto(photo.id);
    });

    card.appendChild(img);
    card.appendChild(remove);

    gallery.appendChild(card);
  });
}

function deletePhoto(id) {
  const transaction =
    photoDB.transaction(STORE_NAME, "readwrite");

  transaction.objectStore(STORE_NAME).delete(id);

  transaction.oncomplete = () => {
    loadPhotos();
  };
}

async function initialisePhotoBooth() {
  try {
    photoDB = await openPhotoDB();
    await loadPhotos();
  } catch (error) {
    document.getElementById("boothGallery").textContent =
      "Photo booth storage is unavailable in this browser.";
  }
}

document.getElementById("photoUpload").addEventListener(
  "change",
  async (event) => {
    const files = [...event.target.files];

    if (!photoDB) {
      alert("Photo booth is not ready yet. Please try again.");
      return;
    }

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        await savePhoto(file);
      }
    }

    await loadPhotos();
    event.target.value = "";
  }
);

initialisePhotoBooth();


// ==========================================
// END OF MAMA'S LITTLE WORLD 💖
// ==========================================
