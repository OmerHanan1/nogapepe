const CARD_COUNT = 19;
const pickButton = document.querySelector("#pick-card");
const dialog = document.querySelector("#card-dialog");
const closeButton = document.querySelector("#close-card");
const cardImage = document.querySelector("#card-image");
const discoveryCount = document.querySelector("#discovery-count");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const resetButton = document.querySelector("#reset-discovery");

const storedCards = localStorage.getItem("nogapepe-discovered-cards");
const discoveredCards = new Set(
  (storedCards ? storedCards.split(",") : [])
    .map(Number)
    .filter((cardNumber) => Number.isInteger(cardNumber) && cardNumber >= 1 && cardNumber <= CARD_COUNT),
);
let previousCard = 0;

function updateDiscoveryProgress() {
  const discoveredCount = discoveredCards.size;
  const percentage = (discoveredCount / CARD_COUNT) * 100;
  const cardLabel = discoveredCount === 1 ? "card" : "cards";

  discoveryCount.textContent = `Discovered ${discoveredCount} of ${CARD_COUNT} ${cardLabel}`;
  progressTrack.setAttribute("aria-valuenow", String(discoveredCount));
  progressFill.style.width = `${percentage}%`;
  resetButton.disabled = discoveredCount === 0;
}

function rememberCard(cardNumber) {
  discoveredCards.add(cardNumber);
  localStorage.setItem("nogapepe-discovered-cards", [...discoveredCards].join(","));
  updateDiscoveryProgress();
}

function pickRandomCard() {
  let cardNumber;

  do {
    cardNumber = Math.floor(Math.random() * CARD_COUNT) + 1;
  } while (CARD_COUNT > 1 && cardNumber === previousCard);

  previousCard = cardNumber;
  rememberCard(cardNumber);
  cardImage.src = `assets/cards/card-${String(cardNumber).padStart(2, "0")}.jpg`;
  cardImage.alt = `Random wedding card ${cardNumber} of ${CARD_COUNT}`;
  dialog.showModal();
}

function closeCard() {
  dialog.close();
}

function resetDiscovery() {
  discoveredCards.clear();
  localStorage.removeItem("nogapepe-discovered-cards");
  updateDiscoveryProgress();
}

pickButton.addEventListener("click", pickRandomCard);
closeButton.addEventListener("click", closeCard);
resetButton.addEventListener("click", resetDiscovery);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeCard();
  }
});

updateDiscoveryProgress();
