"use strict";
"use strict";

// ______________________
// FLOW>>
// ROLL A DICE, HOLD SCORE AND HIGER SCORE WINS ONCE PLAYER REACH 100
// IF PLAYER-1 THROWS DICE 1, PLAYER-1 MUST PASS THE DICE TO PLAYER-2
// ______________________

// SELECT ELEMENT
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

// STARTING CONDITION
let scores, playing, activePlayer, currentScore;
const init = ()=>{
     scores = [0, 0];
     playing = true;    
     activePlayer = 0;
     currentScore = 0;    

    score0El.textContent = 0;
    score1El.textContent = 0;    
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");    
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

init();
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // check for rolled 1:
      currentScore += dice;
      // current0El.textContent = currentScore; // (This will always adds scores to player one 🥲)
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true, switch to next player;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

    // And check it is >=  100
    if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    // Finesh the game
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
    //Switch to next player
    switchPlayer();
    }
 }
});

btnNew.addEventListener('click',init)