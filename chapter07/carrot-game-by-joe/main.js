let isStart = false;
let bugImgElementArray = [];
let carrotImgElemetnArray = [];

const playBtn = document.querySelector('.play');
const gameZone = document.querySelector('.gameZone');

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
    const shape = gameZone.getBoundingClientRect()
    const width = shape.width;
    const height = shape.height;
    for (let i = 0; i < 10; i++) {

        const xBug = getRandomArbitrary(width);
        const yBug = getRandomArbitrary(height);
        const xCarrot = getRandomArbitrary(width);
        const yCarrot = getRandomArbitrary(height);

        const bugElement = document.createElement('img');
        bugElement.setAttribute("class", `bug${i}`);
        bugElement.setAttribute("src", "img/bug.png");
        bugElement.setAttribute("alt", "bug image"); 
        bugElement.style.position = 'relative';
        bugElement.style.top = `${yBug}px`;
        bugElement.style.left = `${xBug}px`;
        gameZone.appendChild(bugElement);
        console.log(`bug${i} cordinate(${xBug}%, ${yBug}%)`)

        const carrotElement = document.createElement('img');
        carrotElement.setAttribute("class", `carrot${i}`);
        carrotElement.setAttribute("src", "img/carrot.png");
        carrotElement.setAttribute("alt", "carrot image"); 
        carrotElement.style.position = 'relative';
        carrotElement.style.top = `${yCarrot}px`;
        carrotElement.style.left = `${xCarrot}px`;
        gameZone.appendChild(carrotElement);
        console.log(`carrot${i}cordinate(${xCarrot}%, ${yCarrot}%)`)

    }
}

function getRandomArbitrary(width) {
    return Math.random() * (width - 20) + 20;
  }

