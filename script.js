let tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

const gameBoard = document.getElementById('gameBoard');
const attemptsCounter = document.getElementById('attempts');
const restartButton = document.getElementById('restartButton');
const adminButton = document.getElementById('adminButton');
const adminModal = document.getElementById('adminModal');
const adminForm = document.getElementById('adminForm');
const closeModal = document.getElementById('closeModal');

let attempts = 0;
let flippedCards = [];
let matchedPairs = 0;

// Замените пути к изображениям на ваши
const images = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg'
];

// Создаем дубликаты карточек
const cards = [...images, ...images];

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(imagePath) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const front = document.createElement('div');
    front.className = 'card-front';
    
    const back = document.createElement('div');
    back.className = 'card-back';
    
    const img = document.createElement('img');
    img.src = imagePath;
    
    back.appendChild(img);
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsCounter.textContent = attempts;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.querySelector('img').src === card2.querySelector('img').src;

    if (match) {
        matchedPairs++;
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        if (matchedPairs === images.length) {
            setTimeout(() => {
                alert(`Поздравляем! Вы выиграли за ${attempts} попыток!`);
                restartButton.style.display = 'block';
            }, 500);
        }
    } else {
        card1.classList.add('wrong');
        card2.classList.add('wrong');
        setTimeout(() => {
            card1.classList.remove('flipped', 'wrong');
            card2.classList.remove('flipped', 'wrong');
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', () => {
    attempts = 0;
    matchedPairs = 0;
    flippedCards = [];
    attemptsCounter.textContent = attempts;
    
    gameBoard.innerHTML = '';
    
    initGame();
});

// Инициализация игры
function initGame() {
    const shuffledCards = shuffleCards(cards);
    shuffledCards.forEach(imagePath => {
        const card = createCard(imagePath);
        gameBoard.appendChild(card);
    });
}

initGame();

adminButton.addEventListener('click', () => {
    adminModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    adminModal.style.display = 'none';
    adminForm.reset();
});

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (login === 'famous' && password === 'proger2025') {
        adminModal.style.display = 'none';
        adminForm.reset();
        // Перенаправляем на страницу администратора
        window.location.href = '/admin.html';
    } else {
        alert('Неверный логин или пароль');
    }
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
        adminForm.reset();
    }
}); 