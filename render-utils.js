import { displayListItems } from './planner/planner.js';
import { getItemsByListId, 
    updateItemToComplete, 
    updateItemToActive,
    updateItemImportance,
    deleteItem, 
    getListById} from './fetch-utils.js';

export function renderListButton(list) {
    const listButtonEl = document.createElement('button');

    listButtonEl.classList.add('activeListBtn');

    listButtonEl.addEventListener('click', async () => {
        const activeButton = document.querySelector('.displayList');
        if (activeButton) {
            activeButton.classList.remove('displayList');
        }

        listButtonEl.classList.add('displayList');
        await displayListItems(list);
    });

    listButtonEl.textContent = list.list_name + ' - ' + shortDate(list.date);
    listButtonEl.value = list.list_id;

    return listButtonEl;
}

export function renderActiveItems(item, list) {
    const listItemEl = document.createElement('li');
    const listItemName = document.createElement('span');

    if (item.status === 'complete') {
        listItemEl.classList.add('completed');
    }

    listItemName.textContent = item.item_name;
    listItemName.classList.add('itemName');

    listItemEl.append(listItemName);

    listItemEl.id = item.item_id;

    if (list.status === 'active') {
        listItemName.addEventListener('click', () => {
            if (listItemEl.classList.contains('completed')) {
                updateItemToActive(item.item_id);
            } else {
                updateItemToComplete(item.item_id);
            }

            listItemEl.classList.toggle('completed');
        });

        const importanceDiv = renderImportanceDiv(item);

        const removeItemDiv = renderRemoveItemDiv(item);

        listItemEl.append(importanceDiv, removeItemDiv);

    }

    return listItemEl;
}

export async function renderCompletedList(list) {
    const completedListDiv = document.createElement('div');

    completedListDiv.classList.add('completedListDiv');

    const listItems = await getItemsByListId(list.list_id);

    const completedListHeader = document.createElement('h3');
    completedListHeader.textContent = list.list_name + ' - ' + shortDate(list.date);
    completedListHeader.classList.add('completedHeader');

    completedListDiv.append(completedListHeader);

    for (let item of listItems) {
        const listItemEl = renderActiveItems(item, list);
        completedListDiv.append(listItemEl);
    }

    return completedListDiv;
}

export function shortDate(date) {
    var dateFormat = new Date(date);
    
    return (dateFormat.getMonth() + 1) + 
    '/' + dateFormat.getDate();
}

function renderImportanceDiv(item) {
    const importanceDiv = document.createElement('span');
    const importanceIncreaseBtn = document.createElement('button');
    const importanceDecreaseBtn = document.createElement('button');
    const importanceEl = document.createElement('span');
    importanceEl.classList.add('importanceEl');



    importanceEl.innerText = item.importance;
    importanceIncreaseBtn.innerText = '+';
    importanceDecreaseBtn.innerText = '-';

    importanceIncreaseBtn.addEventListener('click', (e) => {
        let importance = e.path[1].childNodes[0].innerText;
        const itemId = e.path[2].id;

        importance++;

        e.path[1].childNodes[0].innerText = importance;

        updateItemImportance(itemId, importance);
    });

    importanceDecreaseBtn.addEventListener('click', (e) => {
        let importance = e.path[1].childNodes[0].innerText;
        const itemId = e.path[2].id;

        importance--;

        e.path[1].childNodes[0].innerText = importance;
        updateItemImportance(itemId, importance);
    });

    importanceDiv.classList.add('flex-row');

    importanceDiv.append(importanceEl, importanceIncreaseBtn, importanceDecreaseBtn);

    return importanceDiv;
}

function renderRemoveItemDiv(item) {
    const removeItemEl = document.createElement('span');
    removeItemEl.classList.add('removeItem');
    removeItemEl.textContent = '\u00D7';
    removeItemEl.id = item.item_id;

    removeItemEl.addEventListener('click', async () => {
        await deleteItem(item.item_id); 
        const list = await getListById(item.list_id);
        await displayListItems(list);
    });

    return removeItemEl;
}

export function renderListHeader() {
    const listHeaderEl = document.createElement('ul');
    const itemHeader = document.createElement('span');
    const priorityHeader = document.createElement('span');
    const removeItemHeader = document.createElement('span');

    listHeaderEl.classList.add('listHeader');

    itemHeader.classList.add('itemName');

    itemHeader.textContent = 'Item';
    priorityHeader.textContent = 'Priority';
    removeItemHeader.textContent = 'Remove';

    listHeaderEl.append(itemHeader, priorityHeader, removeItemHeader);
    return listHeaderEl;
}