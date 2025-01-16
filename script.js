const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['burnley','arsenal', 'brighton', 'astonvilla', 'manutd', 'mancity',
'newcastle', 'brentford', 'westham', 'luton', 'chelsea', 'palace', 'wolves', 'bournemouth',
'everton', 'sheffield', 'nottingham','fulham', 'spurs', 'liverpool', 'bayern', 'freiburg', 'augsburg','dortmund',
'wolfsburg','leipzig', 'leverkusen', 'bochum', 'stuttgart', 'frankfurt', 'bremen', 'mainz', 
'koln', 'mochegladbach', 'hertha', 'psg', 'lyonn', 'marseille', 'lille', 'renne', 'reims', 
'strasbourg', 'monaco', 'atletico', 'bilbao', 'sociedad','getafe', 'granada', 'osasuna', 'alaves',  'barcelona', 'girona', 'eiber', 
'real', 'valencia', 'villareal', 'mallorca', 'valecano', 'valladolid', 'betis', 'cadiz', 'monza', 
'juventus', 'lazio', 'roma', 'bologna', 'inter', 'milan', 'torino', 'empoli', 'napoli', 
'verona', 'fiorentina', 'atalanta', 'udinese', 'cagliari', 'lecce']
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];
let isGameOver = false; // Flag to track game state

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ' '}    
    </span>`).join('')}
`;

const innerWord = wordEl.innerText.replace(/\n/g, '');
if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats! You have won 😀';
    popup.style.display = 'flex';
    isGameOver = true; // Mark game as over
}
}


//display wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

//display parts 
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //If lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately, You Lost... 😒';
        popup.style.display = 'flex';
        isGameOver = true; // Mark game as over
    }
} 

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
//Keydown Letter press

window.addEventListener('keydown', e => {

    if (isGameOver) return; // Prevent input if the game is over

    if(e.keyCode >= 65 && e.keyCode <=90) {
        const letter = e.key;


        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
})
//play again button

playAgainBtn.addEventListener('click', () => {
    //empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    isGameOver = false; // Reset game over flag

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})


displayWord();
