const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const imagePaths = [
    './imgHistoria/guerraFria.png',
    './imgHistoria/guerraFriaR.png',
    './imgHistoria/RevoluçãoC.png',
    './imgHistoria/RevoluçãoCR.png',
    './imgHistoria/RevoluçãoR.png',
    './imgHistoria/RevoluçãoRR.png',
    './imgHistoria/Cavalo.png',
    './imgHistoria/CavaloR.png',
];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function initializeGame() {
    gameBoard.innerHTML = '';
    cards = [];

    let values = [];
    for (const image of imagePaths) {
        values.push(image, image);
    }
    values = values.sort(() => Math.random() - 0.5);

    for (let i = 0; i < values.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = values[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.style.backgroundImage = `url(${this.dataset.image})`;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const firstCardImage = firstCard.dataset.image;
    const secondCardImage = secondCard.dataset.image;

    // Remove sufix "R" for comparison
    const removeSuffix = image => image.replace(/R\.png$/, '.png');

    if (removeSuffix(firstCardImage) === removeSuffix(secondCardImage)) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.style.backgroundImage = '';
            secondCard.style.backgroundImage = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
