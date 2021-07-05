const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const seals = document.querySelectorAll('.seal');
let endHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {

    return Math.round(Math.random() * (max - min) + min);
}

function randomhole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === endHole) {
        return randomhole(holes);
    }
    endHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(600, 1000);
    const hole = randomhole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startgame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000)
}

function wack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

seals.forEach(seal => seal.addEventListener('click', wack))

var bleep = new Audio();
bleep.src = "pop.mp3";