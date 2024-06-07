import React from "react";

const InfoButton = ({ onClick }) => {
  return (
    <div className="button-container" onClick={onClick}>
      INFO
    </div>
  );
};

const InfoPopUp = ({ trigger, setTrigger }) => {
  return (
    <>
      <div
        className={`backdrop ${trigger ? "show" : ""}`}
        onClick={() => setTrigger(false)}
      ></div>
      <div className={`popup ${trigger ? "show" : ""}`}>
        <div className="popup-inner">
          <p>
            CasinoPoker is a game where the player aims to beat the dealer's
            hand by forming the best possible five-card poker hand using two
            personal cards and five community cards. In addition to the basic
            game, CasinoPoker can include a bonus game.
          </p>
          <p>
            Playing Cards and Their Values: The game uses a single 52-card deck
            without jokers. The ace is valued at 14. The face cards are valued
            as follows: king 13, queen 12, and jack 11. Other cards (2–10) have
            their face value. The deck is shuffled before each new deal.
          </p>
          <p>
            Game Flow: When the players have placed their initial bet (Current
            bet) and any optional side bets (Bonus bet), the dealer deals two
            cards face down to the player and themselves. After looking at the
            cards, the player must decide whether to continue playing or fold.
            If the player folds, they lose their initial bet and any bonus bet.
            If the player decides to continue playing, they must pay a
            continuation bet equal to twice the blind bet. Once the players have
            made their decisions, the dealer reveals three community cards (the
            flop). At this point, the player can either continue with the same
            bet (Check) or raise by placing a bet equal to the blind bet
            (Raise). After any raise decisions, the dealer reveals the fourth
            community card (the turn). Players can once again raise their bet or
            continue with the same bet. The raise bet (river) is equal to the
            blind bet. If the player has not placed the previous raise bet, they
            cannot raise at this stage. After the player has made their
            decision, the dealer reveals the fifth community card (the river).
            With all community cards revealed, the dealer shows their pocket
            cards and forms the best possible five-card poker hand using two
            personal cards and five community cards. The dealer plays this hand
            against the player.
          </p>
          <p>
            Payout: If the player has a better poker hand than the dealer, they
            are paid 1:1 on each continuation bet (flop, turn, river). If the
            dealer's hand is better, the player loses their bets. If the hands
            are of equal value, the game is a tie and the bets are returned to
            the player.
          </p>
          <p>Side Games:</p>
          <ul>
            <li>
              Bonus: In addition to the basic CasinoPoker game, the player can
              participate in an optional bonus game, which can be played
              alongside the basic game and only when participating in the basic
              game. In the bonus game, players can bet 1-5 dollars. The win
              depends on the combination of the two pocket cards dealt to the
              player. The player must pay the first continuation bet (flop) in
              the basic game for the bonus game to remain valid.
              <ul>
                <li>A-A 50:1</li>
                <li>A-K same suit 40:1</li>
                <li>A-Q or A-J same suit 30:1</li>
                <li>A-K different suit 20:1</li>
                <li>K-K or Q-Q or J-J 10:1</li>
              </ul>
            </li>
            <li>Extra Bonus: Coming soon!</li>
          </ul>
          <p>Hand Rankings (Lowest to Highest):</p>
          <ul>
            <li>
              High card: If the highest card is the same, the next highest card
              decides.
            </li>
            <li>
              Pair: The higher pair wins. If the pairs are the same, the next
              highest card decides.
            </li>
            <li>
              Two pair: The higher pair wins. If both pairs are the same, the
              fifth card decides.
            </li>
            <li>
              Three of a kind: The higher combination wins. If both sets of
              three are the same, the highest side card decides.
            </li>
            <li>Straight: The higher five-card combination wins.</li>
            <li>
              Flush: Of two five-card flushes, the one with the highest card
              wins.
            </li>
            <li>
              Full house: Of two full houses, the one with the higher set of
              three wins. If both have the same set of three, the higher pair
              decides.
            </li>
            <li>
              Four of a kind: The higher set of four wins. If both sets of four
              are the same, the fifth card decides.
            </li>
            <li>Straight flush: The higher five-card straight flush wins.</li>
          </ul>

          <p>
            If the player and dealer have hands of exactly the same value, the
            game is a tie. Suits do not have a ranking order.
          </p>
          <div className="button-container" onClick={() => setTrigger(false)}>
            <div className="button-text">Close</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { InfoPopUp, InfoButton };
