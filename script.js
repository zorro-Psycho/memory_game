// document.addEventListener('DOMContentLoaded', () => {
//     const cardImages = [
//         'images/images1.jpg', 'images/images2.jpg', 'images/images3.jpg',
//         'images/images4.jpg', 'images/images5.jpg', 'images/images6.jpg',
//         'images/images7.jpeg', 'images/images8.jpeg'
//     ];

//     let cardArray = [...cardImages, ...cardImages];
//     cardArray.sort(() => 0.5 - Math.random());

//     const gameBoard = document.getElementById('gameBoard');
//     const scoreElement = document.getElementById('score');
//     const restartBtn = document.getElementById('restartBtn');

//     let cardsChosen = [];
//     let cardsChosenId = [];
//     let cardsWon = [];
//     let score = 0;

//     function createBoard() {
//         gameBoard.innerHTML = ''; // Clear the board
//         cardArray.forEach((image, index) => {
//             const card = document.createElement('div');
//             card.classList.add('card');
//             card.setAttribute('data-id', index);
//             card.addEventListener('click', flipCard);

//             const cardImage = document.createElement('img');
//             cardImage.setAttribute('src', image);
//             cardImage.style.display = 'none'; // Initially hide the image

//             card.appendChild(cardImage);
//             gameBoard.appendChild(card);
//         });
//     }

//     function flipCard() {
//         const cardId = this.getAttribute('data-id');
//         if (cardsChosen.length < 2 && !cardsChosenId.includes(cardId) && !cardsWon.includes(cardId)) {
//             cardsChosen.push(cardArray[cardId]);
//             cardsChosenId.push(cardId);
//             this.classList.add('flipped');
//             this.querySelector('img').style.display = 'block'; // Show the image

//             if (cardsChosen.length === 2) {
//                 setTimeout(checkForMatch, 500);
//             }
//         }
//     }

//     function checkForMatch() {
//         const cards = document.querySelectorAll('.card');
//         const [optionOneId, optionTwoId] = cardsChosenId;
//         if (cardsChosen[0] === cardsChosen[1]) {
//             cards[optionOneId].removeEventListener('click', flipCard);
//             cards[optionTwoId].removeEventListener('click', flipCard);
//             cardsWon.push(optionOneId, optionTwoId);
//             score += 10;
//             scoreElement.textContent = score;
//         } else {
//             cards[optionOneId].classList.remove('flipped');
//             cards[optionTwoId].classList.remove('flipped');
//             cards[optionOneId].querySelector('img').style.display = 'none';
//             cards[optionTwoId].querySelector('img').style.display = 'none';
//         }
//         cardsChosen = [];
//         cardsChosenId = [];
//         if (cardsWon.length === cardArray.length) {
//             setTimeout(() => {
//                 alert('Congratulations! You found all matches!');
//                 sendScore(score);
//                 resetBoard();
//             }, 500);
//         }
//     }

//     function resetBoard() {
//         cardArray.sort(() => 0.5 - Math.random());
//         cardsChosen = [];
//         cardsChosenId = [];
//         cardsWon = [];
//         score = 0;
//         scoreElement.textContent = score;
//         createBoard();
//     }

//     function sendScore(score) {
//         window.parent.postMessage({ type: 'submit-score', score }, '*');
//     }

//     restartBtn.addEventListener('click', resetBoard);

//     createBoard();
// });
document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'images/images1.jpg', 'images/images2.jpg', 'images/images3.jpg',
        'images/images4.jpg', 'images/images5.jpg', 'images/images6.jpg',
        'images/images7.jpeg', 'images/images8.jpeg'
    ];

    let cardArray = [...cardImages, ...cardImages];
    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    const scoreElement = document.getElementById('score');
    const attemptsElement = document.getElementById('attempts');
    const restartBtn = document.getElementById('restartBtn');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;
    let attempts = 0;

    function createBoard() {
        gameBoard.innerHTML = ''; // Clear the board
        cardArray.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            card.addEventListener('click', flipCard);

            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', image);
            cardImage.style.display = 'none'; // Initially hide the image

            card.appendChild(cardImage);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (cardsChosen.length < 2 && !cardsChosenId.includes(cardId) && !cardsWon.includes(cardId)) {
            cardsChosen.push(cardArray[cardId]);
            cardsChosenId.push(cardId);
            this.classList.add('flipped');
            this.querySelector('img').style.display = 'block'; // Show the image

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;

        attempts++;
        attemptsElement.textContent = attempts; // Update the attempts display

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(optionOneId, optionTwoId);

            // Calculate score based on attempts
            let points = Math.max(10 - Math.floor((attempts - cardsWon.length / 2) / 2), 1); // Ensure a minimum of 1 point is awarded
            score += points;
            scoreElement.textContent = score;
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
            cards[optionOneId].querySelector('img').style.display = 'none';
            cards[optionTwoId].querySelector('img').style.display = 'none';
        }
        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length) {
            setTimeout(() => {
                alert('Congratulations! You found all matches!');
                sendScore(score);
                resetBoard();
            }, 500);
        }
    }

    function resetBoard() {
        cardArray.sort(() => 0.5 - Math.random());
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        score = 0;
        attempts = 0;
        scoreElement.textContent = score;
        attemptsElement.textContent = attempts;
        createBoard();
    }

    function sendScore(score) {
        window.parent.postMessage({ type: 'submit-score', score }, '*');
    }

    restartBtn.addEventListener('click', resetBoard);

    createBoard();
});

