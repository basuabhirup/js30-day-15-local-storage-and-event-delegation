const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];

const populateList = () => {
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
  populateList();
  localStorage.setItem("items", JSON.stringify(items));
  addItems.reset();
}

const toggleCheck = (e) => {
  if(!e.target.matches("input")) return;
  items[e.target.dataset.index]["done"] = e.target.checked;
  populateList();
  localStorage.setItem("items", JSON.stringify(items));
}

populateList();
addItems.addEventListener("submit", addNewItem);
itemsList.addEventListener("click", toggleCheck);
