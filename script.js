const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
let score = 0;
let timeLeft = 30;
const numEmojis = 5;
const smashSound = new Audio("smash.wav");

const emojis = [
  "😆",
  "😍",
  "😃",
  "😜",
  "🥰",
  "😘",
  "😇",
  "😂",
  "😻",
  "❤️",
  "💖",
  "💘",
  "🌟",
  "🎈",
  "🎉",
];

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const maxX = gameContainer.clientWidth - 40;
  const maxY = gameContainer.clientHeight - 40;

  emoji.style.left = `${Math.floor(Math.random() * maxX)}px`;
  emoji.style.top = `${Math.floor(Math.random() * maxY)}px`;

  emoji.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;
    smashSound.currentTime = 0;
    smashSound.play();
    gameContainer.removeChild(emoji);
  });

  gameContainer.appendChild(emoji);
}

function spawnEmojis() {
  gameContainer.innerHTML = "";
  for (let i = 0; i < numEmojis; i++) {
    createEmoji();
  }
}

const timer = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    timeElement.textContent = timeLeft;
  }

  if (timeLeft === 0) {
    clearInterval(timer);
    gameContainer.innerHTML = "";
    showCelebration();
  }
}, 1000);

const emojiInterval = setInterval(() => {
  if (timeLeft > 0) {
    spawnEmojis();
  } else {
    clearInterval(emojiInterval);
  }
}, 1500);

spawnEmojis();

function showCelebration() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    document.body.appendChild(confetti);
  }

  setTimeout(() => {
    alert(`🎉 Bravo! You scored ${score} points 🎊 You're amazing! 🥳`);
  }, 500);
}
