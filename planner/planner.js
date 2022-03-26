import { 
    getListById,
    getActiveLists,
    getCompletedLists,
    updateListToCompleted,
    createList,
    getItemsByListId,
    createItem,
    logout,
    checkAuth
} from '../fetch-utils.js';

import { renderActiveItems, 
    renderCompletedList, 
    renderListButton, 
    shortDate,
    renderListHeader
} from '../render-utils.js';


const listForm = document.getElementById('list-form');
const logoutBtn = document.getElementById('logout');

const activeListBtnContainer = document.getElementById('activeListBtnContainer');

const activeListName = document.getElementById('activeListName');

const activeListItemContainer = document.getElementById('activeListItemContainer');
const finishListBtn = document.getElementById('finishListBtn');

const completedListsContainer = document.getElementById('completedListsContainer');

const itemInput = document.getElementById('itemInput');
const itemInputBtn = document.getElementById('itemInputBtn');

const selectedActiveList = document.getElementById('selectedActiveList');


let listName = '';
let listDate = '';

checkAuth();

window.addEventListener('load', async () => {
    await displayListBtns();
    await displayCompletedLists();
});

async function displayListBtns() {
    const lists = await getActiveLists();

    activeListBtnContainer.innerHTML = '';

    for (let list of lists) {
        const listBtnEl = renderListButton(list);

        activeListBtnContainer.append(listBtnEl);
    }
}

export async function displayListItems(list) {
    const items = await getItemsByListId(list.list_id);

    activeListName.textContent = list.list_name + ' for ' + shortDate(list.date);

    activeListItemContainer.innerHTML = '';

    const listHeader = renderListHeader();

    activeListItemContainer.append(listHeader);

    selectedActiveList.classList.remove('hidden');

    for (let item of items) {
        const itemEl = renderActiveItems(item, list);

        activeListItemContainer.append(itemEl);
    }
}

listForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(listForm);

    listName = data.get('list-name');
    listDate = data.get('list-date');

    listForm.reset();

    const newList = createNewList(listName, listDate);

    await createList(newList);

    displayListBtns();
});

function createNewList(listName, listDate) {
    return {
        list_name: listName,
        date: listDate,
        status: 'active'
    };
}

function createNewItem(itemName, listId) {
    return {
        list_id: listId,
        item_name: itemName,
        status: 'active'
    };
}

itemInputBtn.addEventListener('click', async () => {
    const itemValue = itemInput.value;

    const activeList = document.querySelector('.displayList');

    const listId = activeList.value;

    const list = await getListById(listId);

    const newItem = createNewItem(itemValue, listId);

    await createItem(newItem);

    itemInput.value = '';

    await displayListItems(list);
});

finishListBtn.addEventListener('click', async () => {
    const activeList = document.querySelector('.displayList');

    const listId = activeList.value;

    await updateListToCompleted(listId);

    displayListBtns();

    activeListItemContainer.innerHTML = '';

    activeListName.innerHTML = '';

    selectedActiveList.classList.add('hidden');

    displayCompletedLists();
});

async function displayCompletedLists() {
    const completedLists = await getCompletedLists();

    completedListsContainer.innerHTML = '';

    for (let list of completedLists) {
        const completedListEl = await renderCompletedList(list);
        completedListsContainer.append(completedListEl);
    }
}

logoutBtn.addEventListener('click', () => {
    logout();
});