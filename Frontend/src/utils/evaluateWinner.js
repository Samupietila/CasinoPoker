// check if the hand is a straight flush
function isStraightFlush(hand) {
  const sortedHand = hand.sort((a, b) => a.value - b.value);
  const isFlush = hand.every((card) => card.suitText === hand[0].suitText);
  if (!isFlush) {
    return false;
  }
  const isStraight = sortedHand.every((card, index) => {
    if (index === 0) {
      return true;
    }
    return card.value === sortedHand[index - 1].value + 1;
  });
  return isStraight;
}

// check if the hand is a quads
function isQuads(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.values(valueCounts).includes(4);
}

// check if the hand is a full house
function isFullHouse(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return (
    Object.values(valueCounts).includes(3) &&
    Object.values(valueCounts).includes(2)
  );
}

//check if the hand is a flush
function isFlush(hand) {
  return hand.every((card) => card.suitText === hand[0].suitText);
}

//check if the hand is a straight
function isStraight(hand) {
  const sortedHand = hand.sort((a, b) => a.value - b.value);
  return sortedHand.every((card, index) => {
    if (index === 0) {
      return true;
    }
    return card.value === sortedHand[index - 1].value + 1;
  });
}

//check if the hand is a trips
function isTrips(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.values(valueCounts).includes(3);
}

//check if the hand is a two pair
function isTwoPair(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.values(valueCounts).filter((count) => count === 2).length === 2;
}

//check if the hand is a pair
function isPair(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.values(valueCounts).includes(2);
}

//check biggest card
function isHighCard(hand) {
  const values = hand.map((card) => card.value);
  return Math.max(...values);
}

//get the rank of the hand
function getHandRank(hand) {
  if (isStraightFlush(hand)) {
    return 9;
  } else if (isQuads(hand)) {
    return 8;
  } else if (isFullHouse(hand)) {
    return 7;
  } else if (isFlush(hand)) {
    return 6;
  } else if (isStraight(hand)) {
    return 5;
  } else if (isTrips(hand)) {
    return 4;
  } else if (isTwoPair(hand)) {
    return 3;
  } else if (isPair(hand)) {
    return 2;
  } else {
    return 1;
  }
}

//evaluate the winner
function evaluateWinner(hand1, hand2, tableCards) {
  const hand1Rank = getHandRank(hand1);
  const hand2Rank = getHandRank(hand2);
  if (hand1Rank > hand2Rank) {
    return "Hand 1 wins!";
  } else if (hand2Rank == hand1Rank) {
    const hand1Values = hand1.map((card) => card.value);
    const hand2Values = hand2.map((card) => card.value);
    const hand1MaxValue = Math.max(...hand1Values);
    const hand2MaxValue = Math.max(...hand2Values);
    if (hand1MaxValue > hand2MaxValue) {
      return "Hand 1 wins!";
    } else if (hand1MaxValue == hand2MaxValue) {
      return "It's a tie!";
    } else {
      return "Hand 2 wins!";
    }
  } else {
    return "Hand 2 wins!";
  }
}

export { evaluateWinner };
