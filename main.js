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
gameBoard.appendChild(createCard("https://picsum.photos/id/236/100/100"));

function createCard(CardUrl) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = CardUrl;

  const cardContent = document.createElement("img");
  cardContent.classList.add("card-content");
  cardContent.src = `${CardUrl}`;
  card.appendChild(cardContent);
  return card;
}

function duplicateArray(arraySimple) {
  let arrayDouble = [];
  arrayDouble.push(...arraySimple);
  arrayDouble.push(...arraySimple);
  return arrayDouble;
}

const allCards = duplicateArray(cards);
allCards.forEach((card) => {
  const cardHtml = createCard(card);
  gameBoard.appendChild(cardHtml);
});
