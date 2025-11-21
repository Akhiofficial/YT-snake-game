
let board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")





let blockHeight = 50
let blockWidth = 50

let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null
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

        block.innerText = `${row}-${col}`

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

    // logic for spreade food and add it to snake 
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {
            x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
        }

        // readd the food or respon the food
        blocks[`${food.x}-${food.y}`].classList.add("food")

        snake.unshift(head)



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

// intervalId = setInterval(() => {

//     render()
// }, 400);



startButton.addEventListener('click', () => {
    modal.style.display = "none"
    intervalId = setInterval(() => { render() }, 300)
})


restartButton.addEventListener('click', restartGame)



function restartGame() {

    // remove previous snake 
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
    })

    modal.style.display = "none"
    snake = [ { x: 1, y: 3 } ]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    intervalId = setInterval(() => { render() }, 300)


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

