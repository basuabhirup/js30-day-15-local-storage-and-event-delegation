const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];
const clearAllButton = document.querySelector('[name=clearAll]');
const checkAllButton = document.querySelector('[name=checkAll]');
const uncheckAllButton = document.querySelector('[name=uncheckAll]');


const populateList = (itemsList, items) => {
  itemsList.innerHTML = items.map((item, i) => {
    return `<li>
            <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? "checked": ""}>
            <label for="item${i}">${item.name}</label>
            </li>`
  }).join("");
}

const addNewItem = (e) => {
  e.preventDefault();
  const itemName = addItems.querySelector("[name=item]").value;
  const item = {
    name: itemName,
    done: false
  }
  items.push(item);
  populateList(itemsList, items);
  localStorage.setItem("items", JSON.stringify(items));
  addItems.reset();
}

const toggleCheck = (e) => {
  if(!e.target.matches("input")) return;
  items[e.target.dataset.index]["done"] = e.target.checked;
  populateList(itemsList, items);
  localStorage.setItem("items", JSON.stringify(items));
}

const clearAll = () => {
  items.splice(0, items.length);
  populateList(itemsList, items);
  localStorage.setItem("items", JSON.stringify(items));
}

const checkAll = () => {
  let newItems = items.map(item => ({name: item.name, done: true}));
  populateList(itemsList, newItems);
  localStorage.setItem("items", JSON.stringify(newItems));
}

const uncheckAll = () => {
  let newItems = items.map(item => ({name: item.name, done: false}));
  populateList(itemsList, newItems);
  localStorage.setItem("items", JSON.stringify(newItems));
}

populateList(itemsList, items);
addItems.addEventListener("submit", addNewItem);
itemsList.addEventListener("click", toggleCheck);
clearAllButton.addEventListener("click", clearAll);
checkAllButton.addEventListener("click", checkAll);
uncheckAllButton.addEventListener("click", uncheckAll);
