const cardsData = ['🍏', '🍏', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];

let movesCount = 0;
let matchesCount = 0;

const movesDisplay = document.createElement('div');
movesDisplay.textContent = 'Число ходов: 0';
document.body.append(movesDisplay);

const matchesDisplay = document.createElement('div');
matchesDisplay.textContent = 'Найденных пар: 0';
document.body.append(matchesDisplay);

const myButton = document.createElement('button');
myButton.textContent = 'Новая игра';
document.body.append(myButton);

const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';
document.body.append(gameBoard);

function startGame() {
    gameBoard.replaceChildren();
    shuffle(cardsData);
    cardsData.forEach((emoji) => {
        const card = document.createElement('button');
        card.className = 'card';
        card.dataset.emoji = emoji;
    card.addEventListener('click', () => {
        if (isBoardLocked) return;
        if (card.classList.contains('is-open')) return;
        card.classList.add('is-open');
        if (firstCard === null) {
            firstCard = card;
        } else {
            secondCard = card;
            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {

                matchesCount++;
                matchesDisplay.textContent = `Найденных пар: ${matchesCount}`;

                movesCount++;
                movesDisplay.textContent = `Число ходов: ${movesCount}`;

                firstCard = null;
                secondCard = null;

                if (matchesCount === 8) {
                    setTimeout(() => alert('Поздравляем! Вы нашли все пары!'), 500);
                }
            } else {
                movesCount++
                movesDisplay.textContent = `Число ходов: ${movesCount}`;

                isBoardLocked = true;
                setTimeout(() => {
                    firstCard.classList.remove('is-open');
                    secondCard.classList.remove('is-open');
                    firstCard = null;
                    secondCard = null;
                    isBoardLocked = false;
                }, 1000);
            }
        }
    })

    gameBoard.append(card);
    });
}

startGame();

myButton.addEventListener('click', () => {
    firstCard = null;
    secondCard = null;
    isBoardLocked = false;

    movesCount = 0;
    matchesCount = 0;
    movesDisplay.textContent = 'Число ходов: 0';
    matchesDisplay.textContent = 'Найденных пар: 0';

    startGame();
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let firstCard = null;
let secondCard = null;
let isBoardLocked = false;
