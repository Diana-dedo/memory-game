const cardsData = ['🍏', '🍏', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', '🍒', '🍒', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'];

let movesCount = 0;
let matchesCount = 0;
let firstCard = null;
let secondCard = null;
let isBoardLocked = false;
let timeoutId = null;
let isGameFinished = false;

function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.append(overlay);

    const content = document.createElement('div');
    content.className = 'modal-content';
    overlay.append(content);

    const closeModal = () => {
        overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
            closeModal();
        }
    });

    return {
        overlay,
        content,
        open: () => {
            overlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
        },
        close: closeModal
    };
}

const winModal = createModal();
const leaderModal = createModal();

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

const scoreContainer = document.createElement('div');
scoreContainer.className = 'score-container';
document.body.append(scoreContainer); 

const movesDisplay = document.createElement('div');
movesDisplay.className = 'score-stat';
movesDisplay.textContent = 'Число ходов: 0';
scoreContainer.append(movesDisplay); 

const matchesDisplay = document.createElement('div');
matchesDisplay.className = 'score-stat';
matchesDisplay.textContent = 'Найдено пар: 0';
scoreContainer.append(matchesDisplay);

function saveResult(moves) {
    let results = JSON.parse(localStorage.getItem('memory_leaderboard')) || [];

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    results.push({ moves: moves, date: formattedDate, timestamp: Date.now() });

    results.sort((a, b) => {
        if (a.moves !== b.moves) return a.moves - b.moves;
        return a.timestamp - b.timestamp;
    });

    results = results.slice(0, 10);
    localStorage.setItem('memory_leaderboard', JSON.stringify(results));
}

function updateLeaderboardUI() {
    leaderModal.content.replaceChildren();

    const title = document.createElement('h2');
    title.textContent = 'Таблица лидеров 🏆';
    leaderModal.content.append(title);

    const results = JSON.parse(localStorage.getItem('memory_leaderboard')) ||[];

    if (results.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'Пока нет результатов';
        leaderModal.content.append(emptyMsg);
    } else {
        const list = document.createElement('ul');
        list.className = 'leaderboard-list';

        results.forEach((item, index) => {
            const li = document.createElement('li');

            const placeSpan = document.createElement('span');
            placeSpan.textContent = `${index + 1}.${item.moves} ходов`;

            const dateStrong = document.createElement('strong');
            dateStrong.textContent = item.date;

            li.append(placeSpan, dateStrong);
            list.append(li);
        });
        leaderModal.content.append(list);
    }

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Закрыть';
    closeBtn.addEventListener('click', leaderModal.close);
    leaderModal.content.append(closeBtn);
}

leaderboardButton.addEventListener('click', () => {
    updateLeaderboardUI();
    leaderModal.open();
});

const winTitle = document.createElement('h2');
winTitle.textContent = 'Победа! 🎉';
winModal.content.append(winTitle);

const winText = document.createElement('p');
winModal.content.append(winText);

const playAgainButton = document.createElement('button');
playAgainButton.textContent = 'Играть снова';
playAgainButton.style.marginRight = '10px';
winModal.content.append(playAgainButton);

playAgainButton.addEventListener('click', () => {
    winModal.close();
    myButton.click();
});

const winCloseButton = document.createElement('button');
winCloseButton.textContent = 'Закрыть';
winModal.content.append(winCloseButton);
winCloseButton.addEventListener('click', winModal.close);

const gameBoard = document.createElement('div');
gameBoard.className = 'game-board';
document.body.append(gameBoard);

function startGame() {
    gameBoard.replaceChildren();
    shuffle(cardsData);
    isGameFinished = false;

    cardsData.forEach((emoji) => {
        const card = document.createElement('button');
        card.className = 'card';
        card.dataset.emoji = emoji;

    card.addEventListener('click', () => {
        if (isBoardLocked || isGameFinished) return;
        if (card.classList.contains('is-open')) return;

        card.classList.add('is-open');

        if (firstCard === null) {
            firstCard = card;
        } else {
            secondCard = card;
            movesCount++;
            movesDisplay.textContent = `Число ходов: ${movesCount}`;

            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                matchesCount++;
                matchesDisplay.textContent = `Найдено пар: ${matchesCount}`;
                firstCard = null;
                secondCard = null;

                if (matchesCount === 8) {
                    isGameFinished = true;
                    saveResult(movesCount);

                    setTimeout(() => {
                        winText.textContent = `Вы нашли все пары за ${movesCount} ходов!`;
                        winModal.open();
                    }, 500);
                }
            } else {
                isBoardLocked = true;
                timeoutId = setTimeout(() => {
                    firstCard.classList.remove('is-open');
                    secondCard.classList.remove('is-open');
                    firstCard = null;
                    secondCard = null;
                    isBoardLocked = false;
                    timeoutId = null;
                }, 1000);
            }
        }
    })

    gameBoard.append(card);
    });
}

myButton.addEventListener('click', () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

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

startGame();