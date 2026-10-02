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

let firstCard = null;
let secondCard = null;

cardsData.forEach((emoji) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.dataset.emoji = emoji;

    card.addEventListener('click', () => {
        card.classList.add('is-open');
        if (firstCard === null) {
            firstCard = card;
        } else {
            secondCard = card;
            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('is-open');
                    secondCard.classList.remove('is-open');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    })

    gameBoard.append(card);
})