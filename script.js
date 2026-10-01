const cardsData = ['🍏', '🍏', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];


const myButton = document.createElement('button');
myButton.textContent = 'Новая игра';
document.body.append(myButton);

const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';
document.body.append(gameBoard);

cardsData.forEach((emoji) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.textContent = emoji;
    gameBoard.append(card);
})