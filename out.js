const holes = document.querySelectorAll('.hole'); // devlared the constant for the waterholes
const scoreBoard = document.querySelector('.score'); //constant fort the score board 
const seals = document.querySelectorAll('.seal'); // constant for the seals 
let endHole;
let timeUp = false; // variable for game time up , it's a boolian value , like we assume it's false , meaning the time is not up 
let score = 0; // we start the game with the score 0 , by 0 we declear  'score' directly  

function randomTime(min, max) {

    return Math.round(Math.random() * (max - min) + min); // randomtime() returns a value beetween minimum and maximum numbers  decleared in line 25 inside a function 
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

function peep() { // it functions the timing for the seals to show up
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

function startgame() { // when this function is started , the functions inside it are executed
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000) //sets the value true till 30000
}

function drop(e) {
    if (!e.isTrusted) return;
    score++; // adds 1 on every drop
    this.parentNode.classList.remove('up'); //removes the class up from the class tree
    scoreBoard.textContent = score;
}


function retry() {

}

seals.forEach(seal => seal.addEventListener('click', drop)) // for every click , executes the drop function 

var bleep = new Audio(); //plays sound on click 
bleep.src = "pop.mp3";