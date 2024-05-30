// Purpose: Evaluate the winner of a poker game. the logic is mostly made with Copilot.

// get all possible combinations of 5 cards
function getCombinations(cards, k) {
  const result = [];
  const helper = (current, start) => {
    if (current.length === k) {
      result.push(current.slice());
    } else {
      for (let i = start; i < cards.length; i++) {
        current.push(cards[i]);
        helper(current, i + 1);
        current.pop();
      }
    }
  };
  helper([], 0);
  return result;
}

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

//get the print of the hand
function getPrintByHandRank(handRank) {
  switch (handRank) {
    case 9:
      return "Straight Flush";
    case 8:
      return "Quads";
    case 7:
      return "Full House";
    case 6:
      return "Flush";
    case 5:
      return "Straight";
    case 4:
      return "Trips";
    case 3:
      return "Two Pair";
    case 2:
      return "Pair";
    default:
      return "High Card";
  }
}

// get the best hand from the hand and the table cards
function getBestHand(hand, tableCards) {
  const allCards = hand.concat(tableCards);
  const allCombinations = getCombinations(allCards, 5);

  let bestHand = [];
  let bestHandRank = -1;

  for (const currentHand of allCombinations) {
    const currentHandRank = getHandRank(currentHand);
    if (currentHandRank > bestHandRank) {
      bestHand = currentHand;
      bestHandRank = currentHandRank;
    } else if (currentHandRank === bestHandRank) {
      const currentHandMaxValue = Math.max(
        ...currentHand.map((card) => card.value)
      );
      const bestHandMaxValue = Math.max(...bestHand.map((card) => card.value));
      if (currentHandMaxValue > bestHandMaxValue) {
        bestHand = currentHand;
      }
    }
  }

  return bestHand;
}

//evaluate the winner
function evaluateWinner(hand1, hand2, tableCards) {
  const bestHand1 = getBestHand(hand1, tableCards);
  const bestHand2 = getBestHand(hand2, tableCards);
  const hand1Rank = getHandRank(bestHand1);
  const hand2Rank = getHandRank(bestHand2);
  if (hand1Rank > hand2Rank) {
    return (
      "You win! with a " +
      getPrintByHandRank(hand1Rank) +
      "!" +
      "Dealers hand was a " +
      getPrintByHandRank(hand2Rank) +
      "!"
    );
  } else if (hand2Rank == hand1Rank) {
    const hand1Values = hand1.map((card) => card.value);
    const hand2Values = hand2.map((card) => card.value);
    const hand1MaxValue = Math.max(...hand1Values);
    const hand2MaxValue = Math.max(...hand2Values);
    if (hand1MaxValue > hand2MaxValue) {
      return (
        "You win! with a " +
        getPrintByHandRank(hand1Rank) +
        "!" +
        "Dealers hand was a " +
        getPrintByHandRank(hand2Rank) +
        "!"
      );
    } else if (hand1MaxValue == hand2MaxValue) {
      return (
        "It's a tie! Both players have a " + getPrintByHandRank(hand1Rank) + "!"
      );
    } else {
      return "Dealer wins!" + " with a " + getPrintByHandRank(hand2Rank) + "!";
    }
  } else {
    return "Dealer wins!" + " with a " + getPrintByHandRank(hand2Rank) + "!";
  }
}

export { evaluateWinner };
