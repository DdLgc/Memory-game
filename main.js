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
let selectedCards = [];

function createCard(CardUrl) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = CardUrl;

  const cardContent = document.createElement("img");
  cardContent.classList.add("card-content");
  cardContent.src = `${CardUrl}`;

  card.appendChild(cardContent);

  card.addEventListener("click", onCardClick);
  return card;
}

function duplicateArray(arraySimple) {
  let arrayDouble = [];
  arrayDouble.push(...arraySimple);
  arrayDouble.push(...arraySimple);
  return arrayDouble;
}

function shuffleArray(arrayToshuffle) {
  const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
  return arrayShuffled;
}

function onCardClick(e) {
  const card = e.target.parentElement;
  card.classList.add("flip");

  selectedCards.push(card);
  if (selectedCards.length == 2) {
    setTimeout(() => {
      if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
        selectedCards[0].classList.add("matched");
        selectedCards[1].classList.add("matched");
        selectedCards[0].removeEventListener("click", onCardClick);
        selectedCards[1].removeEventListener("click", onCardClick);

        // const allCardNotFinded = document.querySelectorAll(
        //   ".card:not(.matched)",
        // );
        // if (allCardNotFinded.length == 0) {
        //   alert("Bravo, vous avez gagné");
        // }
      } else {
        selectedCards[0].classList.remove("flip");
        selectedCards[1].classList.remove("flip");
      }
      selectedCards = [];
    }, 1000);
  }
}

let allCards = duplicateArray(cards);
allCards = shuffleArray(allCards);
allCards.forEach((card) => {
  const cardHtml = createCard(card);
  gameBoard.appendChild(cardHtml);
});
