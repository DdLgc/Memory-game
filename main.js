const cards = [
  "https://picsum.photos/id/10/100/100",
  "https://picsum.photos/id/11/100/100",
  "https://picsum.photos/id/12/100/100",
  "https://picsum.photos/id/13/100/100",
  "https://picsum.photos/id/14/100/100",
  "https://picsum.photos/id/15/100/100",
  "https://picsum.photos/id/16/100/100",
  "https://picsum.photos/id/17/100/100",
];

const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");
const victoryModal = document.getElementById("victory-modal");
const finalTime = document.getElementById("final-time");
const playAgainButton = document.getElementById("play-again-button");
const movesElement = document.getElementById("moves");
const finalMoves = document.getElementById("final-moves");

let selectedCards = [];
let lockBoard = false;
let timerInterval = null;
let seconds = 0;
let moves = 0;

function createCard(cardUrl) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = cardUrl;

  const cardContent = document.createElement("img");
  cardContent.classList.add("card-content");
  cardContent.src = cardUrl;

  card.appendChild(cardContent);
  card.addEventListener("click", onCardClick);

  return card;
}

function duplicateArray(arraySimple) {
  return [...arraySimple, ...arraySimple];
}

function shuffleArray(arrayToShuffle) {
  return arrayToShuffle.sort(() => 0.5 - Math.random());
}

function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(() => {
    seconds++;
    timerElement.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  timerElement.textContent = "00:00";
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function onCardClick(e) {
  if (lockBoard) return;

  const card = e.currentTarget;

  if (card.classList.contains("flip") || card.classList.contains("matched")) {
    return;
  }

  startTimer();

  card.classList.add("flip");
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    moves++;
    movesElement.textContent = moves;
    lockBoard = true;

    setTimeout(() => {
      checkSelectedCards();
      selectedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function checkSelectedCards() {
  const firstCard = selectedCards[0];
  const secondCard = selectedCards[1];

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", onCardClick);
    secondCard.removeEventListener("click", onCardClick);

    checkWin();
  } else {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }
}

function checkWin() {
  const allCardsNotFound = document.querySelectorAll(".card:not(.matched)");

  if (allCardsNotFound.length === 0) {
    stopTimer();
    finalTime.textContent = timerElement.textContent;
    finalMoves.textContent = moves;

    victoryModal.classList.remove("hidden");
  }
}

function initGame() {
  gameBoard.innerHTML = "";
  selectedCards = [];
  moves = 0;
  lockBoard = true;
  resetTimer();
  victoryModal.classList.add("hidden");

  let allCards = duplicateArray(cards);
  allCards = shuffleArray(allCards);

  allCards.forEach((card, index) => {
    const cardHtml = createCard(card);
    cardHtml.style.animationDelay = `${index * 80}ms`;
    gameBoard.appendChild(cardHtml);
  });

  setTimeout(
    () => {
      lockBoard = false;
    },
    allCards.length * 80 + 500,
  );
}

restartButton.addEventListener("click", initGame);
playAgainButton.addEventListener("click", initGame);

initGame();
