let isStart = false;
let bugImgElementArray = [];
let carrotImgElemetnArray = [];

const playBtn = document.querySelector('.play');
const gameZone = document.querySelector('.gameZone');
const infoZone = document.querySelector('.infoZone');

playBtn.addEventListener('click', () => {
    console.log("paly Btn clicked;")
    if (isStart) {
        playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`
        isStart = false;
    } else {
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        isStart = true;
        renderBugsAndCarrots();
    }
});

function renderBugsAndCarrots() {
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

        const xBug = getRandomArbitrary(0, gameZoneWidth-bugWidth);
        const yBug = getRandomArbitrary(infoZoneHeight, (infoZoneHeight+gameZoneHeight-bugHeight));
        const xCarrot = getRandomArbitrary(0, gameZoneWidth-carrotWidth);
        const yCarrot = getRandomArbitrary(infoZoneHeight, (infoZoneHeight+gameZoneHeight-carrotHeight));

        bugElement.setAttribute("class", `bug${i}`);
        bugElement.setAttribute("src", "img/bug.png");
        bugElement.setAttribute("alt", "bug image"); 
        bugElement.style.position = 'absolute';
        bugElement.style.top = `${yBug}px`;
        bugElement.style.left = `${xBug}px`;
        // bugElement.style.transform = `translate(${xBug}px, ${yBug}px)`;
        gameZone.appendChild(bugElement);
        console.log(`bug${i} cordinate(${xBug}%, ${yBug}%)`)

        
        carrotElement.setAttribute("class", `carrot${i}`);
        carrotElement.setAttribute("src", "img/carrot.png");
        carrotElement.setAttribute("alt", "carrot image"); 
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

