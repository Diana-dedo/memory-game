const cardsData = ['🍏', '🍏', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];


const myButton = document.createElement('button');
myButton.textContent = 'Новая игра';
document.body.append(myButton);

const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';
document.body.append(gameBoard);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cardsData);

cardsData.forEach((emoji) => {
    const card = document.createElement('button');
    card.className = 'card';
    // card.textContent = emoji;
    card.dataset.emoji = emoji;

    card.addEventListener('click', () => {
        card.classList.add('is-open');
    })

    gameBoard.append(card);
})