const gameContainer = document.getElementById('game');
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let score = '';

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement('div');

		newDiv.classList.add(color);

		newDiv.addEventListener('click', handleCardClick);

		gameContainer.append(newDiv);
	}
}

function handleCardClick(event) {
	//returns if something on than a card is clicked or if card has already been "flipped"
	if (noClicking) return;
	if (event.target.classList.contains('flipped')) return;

	// selected target will change color based on cards "color" class
	let selected = event.target;
	selected.style.backgroundColor = selected.classList[0];

	// console.log('you just clicked', event.target);

	//check whether cards have vaule. Give them values.
	if (!card1 || !card2) {
		selected.classList.add('flipped');
		card1 = card1 || selected;
		card2 = selected === card1 ? null : selected;
		score++;
	}
	// If both cards have been selcted
	if (card1 && card2) {
		noClicking = true;

		let color1 = card1.className;
		let color2 = card2.className;

		// If cards match leave them "flipped"
		if (color1 === color2) {
			cardsFlipped += 2;
			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick);
			card1 = null;
			card2 = null;
			noClicking = false;
			// clear slate so new selections can be made
		} else {
			setTimeout(function() {
				card1.style.backgroundColor = '';
				card2.style.backgroundColor = '';
				card1.classList.remove('flipped');
				card2.classList.remove('flipped');
				card1 = null;
				card2 = null;
				noClicking = false;
			}, 1000);
		}
	}
	if (cardsFlipped === COLORS.length) alert('It is finished!!');
}

createDivsForColors(shuffledColors);
