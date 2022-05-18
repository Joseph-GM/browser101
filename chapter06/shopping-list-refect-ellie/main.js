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
let id = 0; //UUID 등 사용하는 것이 좋음
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
            </div>
        <div class="item__divider"></div>
    `;
    id++;
    return itemRow;


}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        onAdd();
    }
})

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
})