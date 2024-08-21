const board = document.querySelector('.board');
const boardSize = 20;
const cells = [];
let snake = [{x : 10 , y : 10}];
let direction = {x : 0 , y : 0};
let score = 0;
let food = {x : 5 , y : 5};
let g_interval;

const eat_sound=new Audio('food.mp3')
const move=new Audio('move.mp3')
const over=new Audio('gameover.mp3')

/// intilize board
for(let i = 0; i < boardSize * boardSize; i++){
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cells.push(cell);
    board.appendChild(cell); 

}

function placefood(){
    /// remove existing food
    cells.forEach(cell => cell.classList.remove('food'));    
    /// new food
    cells[food.y * boardSize + food.x].classList.add('food');
}


///update board
function updateboard(){
    cells.forEach(cell => cell.classList.remove('food','snake'));
    snake.forEach(segment =>{
        cells[segment.y * boardSize + segment.x].classList.add('snake')
    });
    placefood();
}




function movesnake(){
    const head={x:snake[0].x + direction.x , y:snake[0].y + direction.y};

    if(head.x < 0 || head.x >=boardSize || head.y < 0 || head.y >=boardSize){
        clearInterval(g_interval);
        over.play();
        alert("Game Over!");
        return ;
    }

    if(snake.some(segment => segment.x===head.x && segment.y===head.y)){
        clearInterval(g_interval);
        over.play();
        alert("Game Over!");
        return ;
    }

    snake.unshift(head);
    move.play();

    if(head.x===food.x && head.y===food.y){
        food={
            x:Math.floor(Math.random() * boardSize),
            y:Math.floor(Math.random() * boardSize)
        };
        score++;
        eat_sound.play();
    }
    else{
          snake.pop();
    }

    updateboard();
}

function changedirection(event){
    switch (event.key) {
        case 'ArrowUp':
            if(direction.y===0) direction={x:0 , y:-1};
            break;
        case 'ArrowDown':
            if(direction.y===0) direction={x:0 , y: 1};
            break;
        case 'ArrowLeft':
            if(direction.x===0) direction={x:-1 , y: 0};
            break;
        case 'ArrowRight':
            if(direction.x===0) direction={x:1 , y: 0};
            break;
    
        default:
            break;
    }

    if(direction.x!==0 || direction.y!==0){
        if(!g_interval){
            g_interval=setInterval(movesnake,300);
        }
    }
    
}

function startGame(){
    updateboard();
    window.addEventListener("keydown",changedirection)
    
}

startGame();

