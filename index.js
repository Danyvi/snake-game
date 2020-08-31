const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const grid = document.querySelector('.grid');
let squares = [];
let currentSnake = [2,1,0];
// let currentSnake = [45,44,43];
let direction = 1;
let gridWidth = 10;

function createGrid() {
	for (let i=0; i < 100; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
		grid.appendChild(square);
		squares.push(square);
	}
}

createGrid();

currentSnake
	.forEach(
		index => squares[index].classList.add('snake')
	);

function move() {
	if(
		// check if the snakehead has hit bottom wall (if you are already at the bottom row and hit downkey)
		(currentSnake[0] + gridWidth >= 100 && direction === 10) ||
		// check if the snakehead has hit right wall (if you are already at the right wall and hit rightkey)
		(currentSnake[0] % gridWidth === 9 && direction === 1) ||
		// check if the snakehead has hit left wall (if you are already at the left wall and hit leftkey)
		(currentSnake[0] % gridWidth === 0 && direction === -1) ||
		// check if the snakehead has hit upper wall (if you are already at the upper row and hit upkey)
		(currentSnake[0] - gridWidth <=0 && direction === -10)  ||
		// if the direction that we are going in already contains
		// the class of .snake -> the snake goes into itself
		squares[currentSnake[0] + direction].classList.contains('snake')
	) {
		console.log('Game Over');
	}
	// remove last element from currentSnake array
	const tail = currentSnake.pop();
	// remove styling from last element
	squares[tail].classList.remove('snake');
	// add square in direction we are heading
	currentSnake.unshift(currentSnake[0] + direction);
	// add styling so we can see it
	squares[currentSnake[0]].classList.add('snake');
}

// let timerId = setInterval(move, 1000);
// clearInterval(timerId)

function control(e) {
	console.log(e);
	if (e.keyCode === 37) {
		// left key pressed
		direction = -1;
	} else if (e.keyCode === 38) {
		// up key pressed
		direction = -gridWidth;
	} else if (e.keyCode === 39) {
		// right key pressed
		direction = 1;
	} else if (e.keyCode === 40) {
		// down key pressed
		direction = +gridWidth;
	}
}

document.addEventListener('keydown', control); 