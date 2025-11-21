
let board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")
const highScoreElement = document.querySelector('#high-score')

const scoreElement =  document.querySelector('#score')

const timeElement = document.querySelector('#time')





let blockHeight = 50
let blockWidth = 50

let highScore = localStorage.getItem("highScore") || 0
let score = 0
let time = '00-00'

highScoreElement.innerText = highScore 



let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null
let timeIntervalId = null 

// random food
let food = {
    x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
}

let blocks = []
// default position of snake
let snake = [{
    x: 1, y: 3
}]




let direction = 'down'

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div')
        block.classList.add('block')
        board.appendChild(block)

        

        blocks[`${row}-${col}`] = block
    }
}

function render() {

    let head = null

    // to add food
    blocks[`${food.x}-${food.y}`].classList.add("food")



    // move snake becouse of this 
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)
        modal.style.display = "flex"
        startGameModal.style.display = "none"
        gameOverModal.style.display = "flex"

        return;
    }

    // logic for spreade food and add it to snake consume food 
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {
            x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
        }

        // readd the food or respon the food
        blocks[`${food.x}-${food.y}`].classList.add("food")

        snake.unshift(head)

        // score functionality
        score += 10
        scoreElement.innerText = score

        // high score logic 
        if(score>highScore){
            highScore = score
            localStorage.setItem("highScore", highScore.toString()) // saving score to localstorage in string 
        }



    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')

    })

    snake.unshift(head)
    snake.pop()


    // filled box with white color
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill')

    })


}


// start button 
startButton.addEventListener('click', () => {
    modal.style.display = "none"
    intervalId = setInterval(() => { render() }, 300)
    timeIntervalId = setInterval(()=> {
        // split time in mintues and seconds (destructing)
        let [min,sec] = time.split("-").map(Number)

        if(sec == 59){
            min += 1
            sec = 0
        } else {
            sec += 1
        }

        time = `${min}-${sec}`
        timeElement.innerText = time
    },1000)
})


restartButton.addEventListener('click', restartGame)


// restart game 
function restartGame() {
    
    // remove previous snake 
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
    })

    // reset time and score
    score = 0
    time = '00-00'

    scoreElement,innerText = score
    timeElement.innerText = time
    highScoreElement.innerText = highScore

    modal.style.display = "none"
    snake = [ { x: 1, y: 3 } ]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    intervalId = setInterval(() => { render() }, 300)
    // direction down when re-start
    direction = 'down'


}



// for controlling key 
addEventListener("keydown", (event) => {
    console.log(event.key);

    if (event.key === "ArrowUp") {
        direction = 'up'
    }
    else if (event.key === "ArrowDown") {
        direction = 'down'
    }
    else if (event.key === "ArrowRight") {
        direction = 'right'
    }
    else if (event.key === "ArrowLeft") {
        direction = 'left'
    }

})




