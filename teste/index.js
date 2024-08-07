const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const numPairs = 8; // Número total de pares de cartas
const words = ['JavaScript', 'Python', 'Ruby', 'Java', 'Swift', 'Kotlin', 'PHP', 'HTML'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function initializeGame() {
    // Limpa o tabuleiro antes de iniciar um novo jogo
    gameBoard.innerHTML = '';
    cards = [];
    
    // Cria um array de palavras e suas versões invertidas e embaralha
    let values = [];
    for (const word of words) {
        values.push(word, word.split('').reverse().join('')); // Adiciona a palavra e sua versão invertida
    }
    values = values.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numPairs * 2; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = values[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value.split('').reverse().join('') ||
        secondCard.dataset.value === firstCard.dataset.value.split('').reverse().join('')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Adiciona um listener para o botão de reset
resetButton.addEventListener('click', initializeGame);

// Inicializa o jogo ao carregar a página
initializeGame();
