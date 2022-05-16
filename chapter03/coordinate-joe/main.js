const screenLog = document.querySelector('div');
const image = document.querySelector('img');
const cordText = document.querySelector('span');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
console.log(image.getBoundingClientRect())

screenLog.addEventListener('mousemove', (e) => {
    // console.log(`${e.screenX}, ${e.screenY}`)
    image.style.top = `${e.clientY - image.offsetHeight * 0.5}px`;
    image.style.left = `${e.clientX - image.offsetWidth * 0.5}px`;
    cordText.style.top = `${e.clientY - image.offsetHeight * 0.5}px`;
    cordText.style.left = `${e.clientX - image.offsetWidth * 0.5}px`
    cordText.innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
    vertical.style.left = `${image.getBoundingClientRect().x + image.getBoundingClientRect().width / 3}px`;
    horizontal.style.top = `${image.getBoundingClientRect().y + image.getBoundingClientRect().height * 0.6}px`;
})