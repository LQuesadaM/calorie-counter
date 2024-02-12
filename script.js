const calorieCounter = document.querySelector("#calorie-counter");
const budgetNumberInput = document.querySelector("#budget");
const entryDropdown = document.querySelector("#entry-dropdown");
const addEntryButton = document.querySelector("#add-entry");
const clearButton = document.querySelector("#clear");
const output = document.querySelector("#output");

let isError = false;

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, "");
}

function isInvalidInput (str) {
    const regex = /\d+e\d+/gi;
    return str.match(regex);
}

function addEntry () {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">
    `;

    targetInputContainer.innerHTML += HTMLString;
}