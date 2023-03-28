const container = document.getElementById("container");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const startButton = document.getElementById("startButton");
const splashScreen = document.getElementById("splashScreen");
const messageContainer = document.getElementById("messageContainer");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");
let player1Score = 0;
let player2Score = 0;
let maxRounds = 3;
let currentRound = 1;
let ballSpeedX;
let ballSpeedY;
let paddleSpeed = 5;
let intervalId;

function handleStart() {
  splashScreen.style.display = "none";
}

document.addEventListener("keydown", handleStart);
document.addEventListener("click", handleStart);

function startGame() {
  resetBall();
  intervalId = setInterval(moveBall, 20);
}

function resetBall() {
  ball.style.left = "290px";
  ball.style.top = "190px";
  ballSpeedX = 5;
  ballSpeedY = 5;
}

function moveBall() {
  let ballLeft = parseInt(ball.style.left);
  let ballTop = parseInt(ball.style.top);
  let containerWidth = parseInt(container.offsetWidth);
  let containerHeight = parseInt(container.offsetHeight);
  let paddle1Top = parseInt(paddle1.style.top);
  let paddle2Top = parseInt(paddle2.style.top);

  // Move ball horizontally
  ballLeft += ballSpeedX;
  ball.style.left = ballLeft + "px";

  // Check for collision with left or right walls
  if (
    ballLeft <= 0 ||
    ballLeft >= containerWidth - parseInt(ball.offsetWidth)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Move ball vertically
  ballTop += ballSpeedY;
  ball.style.top = ballTop + "px";

  // Check for collision with top or bottom walls
  if (
    ballTop <= 0 ||
    ballTop >= containerHeight - parseInt(ball.offsetHeight)
  ) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collision with paddles
  if (
    ballLeft <= parseInt(paddle1.offsetWidth) &&
    ballTop + parseInt(ball.offsetHeight) >= paddle1Top &&
    ballTop <= paddle1Top + parseInt(paddle1.offsetHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballLeft + parseInt(ball.offsetWidth) >=
      containerWidth - parseInt(paddle2.offsetWidth) &&
    ballTop + parseInt(ball.offsetHeight) >= paddle2Top &&
    ballTop <= paddle2Top + parseInt(paddle2.offsetHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for game over
  if (
    ballLeft <= 0 ||
    ballLeft >= containerWidth - parseInt(ball.offsetWidth)
  ) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(intervalId);

  // Update scores
  if (ballSpeedX > 0) {
    player1Score++;
    updateScore();
  } else {
    player2Score++;
    updateScore();
  }

  // Check if game is over
  if (player1Score >= maxRounds || player2Score >= maxRounds) {
    let winner = player1Score > player2Score ? "Player 1" : "Player 2";
    alert(`${winner} wins the game!`);
    resetScores();
  } else {
    let message = `Player 1: ${player1Score}   Player 2: ${player2Score}\n\nRound ${currentRound} over!`;
    if (currentRound < maxRounds) {
      message += "\n\nClick OK to start the next round.";
    }
    if (message) {
      currentRound++;
      resetBall();
      intervalId = setInterval(moveBall, 20);
    } else {
      resetScores();
    }
  }
}

function resetScores() {
  player1Score = 0;
  player2Score = 0;
  currentRound = 1;
}

function resetBall() {
  ball.style.left = "290px";
  ball.style.top = "190px";
  ballSpeedX = 5;
  ballSpeedY = 5;
}

startButton.addEventListener("click", function () {
  startGame();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    movePaddle(paddle1, -paddleSpeed);
  } else if (event.key === "s") {
    movePaddle(paddle1, paddleSpeed);
  } else if (event.key === "ArrowUp") {
    movePaddle(paddle2, -paddleSpeed);
  } else if (event.key === "ArrowDown") {
    movePaddle(paddle2, paddleSpeed);
  }
});

// Set up event listeners for the arrow keys
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    movePaddle(paddle2, -1);
  } else if (event.key === "ArrowDown") {
    movePaddle(paddle2, 1);
  } else if (event.key === "w") {
    movePaddle(paddle1, -1);
  } else if (event.key === "s") {
    movePaddle(paddle1, 1);
  }
});

// Move the specified paddle by the specified amount
function movePaddle(paddle, direction) {
  let paddleRect = paddle.getBoundingClientRect();
  let paddleTop = paddleRect.top;
  console.log(`paddleTop before: ${paddleTop}`);

  let containerHeight = parseInt(container.offsetHeight);
  let paddleHeight = parseInt(paddle.offsetHeight);

  paddleTop += direction * paddleSpeed;
  paddleTop = Math.max(0, Math.min(paddleTop, containerHeight - paddleHeight));

  console.log(`paddleTop after: ${paddleTop}`);

  paddle.style.top = paddleTop + "px";
}

function getContainerHeight() {
  return parseInt(container.offsetHeight);
}

function getPaddleHeight(paddle) {
  return parseInt(paddle.offsetHeight);
}

function updateScore() {
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}

function showMessage(message) {
  messageContainer.textContent = message;
  messageContainer.style.display = "block";

  setTimeout(function () {
    messageContainer.style.display = "none";
  }, 3000);
}

if (player1Score >= maxScore) {
  showMessage("Player 1 wins!");
  // End the game logic here
} else if (player2Score >= maxScore) {
  showMessage("Player 2 wins!");
  // End the game logic here
}
