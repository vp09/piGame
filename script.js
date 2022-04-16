'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//starting conditions
let scores;
let currentScore;
let activePlayer;
let playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //2. let playing =true
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  // scores = [0, 0];

  diceEl.classList.add('hidden'); // HIDE THE DICE UNTIL THE ROLL BUTTON CLICKED IN THE START OF THE GAME.
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//game logic - rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.display dice
    diceEl.classList.remove('hidden');

    //approach 1 for changing dice images acording to rolled number
    /*
  if (dice === 1) diceEl.src = 'dice-1.png';
  else if (dice === 2) diceEl.src = 'dice-2.png';
  else if (dice === 3) diceEl.src = 'dice-3.png';
  else if (dice === 4) diceEl.src = 'dice-4.png';
  else if (dice === 5) diceEl.src = 'dice-5.png';
  else if (dice === 6) diceEl.src = 'dice-6.png';
*/

    //approach 2 for changing dice images acording to rolled number using STRING LITERALS
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1 . if true ,
    if (dice !== 1) {
      //add dice value to current scores
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch players
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      switchPlayer();
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');
      // currentScore = 0;
    }
  }
});

// GAME LOGIC 2 - HOLD THE VALUES

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active players score .
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //3.check ifplayer score is >=100.
    if (scores[activePlayer] >= 20) {
      playing = false;
      //2.hide dice
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //2. switch the active player after holding the value

      switchPlayer();
    }
  }
});

//GAME LOGIC 3 - RESET THE GAME

btnNew.addEventListener('click', init);
