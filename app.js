var scores, roundScore, activePlayer;

init();

document.querySelector(".dice").style.display = "none";

setScoreZero();
setCurrentScoreZero();

document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. Random Number
  var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display the result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //3. Update the round score IF the rolled number was NOT a 1
  if (dice !== 1) {
    //Add score

    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //Next player
    nextPlayer();
    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;

  // Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
  // Check If player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Next player
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  setScoreZero();
  setCurrentScoreZero();
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function setScoreZero() {
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
}

function setCurrentScoreZero() {
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}
