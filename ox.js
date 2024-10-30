const cells = document.querySelectorAll(".cell");
const players = document.querySelector(".players");
const turn = document.querySelector(".turn");
const restart = document.querySelector("#restart");
const winnerboy = document.querySelector(".winnerboy");

let currentPlayer = "";
let winner = "false";
let count = 0;

const player1Button = document.querySelector("#player1");
const player2Button = document.querySelector("#player2");

function checkWinner() {
  // if (
  //   (cells[0].innerHTML !== "" &&
  //     cells[0].innerHTML === cells[1].innerHTML &&
  //     cells[1].innerHTML === cells[2].innerHTML) ||
  //   (cells[3].innerHTML !== "" &&
  //     cells[3].innerHTML === cells[4].innerHTML &&
  //     cells[4].innerHTML === cells[5].innerHTML) ||
  //   (cells[6].innerHTML !== "" &&
  //     cells[6].innerHTML === cells[7].innerHTML &&
  //     cells[7].innerHTML === cells[8].innerHTML) ||
  //   (cells[0].innerHTML !== "" &&
  //     cells[0].innerHTML === cells[3].innerHTML &&
  //     cells[3].innerHTML === cells[6].innerHTML) ||
  //   (cells[1].innerHTML !== "" &&
  //     cells[1].innerHTML === cells[4].innerHTML &&
  //     cells[4].innerHTML === cells[7].innerHTML) ||
  //   (cells[2].innerHTML !== "" &&
  //     cells[2].innerHTML === cells[5].innerHTML &&
  //     cells[5].innerHTML === cells[8].innerHTML) ||
  //   (cells[0].innerHTML !== "" &&
  //     cells[0].innerHTML === cells[4].innerHTML &&
  //     cells[4].innerHTML === cells[8].innerHTML) ||
  //   (cells[2].innerHTML !== "" &&
  //     cells[2].innerHTML === cells[4].innerHTML &&
  //     cells[4].innerHTML === cells[6].innerHTML)
  // ) {
  //   winner = "true";
  //   return true;
  // } else {
  //   return false;
  // }
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Store winning cells
  let winningCells = [];

  for (let i = 0; i < winConditions.length; i++) {
  // for (const condition of winConditions) {
    // for (let i = 0; i < winConditions.length; i++) {
    //   const [a, b, c] = winConditions[i]; // Correctly retrieve the winning cells
    //   const [a, b, c] = condition;
    //   if (
    //     cells[a].innerHTML !== "" &&
    //     cells[a].innerHTML === cells[b].innerHTML &&
    //     cells[b].innerHTML === cells[c].innerHTML
    //   ) {
    //     // Highlight the winning cells
    //     cells[a].classList.add("winning-cell");
    //     cells[b].classList.add("winning-cell");
    //     cells[c].classList.add("winning-cell");
    //     winner = "true";
    //     return true;
    //   }
    // }
    // return false;

    const [a, b, c] = winConditions[i];
    // Get the value of the first cell
    const player = cells[a].innerHTML;

    // Check if the cells are not empty and they belong to the same player
    if (
      player !== "" &&
      player === cells[b].innerHTML &&
      player === cells[c].innerHTML
    ) {
      // Collect winning cell indices
      winningCells.push(a, b, c);
      // Set winner flag
      winner = "true";
    }
  }

  // Highlight all winning cells
  winningCells.forEach((index) => {
    cells[index].classList.add("winning-cell");
  });
  // Return true if there are winning cells
  return winningCells.length > 0;
}

player1Button.addEventListener("click", () => {
  currentPlayer = "Player1";
  players.classList.add("hide");
  turn.innerHTML = "Turn of Player X";
  turn.classList.remove("hide");
});

player2Button.addEventListener("click", () => {
  currentPlayer = "Player2";
  players.classList.add("hide");
  turn.innerHTML = "Turn of Player O";
  turn.classList.remove("hide");
});

restart.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    // Reset winning cell styles
    cell.classList.remove("winning-cell");
  });
  currentPlayer = "";
  winnerboy.innerHTML = "";
  winner = "false";
  players.classList.remove("hide");
  turn.classList.add("hide");
  count = 0;
});

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => {
    if (
      currentPlayer !== "" &&
      cells[i].innerHTML === "" &&
      winner === "false"
    ) {
      count += 1;
      if (currentPlayer === "Player1") {
        cells[i].innerHTML = "X";
        currentPlayer = "Player2";
        turn.innerHTML = "Turn of Player O";
        if (checkWinner()) {
          winnerboy.innerHTML = "Player X wins";
          currentPlayer = "";
          turn.innerHTML = "";
          return;
        }
      } else if (currentPlayer === "Player2") {
        cells[i].innerHTML = "O";
        currentPlayer = "Player1";
        turn.innerHTML = "Turn of Player X";
        if (checkWinner()) {
          winnerboy.innerHTML = "Player O wins";
          currentPlayer = "";
          turn.innerHTML = "";
          return;
        }
      }
      if (count === 9) {
        winnerboy.innerHTML = "Match Draws";
        turn.innerHTML = "";
      }
    }
  });
}
