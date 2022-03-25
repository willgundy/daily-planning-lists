import { displayListItems } from './planner/planner.js';
import { getItemsByListId, updateItemToComplete, updateItemToActive } from './fetch-utils.js';

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

    listItemEl.append(listItemName);

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

        listItemEl.append(importanceDiv);

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



    importanceEl.innerText = item.importance;
    importanceIncreaseBtn.innerText = '+';
    importanceDecreaseBtn.innerText = '-';

    importanceIncreaseBtn.addEventListener('click', (e) => {
        let importance = e.path[1].childNodes[2].innerText;

        importance++;

        e.path[1].childNodes[2].innerText = importance;
    });

    importanceDecreaseBtn.addEventListener('click', (e) => {
        let importance = e.path[1].childNodes[2].innerText;

        importance--;

        e.path[1].childNodes[2].innerText = importance;
    });

    importanceDiv.classList.add('flex-row');

    importanceDiv.append(importanceIncreaseBtn, importanceDecreaseBtn, importanceEl);

    return importanceDiv;
}