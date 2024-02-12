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