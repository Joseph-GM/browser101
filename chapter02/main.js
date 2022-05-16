const screenSize = document.getElementById("screen"); 
const outerSize = document.getElementById("outer");
const innerSize = document.getElementById("inner");
const clientSize = document.getElementById('client');

calculateSize();

window.addEventListener('resize', calculateSize);

function calculateSize() {
    console.log(`window.screen: ${window.screen.width}, ${window.screen.height}`);
    console.log(`window.outer: ${window.outerWidth}, ${window.outerHeight}`);
    console.log(`window.inner: ${window.innerWidth}, ${window.innerHeight}`);
    console.log(`documentElement.clientWidth: ${window.document.documentElement.clientWidth}, ${window.document.documentElement.clientHeight}`)
    screenSize.innerText = `window.screen: ${window.screen.width}, ${window.screen.height}`;
    outerSize.innerText = `window.outer: ${window.outerWidth}, ${window.outerHeight}`;
    innerSize.innerText = `window.inner: ${window.innerWidth}, ${window.innerHeight}`;
    clientSize.innerText = `documentElement.clientWidth: ${window.document.documentElement.clientWidth}, ${window.document.documentElement.clientHeight}`;
}

