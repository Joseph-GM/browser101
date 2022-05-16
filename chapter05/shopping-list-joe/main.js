console.log('start')

let itemsArray = ["화장지", "세제", "비누"]

const textInput = document.querySelector('.textInput');
const addBtn = document.querySelector('.addBtn');
const itemsList = document.querySelector('.items');

renderList(itemsArray);

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addBtn.click();
    }
})

addBtn.addEventListener('click', () => {
    if (!textInput.value) {
        return
    }
    console.log(textInput.value);
    itemsArray.push(textInput.value);
    renderList(itemsArray);
    textInput.value = '';
});

function renderList(items) {
    let summary = '';
    items.forEach((element, index) => {
        console.log(index);
        summary = summary + `
        <li class="item">
            <span>${element}</span>
            <button class="deleteBtn" onclick="deleteBtnClicked(${index})">
                <i class="fa-solid fa-trash-can"></i>
        </button>
        </li>
        `
    });
    itemsList.innerHTML = summary
}

function deleteBtnClicked(index) {
    console.log(`${index} clicked`);
    itemsArray.splice(index,1);
    renderList(itemsArray);
}