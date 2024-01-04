const wordEl =document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const btnLevelEl = document.getElementById('level-btn');
let settingsEl = document.getElementById('settings');
const levelFormEl =document.getElementById('level-form');
const levelEl =document.getElementById('level');
const gameover =document.getElementById('gameover-container');

const words = ['Dog','Best','Cat'];

let randomWords;
let score = 0;
let time = 5;
let level='medium';
const saveMode = localStorage.getItem('mode') !==null ? localStorage.getItem('mode') : 'medium';

const timeInterval= setInterval(updateTime,1000)
function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function renderWord(){
    randomWords = getRandomWord();
    wordEl.textContent = randomWords;
    timeEl.textContent = time; 
}

textEl.addEventListener('input',(e)=>{
    const inputText = e.target.value;
    if(inputText === randomWords){
    
        if(saveMode =='easy'){
            time+= 5;
        }
        else if(saveMode =='medium'){
            time+= 3;
        }
        else {
            time+= 1;
        }
        e.target.value = '';
        renderWord();
        updateScore();
    }
})

function updateScore(){
    score = score + 10;
    scoreEl.textContent = score;
};
function updateTime(){
    time--;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
    timeEl.textContent = time; 
}

function gameOver(){
    gameover.innerHTML = `<h1>Out of time!</h1>
    <p>Your score is ${score}</p>
    <button style="padding: 20px;cursor:pointer; color:white; border:0px; font-weight:400; background-color:#2c3e50; font-size:18px;" onclick="location.reload()">Click here to play again!</button>`;

    gameover.style.display = 'flex';
}
btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide')
})

levelEl.addEventListener('change',(e)=>{
        level = e.target.value;
        localStorage.setItem('mode',level);
});

function startgame(){
    levelEl.value = saveMode;
    if(saveMode =='easy'){
        time =15;
    }
    else if(saveMode =='medium'){
        time = 10;
    }
    else {
        time = 5;
    }
    renderWord();
}

startgame();
renderWord();
textEl.focus();

