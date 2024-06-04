const evaluateWinner = require("./evaluateWinner");

test("should return 1 when hand1 is the winner", () => {
  const hand1 = [7, 2];
  const hand2 = [2, 5];
  const tableCards = [12, 8, 7, 5, 3];
  const winner = evaluateWinner(hand1, hand2, tableCards);
});

// test("should return 2 when hand2 is the winner", () => {
//   const hand1 = [
//     /* insert hand1 cards here */
//   ];
//   const hand2 = [
//     /* insert hand2 cards here */
//   ];
//   const tableCards = [
//     /* insert table cards here */
//   ];
//   const winner = evaluateWinner(hand1, hand2, tableCards);
//   expect(winner).toBe(2);
// });

// test("should return 0 when it is a tie", () => {
//   const hand1 = [
//     /* insert hand1 cards here */
//   ];
//   const hand2 = [
//     /* insert hand2 cards here */
//   ];
//   const tableCards = [
//     /* insert table cards here */
//   ];
//   const winner = evaluateWinner(hand1, hand2, tableCards);
//   expect(winner).toBe(0);
// });
