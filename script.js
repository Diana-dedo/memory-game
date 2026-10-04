const cardsData = ['🍏', '🍏', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];

let movesCount = 0;
let matchesCount = 0;
let firstCard = null;
let secondCard = null;
let isBoardLocked = false;

const headerMenu = document.createElement('div');
headerMenu.className = 'header-menu';
document.body.append(headerMenu); 

const myButton = document.createElement('button');
myButton.textContent = 'Новая игра';
headerMenu.append(myButton);

const headerRight = document.createElement('div');
headerRight.className = 'header-right';
headerMenu.append(headerRight); 

const leaderboardButton = document.createElement('button');
leaderboardButton.textContent = 'Таблица лидеров';
headerRight.append(leaderboardButton);

leaderboardButton.addEventListener('click', () => {
    leaderModal.classList.add('is-visible');
});

const movesDisplay = document.createElement('div');
movesDisplay.className = 'score-stat';
movesDisplay.textContent = 'Число ходов: 0';
headerRight.append(movesDisplay);

const matchesDisplay = document.createElement('div');
matchesDisplay.className = 'score-stat';
matchesDisplay.textContent = 'Найдено пар: 0';
headerRight.append(matchesDisplay);

const winModal = document.createElement('div');
winModal.className = 'modal-overlay';
document.body.append(winModal);

const winContent = document.createElement('div');
winContent.className = 'modal-content';
winModal.append(winContent);

const winTitle = document.createElement('h2');
winTitle.textContent = 'Победа! 🎉';
winContent.append(winTitle);

const winText = document.createElement('p');
winContent.append(winText);

const winCloseButton = document.createElement('button');
winCloseButton.textContent = 'Играть снова';
winContent.append(winCloseButton);

const leaderModal = document.createElement('div');
leaderModal.className = 'modal-overlay';
document.body.append(leaderModal);

const leaderContent = document.createElement('div');
leaderContent.className = 'leaderboard-content';
leaderModal.append(leaderContent);

const leaderTitle = document.createElement('h2');
leaderTitle.textContent = 'Таблица лидеров 🏆';
leaderContent.append(leaderTitle);

const leaderList = document.createElement('ul');
leaderList.className = 'leaderboard-list';
leaderContent.append(leaderList);

const fakeSpans = [
    { name: 'Диана', score: '12 ходов' },
    { name: 'Алексей', score: '18 ходов' },
    { name: 'Мария', score: '22 хода' }
];

fakeSpans.forEach(player => {
    const li = document.createElement('li');
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = player.name;

    const scoreStrong = document.createElement('strong');
    scoreStrong.textContent = player.score;

    li.append(nameSpan, scoreStrong);
    leaderList.append(li);
})

const leaderCloseButton = document.createElement('button');
leaderCloseButton.textContent = 'Закрыть';
leaderContent.append(leaderCloseButton);

leaderCloseButton.addEventListener('click',() => {
    leaderModal.classList.remove('is-visible');
})

winCloseButton.addEventListener('click', () => {
    winModal.classList.remove('is-visible');
    myButton.click();
})

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
                matchesDisplay.textContent = `Найдено пар: ${matchesCount}`;

                movesCount++;
                movesDisplay.textContent = `Число ходов: ${movesCount}`;

                firstCard = null;
                secondCard = null;

                if (matchesCount === 8) {
                    setTimeout(() => {
                        winText.textContent = `Вы нашли все пары за ${movesCount} ходов!`;
                        winModal.classList.add('is-visible');
                    }, 500);
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
    matchesDisplay.textContent = 'Найдено пар: 0';

    startGame();
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
    }
}