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

// check if the bonus bet wins
export function isBonusBetWin(hand) {
  const sortedHand = hand.sort((a, b) => b.value - a.value);
  if (sortedHand[0].value === sortedHand[1].value) {
    if (sortedHand[0].value === 14) {
      return 50;
    } else if (sortedHand[0].value >= 11 && sortedHand[0].value <= 13) {
      return 10;
    }
  } else if (sortedHand[0].value === 14) {
    if (sortedHand[1].value === 13) {
      return sortedHand[0].suit === sortedHand[1].suit ? 40 : 20;
    } else if (sortedHand[1].value === 12 || sortedHand[1].value === 11) {
      return sortedHand[0].suit === sortedHand[1].suit ? 30 : 0;
    }
  }
  return 0;
}

// check if the bonus bet 2 wins
export function isBonusBet2Win(hand, tableCards) {
  const bestHand = getBestHand(hand, tableCards);
  switch (bestHand.rank) {
    case 9:
      return 100;
    case 8:
      return 50;
    case 7:
      return 10;
    case 6:
      return 7;
    case 5:
      return 4;
  }
  return 0;
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

// check if the hand is a straight flush with ace low
function isStraightFlushAceLow(hand) {
  const sortedHand = hand.sort((a, b) => a.value - b.value);
  const isFlush = hand.every((card) => card.suitText === hand[0].suitText);
  if (!isFlush) {
    return false;
  }
  const isAceLowStraight = sortedHand.every((card, index) => {
    if (index === sortedHand.length - 1) {
      return card.value === 14;
    } else {
      return card.value === index + 2;
    }
  });
  return isAceLowStraight;
}

// check if the hand is a quads
function isQuads(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const quadsValue = Object.keys(valueCounts).find(
    (value) => valueCounts[value] === 4
  );
  return quadsValue ? parseInt(quadsValue) : false;
}

// check if the hand is a full house
function isFullHouse(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const threeValue = Object.keys(valueCounts).find(
    (value) => valueCounts[value] === 3
  );
  const pairValue = Object.keys(valueCounts).find(
    (value) => valueCounts[value] === 2
  );
  return threeValue && pairValue
    ? [parseInt(threeValue), parseInt(pairValue)]
    : false;
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
// check if the hand is a straight with ace low
function isStraightAceLow(hand) {
  const sortedHand = hand.sort((a, b) => a.value - b.value);
  const isAceLowStraight = sortedHand.every((card, index) => {
    if (index === sortedHand.length - 1) {
      return card.value === 14;
    } else {
      return card.value === index + 2;
    }
  });
  return isAceLowStraight;
}

//check if the hand is a trips
function isTrips(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const tripsValue = Object.keys(valueCounts).find(
    (value) => valueCounts[value] === 3
  );
  return tripsValue ? parseInt(tripsValue) : false;
}

//check if the hand is a two pair
function isTwoPair(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const pairValues = Object.keys(valueCounts).filter(
    (value) => valueCounts[value] === 2
  );
  return pairValues.length === 2
    ? pairValues.map((value) => parseInt(value))
    : false;
}

//check if the hand is a pair
function isPair(hand) {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  const pairValue = Object.keys(valueCounts).find(
    (value) => valueCounts[value] === 2
  );
  return pairValue ? parseInt(pairValue) : false;
}

//check biggest card
function isHighCard(hand) {
  const values = hand.map((card) => card.value);
  return Math.max(...values);
}

//get the rank of the hand
function getHandRank(hand) {
  if (isStraightFlush(hand)) {
    return { rank: 9, highCard: isHighCard(hand) };
  } else if (isStraightFlushAceLow(hand)) {
    return { rank: 9, highCard: 5 };
  } else if (isQuads(hand)) {
    const quadsValue = isQuads(hand);
    return {
      rank: 8,
      fourOfAKind: quadsValue,
      kicker: hand.find((card) => card.value !== quadsValue).value,
    };
  } else if (isFullHouse(hand)) {
    const [threeValue, pairValue] = isFullHouse(hand);
    return {
      rank: 7,
      threeOfAKind: threeValue,
      pair: pairValue,
    };
  } else if (isFlush(hand)) {
    const highCard = isHighCard(hand);
    const kickers = hand
      .filter((card) => card.value !== highCard)
      .map((card) => card.value)
      .sort((a, b) => b - a);
    return { rank: 6, kickers };
  } else if (isStraight(hand)) {
    return { rank: 5, highCard: isHighCard(hand) };
  } else if (isStraightAceLow(hand)) {
    return { rank: 5, highCard: 5 };
  } else if (isTrips(hand)) {
    const tripsValue = isTrips(hand);
    return {
      rank: 4,
      threeOfAKind: tripsValue,
      kickers: hand
        .filter((card) => card.value !== tripsValue)
        .map((card) => card.value)
        .sort((a, b) => b - a),
    };
  } else if (isTwoPair(hand)) {
    const [pair1Value, pair2Value] = isTwoPair(hand).sort((a, b) => b - a);
    return {
      rank: 3,
      twoPair: [pair1Value, pair2Value],
      kicker: hand.find(
        (card) => card.value !== pair1Value && card.value !== pair2Value
      ).value,
    };
  } else if (isPair(hand)) {
    const pairValue = isPair(hand);
    return {
      rank: 2,
      pair: pairValue,
      kickers: hand
        .filter((card) => card.value !== pairValue)
        .map((card) => card.value)
        .sort((a, b) => b - a),
    };
  } else {
    return {
      rank: 1,
      highCard: isHighCard(hand),
      kickers: [hand[1].value, hand[2].value, hand[3].value, hand[4].value],
    };
  }
}

//get the print of the hand
export function getPrintByHandRank(handRank) {
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
    case 1:
      return "High Card";
    case 0:
      return "Fold";
  }
}

// get the best hand from the hand and the table cards
function getBestHand(hand, tableCards) {
  if (hand === null || tableCards === null) {
    return null;
  }
  const allCards = hand.concat(tableCards);
  const allCombinations = getCombinations(allCards, 5);
  let bestHand = null;
  for (const currentHand of allCombinations) {
    const currentHandRankInfo = getHandRank(currentHand);
    if (!bestHand || currentHandRankInfo.rank > bestHand.rank) {
      bestHand = currentHandRankInfo;
    } else if (currentHandRankInfo.rank === bestHand.rank) {
      switch (currentHandRankInfo.rank) {
        case 9:
          if (currentHandRankInfo.highCard > bestHand.highCard) {
            bestHand = currentHandRankInfo;
          }
          break;
        case 8:
          if (currentHandRankInfo.fourOfAKind > bestHand.fourOfAKind) {
            bestHand = currentHandRankInfo;
          } else if (currentHandRankInfo.fourOfAKind === bestHand.fourOfAKind) {
            if (currentHandRankInfo.kicker > bestHand.kicker) {
              bestHand = currentHandRankInfo;
            }
          }
          break;
        case 7:
          if (currentHandRankInfo.threeOfAKind > bestHand.threeOfAKind) {
            bestHand = currentHandRankInfo;
          } else if (
            currentHandRankInfo.threeOfAKind === bestHand.threeOfAKind
          ) {
            if (currentHandRankInfo.pair > bestHand.pair) {
              bestHand = currentHandRankInfo;
            }
          }
          break;
        case 6:
          for (let i = 0; i < 5; i++) {
            if (currentHandRankInfo.kickers[i] > bestHand.kickers[i]) {
              bestHand = currentHandRankInfo;
              break;
            } else if (currentHandRankInfo.kickers[i] < bestHand.kickers[i]) {
              break;
            }
          }
          break;
        case 5:
          if (currentHandRankInfo.highCard > bestHand.highCard) {
            bestHand = currentHandRankInfo;
          }
          break;
        case 4:
          if (currentHandRankInfo.threeOfAKind > bestHand.threeOfAKind) {
            bestHand = currentHandRankInfo;
          } else if (
            currentHandRankInfo.threeOfAKind === bestHand.threeOfAKind
          ) {
            if (currentHandRankInfo.kickers[0] > bestHand.kickers[0]) {
              bestHand = currentHandRankInfo;
            } else if (currentHandRankInfo.kickers[0] === bestHand.kickers[0]) {
              if (currentHandRankInfo.kickers[1] > bestHand.kickers[1]) {
                bestHand = currentHandRankInfo;
              }
            }
          }
          break;
        case 3:
          if (currentHandRankInfo.twoPair[0] > bestHand.twoPair[0]) {
            bestHand = currentHandRankInfo;
          } else if (currentHandRankInfo.twoPair[0] === bestHand.twoPair[0]) {
            if (currentHandRankInfo.twoPair[1] > bestHand.twoPair[1]) {
              bestHand = currentHandRankInfo;
            } else if (currentHandRankInfo.twoPair[1] === bestHand.twoPair[1]) {
              if (currentHandRankInfo.kicker > bestHand.kicker) {
                bestHand = currentHandRankInfo;
              }
            }
          }
          break;
        case 2:
          if (currentHandRankInfo.pair > bestHand.pair) {
            bestHand = currentHandRankInfo;
          } else if (currentHandRankInfo.pair === bestHand.pair) {
            if (currentHandRankInfo.kickers[0] > bestHand.kickers[0]) {
              bestHand = currentHandRankInfo;
            } else if (currentHandRankInfo.kickers[0] === bestHand.kickers[0]) {
              if (currentHandRankInfo.kickers[1] > bestHand.kickers[1]) {
                bestHand = currentHandRankInfo;
              } else if (
                currentHandRankInfo.kickers[1] === bestHand.kickers[1]
              ) {
                if (currentHandRankInfo.kickers[2] > bestHand.kickers[2]) {
                  bestHand = currentHandRankInfo;
                }
              }
            }
          }
          break;
        case 1:
          for (let i = 0; i < 5; i++) {
            if (currentHandRankInfo.kickers[i] > bestHand.kickers[i]) {
              bestHand = currentHandRankInfo;
              break;
            } else if (currentHandRankInfo.kickers[i] < bestHand.kickers[i]) {
              break;
            }
          }
          break;
        case null:
          bestHand = 0;
      }
    }
  }

  return bestHand;
}

//evaluate the winner
function evaluateWinner(hand1, hand2, tableCards) {
  const bestHand1 = getBestHand(hand1, tableCards);
  const bestHand2 = getBestHand(hand2, tableCards);
  if (bestHand1.rank > bestHand2.rank) {
    return 1;
  } else if (bestHand1.rank < bestHand2.rank) {
    return 2;
  } else {
    switch (bestHand1.rank) {
      case 9:
        if (bestHand1.highCard > bestHand2.highCard) {
          return 1;
        } else if (bestHand1.highCard < bestHand2.highCard) {
          return 2;
        } else {
          return 0;
        }
      case 8:
        if (bestHand1.fourOfAKind > bestHand2.fourOfAKind) {
          return 1;
        } else if (bestHand1.fourOfAKind < bestHand2.fourOfAKind) {
          return 2;
        } else {
          if (bestHand1.kicker > bestHand2.kicker) {
            return 1;
          } else if (bestHand1.kicker < bestHand2.kicker) {
            return 2;
          } else {
            return 0;
          }
        }
      case 7:
        if (bestHand1.threeOfAKind > bestHand2.threeOfAKind) {
          return 1;
        } else if (bestHand1.threeOfAKind < bestHand2.threeOfAKind) {
          return 2;
        } else {
          if (bestHand1.pair > bestHand2.pair) {
            return 1;
          } else if (bestHand1.pair < bestHand2.pair) {
            return 2;
          } else {
            return 0;
          }
        }
      case 6:
        for (let i = 0; i < bestHand1.kickers.length; i++) {
          if (bestHand1.kickers[i] > bestHand2.kickers[i]) {
            return 1;
          } else if (bestHand1.kickers[i] < bestHand2.kickers[i]) {
            return 2;
          }
        }
        return 0;
      case 5:
        if (bestHand1.highCard > bestHand2.highCard) {
          return 1;
        } else if (bestHand1.highCard < bestHand2.highCard) {
          return 2;
        } else {
          return 0;
        }
      case 4:
        if (bestHand1.threeOfAKind > bestHand2.threeOfAKind) {
          return 1;
        } else if (bestHand1.threeOfAKind < bestHand2.threeOfAKind) {
          return 2;
        } else {
          if (bestHand1.kickers[0] > bestHand2.kickers[0]) {
            return 1;
          } else if (bestHand1.kickers[0] < bestHand2.kickers[0]) {
            return 2;
          } else {
            if (bestHand1.kickers[1] > bestHand2.kickers[1]) {
              return 1;
            } else if (bestHand1.kickers[1] < bestHand2.kickers[1]) {
              return 2;
            } else {
              return 0;
            }
          }
        }
      case 3:
        if (bestHand1.twoPair[0] > bestHand2.twoPair[0]) {
          return 1;
        } else if (bestHand1.twoPair[0] < bestHand2.twoPair[0]) {
          return 2;
        } else {
          if (bestHand1.twoPair[1] > bestHand2.twoPair[1]) {
            return 1;
          } else if (bestHand1.twoPair[1] < bestHand2.twoPair[1]) {
            return 2;
          } else {
            if (bestHand1.kicker > bestHand2.kicker) {
              return 1;
            } else if (bestHand1.kicker < bestHand2.kicker) {
              return 2;
            } else {
              return 0;
            }
          }
        }
      case 2:
        if (bestHand1.pair > bestHand2.pair) {
          return 1;
        } else if (bestHand1.pair < bestHand2.pair) {
          return 2;
        } else {
          if (bestHand1.kickers[0] > bestHand2.kickers[0]) {
            return 1;
          } else if (bestHand1.kickers[0] < bestHand2.kickers[0]) {
            return 2;
          } else {
            if (bestHand1.kickers[1] > bestHand2.kickers[1]) {
              return 1;
            } else if (bestHand1.kickers[1] < bestHand2.kickers[1]) {
              return 2;
            } else {
              if (bestHand1.kickers[2] > bestHand2.kickers[2]) {
                return 1;
              } else if (bestHand1.kickers[2] < bestHand2.kickers[2]) {
                return 2;
              } else {
                return 0;
              }
            }
          }
        }
      case 1:
        for (let i = 0; i < bestHand1.kickers.length; i++) {
          if (bestHand1.kickers[i] > bestHand2.kickers[i]) {
            return 1;
          } else if (bestHand1.kickers[i] < bestHand2.kickers[i]) {
            return 2;
          }
        }
        return 0;
    }
  }
}
export { evaluateWinner, getBestHand };
