/*********************************
 🌸 ROSE PETAL RAIN
**********************************/
const petalContainer = document.querySelector(".petal-container");

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal " + (Math.random() > 0.5 ? "red" : "black");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 4 + 6 + "s";
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  petalContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}

let petalInterval = setInterval(createPetal, 220);

/*********************************
 🔊 SOUND (UNLOCK ON FIRST CLICK)
**********************************/
let clickSound;
document.addEventListener(
  "click",
  () => {
    if (!clickSound) {
      clickSound = new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-click-melodic-tone-1129.mp3"
      );
      clickSound.volume = 0.7;
      clickSound.play().catch(() => {});
    }
  },
  { once: true }
);

function playSound() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

/*********************************
 📳 VIBRATION
**********************************/
function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

/*********************************
 ❓ QUESTIONS (DYNAMIC OPTIONS)
**********************************/
const questions = [
  {
    text: "Tammu, sab theek hai na? 🙂",
    yes: "Haan 🙂",
    no: "Thoda off",
    flirty: "Off? lagta hai thoda pyaar chahiye 😏"
  },
  {
    text: "Health ka kya scene hai, Tammu ji ? 👀",
    yes: "Bilkul 💪",
    no: "Thoda sa",
    flirty: "Thoda sa? doctor se zyada care main kar loon? 😌"
  },
  {
    text: "Khana khaya ya skip kar diya? 🍽️",
    yes: "Haan 🍽️",
    no: "Nahi 😅",
    flirty: "Nahi? Tammu lagta hai tumhari bhukh ko mujhe hi khtm krna hooga hehehhe 😄"
  },
  {
    text: "Aaj mood kaisa hai, madam ji? 😌",
    yes: "Mast 😌",
    no: "Meh",
    flirty: "Meh? ek smile free mein de doon? 🙂"
  },
  {
    text: "Waise ek baat bolun… Tammu tum thodi zyada cute/sexy hona 😏",
    yes: "Obviously 😏",
    no: "Maybe",
    flirty: "Maybe bhi kaafi cute hi hota hai meri bby 😌"
  },
  {
    text: "Bas ek last sawaal… ready ho? 👀",
    yes: "Ready 😌",
    no: "Hmm",
    flirty: "Hmm matlab haan hi hota hai (hehehhehe)😄"
  },
  {
    text: "Tammu, do you like me? 😈",
    yes: "Haan 😳",
    no: "NO 😈"
  }
];

/*********************************
 ❓ POPUP ELEMENTS
**********************************/
const popup = document.getElementById("popup");
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let index = 0;
let waitingForNext = false;

/* Text animation */
function showText(text) {
  questionEl.classList.remove("question-animate");
  void questionEl.offsetWidth;
  questionEl.textContent = text;
  questionEl.classList.add("question-animate");
}

/* Show question */
function showQuestion(i) {
  showText(questions[i].text);
  yesBtn.textContent = questions[i].yes;
  noBtn.textContent = questions[i].no;
}

/* Initial */
showQuestion(index);

/*********************************
 ✅ YES / NEXT BUTTON
**********************************/
yesBtn.addEventListener("click", () => {
  playSound();
  vibrate(40);

  // AFTER FLIRTY LINE → NEXT QUESTION
  if (waitingForNext) {
    waitingForNext = false;
    index++;
    noBtn.style.display = "inline-block";
    showQuestion(index);
    return;
  }

  index++;

  // NORMAL FLOW
  if (index < questions.length) {
    showQuestion(index);
  } else {
    // 🎉 FINAL CELEBRATION
    document.body.classList.add("celebrate");
    speedUpPetals();
    celebrateConfetti();

    showText("Hehe… I knew it 🌹");
    questionEl.classList.add("final-message");
    noBtn.remove();
    yesBtn.textContent = "Close";
    yesBtn.onclick = () => popup.remove();
  }
});

/*********************************
 ❌ NO BUTTON
**********************************/
noBtn.addEventListener("click", () => {
  playSound();
  vibrate(30);

  // LAST QUESTION → ESCAPE
  if (index === questions.length - 1) {
    escapePopup();
    return;
  }

  // NEGATIVE RESPONSE → FLIRTY LINE
  showText(questions[index].flirty);
  yesBtn.textContent = "Next 😉";
  noBtn.style.display = "none";
  waitingForNext = true;
});

/*********************************
 😈 POPUP ESCAPE (LAST QUESTION)
**********************************/
function escapePopup() {
  popup.classList.add("shake");

  setTimeout(() => {
    popup.classList.remove("shake");

    const padding = 20;
    popup.style.left =
      Math.random() * (window.innerWidth - popup.offsetWidth - padding) + "px";
    popup.style.top =
      Math.random() * (window.innerHeight - popup.offsetHeight - padding) + "px";
    popup.style.transform = "none";

    vibrate([20, 40, 20]);
  }, 200);
}

noBtn.addEventListener("mouseenter", () => {
  if (index === questions.length - 1) escapePopup();
});

/*********************************
 🎉 CELEBRATION EFFECTS
**********************************/
function speedUpPetals() {
  clearInterval(petalInterval);
  petalInterval = setInterval(createPetal, 80);
}

function celebrateConfetti() {
  for (let i = 0; i < 80; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background = Math.random() > 0.5 ? "#dc2626" : "#fff";
    conf.style.animationDuration = Math.random() * 2 + 2 + "s";
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 4000);
  }
}
