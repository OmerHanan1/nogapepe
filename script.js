const CARD_COUNT = 19;
const pickButton = document.querySelector("#pick-card");
const dialog = document.querySelector("#card-dialog");
const closeButton = document.querySelector("#close-card");
const cardImage = document.querySelector("#card-image");

let previousCard = 0;

function pickRandomCard() {
  let cardNumber;

  do {
    cardNumber = Math.floor(Math.random() * CARD_COUNT) + 1;
  } while (CARD_COUNT > 1 && cardNumber === previousCard);

  previousCard = cardNumber;
  cardImage.src = `assets/cards/card-${String(cardNumber).padStart(2, "0")}.jpg`;
  cardImage.alt = `Random wedding card ${cardNumber} of ${CARD_COUNT}`;
  dialog.showModal();
}

function closeCard() {
  dialog.close();
}

pickButton.addEventListener("click", pickRandomCard);
closeButton.addEventListener("click", closeCard);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeCard();
  }
});
