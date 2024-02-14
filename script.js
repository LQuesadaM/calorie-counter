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
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">
    `;

    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories (e) {
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type=number]");
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type=number]"); 
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type=number]");
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type=number]");

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) {
        return
    }

    let consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    let remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    let surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories burn</p>
    `;

    output.classList.remove("hide");
}

function getCaloriesFromInputs (list) {
    let calories = 0;

    for (const item of list) {
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal);

        if (invalidInputMatch) {
           alert(`Invalid Input: ${invalidInputMatch[0]}`)
           isError = true
           return null
        }
        calories += Number(currVal);
    }

    return calories;
}

addEntryButton.addEventListener("click", addEntry);

calorieCounter.addEventListener("submit", calculateCalories);
