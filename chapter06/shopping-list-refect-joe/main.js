const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');


function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    console.log(text);
    // 2. 새로운 아이템을 만듬 (택스트 + 삭세 버튼)
    const item = createItem(text);
    // 3. items 컨테이너 안에 새로 만든 아이템을 추가
    items.appendChild(item);
    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block: 'center'});
    // 4. 인풋을 초기화 한다.
    input.value = "";
    // 5. 포커스 자동으로 오게
    input.focus();
}

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item__divider');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const name = document.createElement('span');
    name.setAttribute('class', 'item__name');
    name.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    // deleteBtn.addEventListener('click', ()=> {
    //     items.removeChild(itemRow);
    // })

    item.appendChild(name);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;


}

items.addEventListener('click', (event) => {
    if (event.target.className == 'fa-solid fa-trash-can') {
        const elem = event.target.parentNode.parentNode.parentNode;
        elem.remove();
    }
})

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        onAdd();
    }
})