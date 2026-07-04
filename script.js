const HUMAN = "X";
const AI = "O";

let board = Array(9).fill("");

let gameOver = false;

let playerScore = 0;
let aiScore = 0;
let drawScore = 0;

const boardDiv = document.getElementById("board");

const status = document.getElementById("status");

function drawBoard(){

boardDiv.innerHTML="";

board.forEach((value,index)=>{

const cell=document.createElement("div");

cell.className="cell";

cell.innerHTML=value;

cell.onclick=()=>playerMove(index);

boardDiv.appendChild(cell);

});

}

drawBoard();

function playerMove(index){

if(board[index]!=""||gameOver)return;

board[index]=HUMAN;

drawBoard();

if(checkWinner(board,HUMAN)){

status.innerHTML="🎉 You Won!";

playerScore++;

updateScore();

gameOver=true;

return;

}

if(full(board)){

drawGame();

return;

}

status.innerHTML="AI Thinking...";

setTimeout(aiMove,400);

}

function aiMove(){

let bestScore=-Infinity;

let move;

for(let i=0;i<9;i++){

if(board[i]==""){

board[i]=AI;

let score=minimax(board,false);

board[i]="";

if(score>bestScore){

bestScore=score;

move=i;

}

}

}

board[move]=AI;

drawBoard();

if(checkWinner(board,AI)){

status.innerHTML="🤖 AI Wins";

aiScore++;

updateScore();

gameOver=true;

return;

}

if(full(board)){

drawGame();

return;

}

status.innerHTML="Your Turn (X)";

}

function minimax(newBoard,isMax){

if(checkWinner(newBoard,AI))return 10;

if(checkWinner(newBoard,HUMAN))return -10;

if(full(newBoard))return 0;

if(isMax){

let best=-Infinity;

for(let i=0;i<9;i++){

if(newBoard[i]==""){

newBoard[i]=AI;

best=Math.max(best,minimax(newBoard,false));

newBoard[i]="";

}

}

return best;

}

else{

let best=Infinity;

for(let i=0;i<9;i++){

if(newBoard[i]==""){

newBoard[i]=HUMAN;

best=Math.min(best,minimax(newBoard,true));

newBoard[i]="";

}

}

return best;

}

}

function checkWinner(b,p){

const win=[

[0,1,2],

[3,4,5],

[6,7,8],

[0,3,6],

[1,4,7],

[2,5,8],

[0,4,8],

[2,4,6]

];

return win.some(c=>

c.every(i=>b[i]==p)

);

}

function full(b){

return b.every(x=>x!="");

}

function drawGame(){

status.innerHTML="🤝 Draw";

drawScore++;

updateScore();

gameOver=true;

}

function updateScore(){

document.getElementById("playerScore").innerHTML=playerScore;

document.getElementById("aiScore").innerHTML=aiScore;

document.getElementById("drawScore").innerHTML=drawScore;

}

document.getElementById("restart").onclick=()=>{

board=Array(9).fill("");

gameOver=false;

status.innerHTML="Your Turn (X)";

drawBoard();

}