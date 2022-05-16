console.log('start')

const textInput = document.querySelector('.textInput');
const addBtn = document.querySelector('.addBtn');

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addBtn.click();
    }
})

addBtn.addEventListener('click', () => {
    console.log(textInput.value);
    textInput.value = '';
});