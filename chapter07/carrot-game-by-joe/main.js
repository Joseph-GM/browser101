let isStart = false;
let bugImgElementArray = [];
let carrotImgElemetnArray = [];
let timeCount = 10;
let carrotCount = 10;

const playBtn = document.querySelector('.play');
const gameZone = document.querySelector('.gameZone');
const infoZone = document.querySelector('.infoZone');
const timerNumber = document.querySelector('.timer__number');
const info = document.querySelector('.info');
const infoMessage = document.querySelector('.info__message');
const counteNumber = document.querySelector('.counter__number');
const reloadBtn = document.querySelector('.reload');

reloadBtn.addEventListener('click', () => {
    removeImages();
    info.style.display = 'none';
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
})

gameZone.addEventListener('click', (event) => {
    // console.log(event.dataset);
    if (isStart == false) {
        return;
    }
    if (event.target.dataset.imageName === "bug") {
        console.log("bug clicked")
        makeSound('bug_pull.mp3');
        isStart = false;
        infoMessage.innerHTML = `You Lost`;
        info.style.display = 'flex';
    } else if (event.target.dataset.imageName === "carrot") {
        makeSound('carrot_pull.mp3');
        carrotCount -= 1;
        console.log(`carrot count : ${carrotCount}`);
        className = event.target.className;
        const selectedCarrot = document.querySelector(`.${className}`);
        selectedCarrot.style.display = 'none';
        counteNumber.innerHTML = `${carrotCount}`;
    }

    if (timeCount > 0 && carrotCount === 0) {
        isStart = false;
        infoMessage.innerHTML = `You Win`;
        info.style.display = 'flex';
    }


    
})

playBtn.addEventListener('click', () => {
    console.log("paly Btn clicked;")

    if (isStart == true) {
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        isStart = false;
    } else {
        playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`
        isStart = true;
        removeImages();
        renderBugsAndCarrots();
        countDown();
    }
    // countDown();
});

function removeImages() {
    while (gameZone.hasChildNodes()) {
        gameZone.removeChild(gameZone.firstChild);
    }
}

function countDown() {
    let interval = setInterval(() => {
        timeCount -= 1;
        timerNumber.innerHTML = `00:0${timeCount}`;
        if (!isStart) {
            clearInterval(interval);
        }
        if (timeCount === 0 && carrotCount > 0) {
            clearInterval(interval);
            isStart = false;
            playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`
            infoMessage.innerHTML = `You Lost`;
            info.style.display = 'flex';
        }
    },1000);
}

function renderBugsAndCarrots() {
    timeCount = 10;
    carrotCount = 10;
    timerNumber.innerHTML = `00:${timeCount}`;
    counteNumber.innerHTML = `${carrotCount}`
    console.log('renderBugsAndCarrots() called')
    const gameZoneShape = gameZone.getBoundingClientRect()
    const gameZoneWidth = gameZoneShape.width;
    const gameZoneHeight = gameZoneShape.height;

    const infoZoneShape = infoZone.getBoundingClientRect();
    const infoZoneWidth = infoZoneShape.width;
    const infoZoneHeight = infoZoneShape.height;
   
    for (let i = 0; i < 10; i++) {

        const bugElement = document.createElement('img');
        const carrotElement = document.createElement('img');
        const bugWidth = bugElement.getBoundingClientRect().width;
        const bugHeight = bugElement.getBoundingClientRect().height;
        const carrotWidth = carrotElement.getBoundingClientRect().width;
        const carrotHeight = carrotElement.getBoundingClientRect().height;

        const xBug = getRandomArbitrary(0, gameZoneWidth-bugWidth*3);
        const yBug = getRandomArbitrary(infoZoneHeight, (infoZoneHeight+gameZoneHeight-bugHeight*3));
        const xCarrot = getRandomArbitrary(0, gameZoneWidth-carrotWidth*3);
        const yCarrot = getRandomArbitrary(infoZoneHeight, (infoZoneHeight+gameZoneHeight-carrotHeight*3));

        bugElement.setAttribute("class", `bug bug${i}`);
        bugElement.setAttribute("src", "img/bug.png");
        bugElement.setAttribute("alt", "bug image"); 
        bugElement.setAttribute("data-image-name", "bug");
        bugElement.style.position = 'absolute';
        bugElement.style.top = `${yBug}px`;
        bugElement.style.left = `${xBug}px`;
        // bugElement.style.transform = `translate(${xBug}px, ${yBug}px)`;
        gameZone.appendChild(bugElement);
        console.log(`bug${i} cordinate(${xBug}%, ${yBug}%)`)

        
        carrotElement.setAttribute("class", `carrot${i}`);
        carrotElement.setAttribute("src", "img/carrot.png");
        carrotElement.setAttribute("alt", "carrot image"); 
        carrotElement.setAttribute("data-image-name", "carrot");
        carrotElement.style.position = 'absolute';
        carrotElement.style.top = `${yCarrot}px`;
        carrotElement.style.left = `${xCarrot}px`;
        // carrotElement.style.transform = `translate(${xCarrot}px, ${yCarrot}px)`;
        gameZone.appendChild(carrotElement);
        console.log(`carrot${i}cordinate(${xCarrot}%, ${yCarrot}%)`)

    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function makeSound(soundFile) {
    let audio = new Audio(`sound/${soundFile}`);
    audio.play();
}

