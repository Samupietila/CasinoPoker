const totalCards = 52;
const suits = ["♥", "♦", "♠", "♣"];
const cards = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const generateDeck = () => {
  let deck = [];
  suits.forEach((suit) => {
    cards.forEach((card) => {
      deck.push({ card, suit, value: VALUES[card] });
    });
  });
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};

const dealCard = (deck) => {
  return deck.shift();
};
const dealHand = (deck, numCards) => {
  let hand = [];
  for (let i = 0; i < numCards; i++) {
    hand.push(dealCard(deck));
  }
  return hand;
};

const dealFlop = (deck) => {
  //burn a card
  dealCard(deck);
  return dealHand(deck, 3);
};
const dealTurn = (deck) => {
  dealCard(deck);
  return dealHand(deck, 1);
};
const dealRiver = (deck) => {
  dealCard(deck);
  return dealHand(deck, 1);
};

const getCardValue = (card) => {
  return card.value;
};

// for testing
const getDeckLength = (deck) => {
  return deck.length;
};

export {
  generateDeck,
  shuffleDeck,
  dealCard,
  getCardValue,
  dealHand,
  dealFlop,
  dealTurn,
  dealRiver,
  getDeckLength,
};
// Path: Frontend/src/components/Hand.js
