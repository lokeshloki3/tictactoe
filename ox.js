const cells = document.querySelectorAll('.cell');
const players = document.querySelector('.players');
const turn = document.querySelector('.turn');
const restart = document.querySelector('#restart');
const winnerboy = document.querySelector('.winnerboy');

let currentPlayer = '';
let winner ='false';
let count =0;

const player1Button = document.querySelector('#player1');
const player2Button = document.querySelector('#player2');

function checkWinner(){
  if((cells[0].innerHTML !== '' && cells[0].innerHTML === cells[1].innerHTML && cells[1].innerHTML === cells[2].innerHTML) || 
  (cells[3].innerHTML !== '' && cells[3].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[5].innerHTML) ||
  (cells[6].innerHTML !== '' && cells[6].innerHTML === cells[7].innerHTML && cells[7].innerHTML === cells[8].innerHTML) || 
  (cells[0].innerHTML !== '' && cells[0].innerHTML === cells[3].innerHTML && cells[3].innerHTML === cells[6].innerHTML )|| 
  (cells[1].innerHTML !== '' && cells[1].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[7].innerHTML )||
  (cells[2].innerHTML !== '' && cells[2].innerHTML === cells[5].innerHTML && cells[5].innerHTML === cells[8].innerHTML) || 
  (cells[0].innerHTML !== '' && cells[0].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[8].innerHTML )||
  (cells[2].innerHTML !== '' &&  cells[2].innerHTML === cells[4].innerHTML && cells[4].innerHTML === cells[6].innerHTML)){
    winner='true';
    return true;
  } else {
    return false;
  }
}


player1Button.addEventListener('click', () =>{
  currentPlayer='Player1';
  players.classList.add('hide');
  turn.innerHTML = "Turn of Player X";
  turn.classList.remove('hide');
})

player2Button.addEventListener('click', () =>{
  currentPlayer='Player2';
  players.classList.add('hide');
  turn.innerHTML = "Turn of Player O";
  turn.classList.remove('hide');
})

restart.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.innerHTML='';
  });
  currentPlayer='';
  winnerboy.innerHTML='';
  winner='false';
  players.classList.remove('hide');
  turn.classList.add('hide');
  count=0;
})

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', () => {
    if(currentPlayer != '' && cells[i].innerHTML=='' && winner=='false'){
      count+=1;
      if(currentPlayer==='Player1')
      {
        cells[i].innerHTML ='X';
        currentPlayer='Player2';
        turn.innerHTML = "Turn of Player O";
        checkWinner();
        if(winner=='true'){
          winnerboy.innerHTML="Player X wins";
          currentPlayer='';
          turn.innerHTML = "";
        }
      }
      else if(currentPlayer==='Player2')
      {
        cells[i].innerHTML ='O';
        currentPlayer='Player1';
        turn.innerHTML = "Turn of Player X";
        checkWinner();
        if(winner=='true'){
          winnerboy.innerHTML="Player O wins";
          currentPlayer='';
          turn.innerHTML = "";
        }
      }
      if(count===9){
        winnerboy.innerHTML="Match Draws";
        turn.innerHTML = "";
      }
    }
  })
}