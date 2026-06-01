let ul = document.querySelector('ul')
let form = document.querySelector('form')
let search = document.querySelector('input')
let clear = document.querySelector('#clear-btn')
let submit = document.querySelector('Button')
let filterInput = document.querySelector('.filter');
let start = document.querySelector('.start')
let stopBtn = document.querySelector('.stop')


//functions
function addItem(e) {
    e.preventDefault()
    let searchInput = search.value
    if (searchInput === '') {
        alert('Please input Item')
        return
    }
    if (getStorage().includes(searchInput)) {
        alert('Cant input item twice')
        return
    }

    // add to Dom
    addDom(searchInput)
    //add to storage
    addStorage(searchInput)

    search.value = ''
    checkUI()
}
function addDom(item) {
    let list = document.createElement('li')
    list.className = "item"
    list.innerText = item
    ul.appendChild(list)
}

function addStorage(item) {
    let store = getStorage()
    store.push(item)
    localStorage.setItem('item', JSON.stringify(store))
}
function getStorage() {
    let store = localStorage.getItem('item')
    if (store === null) {
        store = []
    } else {
        store = JSON.parse(store)
    }
    return store
}
function clearAll(e) {
    e.preventDefault()
    let listItems = document.querySelectorAll('li')
    listItems.forEach((item) => item.remove())

    localStorage.removeItem('item')
    checkUI()
}
function loadStorage() {
    let store = getStorage()
    store.forEach((item) => addDom(item))
}
function removeItem(e) {
    if (e.target.tagName === "LI") {   // make sure it’s an <li>
        e.target.remove();

        // also update storage
        let store = getStorage();
        store = store.filter(item => item !== e.target.innerText);
        localStorage.setItem('item', JSON.stringify(store));
    }
    checkUI()
}

function filterItems(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(li => {
        if (li.innerText.toLowerCase().includes(text)) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    });
}
function checkUI() {
    if (getStorage().length == 0) {
        filterInput.style.display = 'none'
    } else {
        filterInput.style.display = 'block'
    }
}
let intervalId
function colorChange() {
    intervalId = setInterval(() => {
        if (document.body.style.backgroundColor == 'white') {
            document.body.style.backgroundColor = 'black'
            document.body.style.color = 'black'
        } else {
            document.body.style.backgroundColor = 'white'
            document.body.style.color = 'black'
        }
    }, 1000)
}
function colorStop() {
    clearInterval(intervalId)
}













//events
form.addEventListener('submit', addItem)
clear.addEventListener('click', clearAll)
window.addEventListener('DOMContentLoaded', loadStorage)
window.addEventListener('DOMContentLoaded', checkUI)
ul.addEventListener('dblclick', removeItem)
filterInput.addEventListener('keyup', filterItems);
start.addEventListener('click', colorChange)
stopBtn.addEventListener('click', colorStop)


