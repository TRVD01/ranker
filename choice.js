const choice1Button = document.getElementById('choice1-btn');
const choice2Button = document.getElementById('choice2-btn');
const resultDiv = document.getElementById('result');

let list = [];

// Function to prompt user to choose the better item between item1 and item2
async function askForTheBest(item1, item2) {
    choice1Button.innerText = item1;
    choice2Button.innerText = item2;
    const choice = await waitForChoiceClick();
    return choice === choice1Button ? item1 : item2;
}

// Wait for user to click one of the choice buttons
function waitForChoiceClick() {
    return new Promise((resolve) => {
        const handler1 = () => {
            cleanup();
            resolve(choice1Button);
        };
        const handler2 = () => {
            cleanup();
            resolve(choice2Button);
        };
        const cleanup = () => {
            choice1Button.removeEventListener('click', handler1);
            choice2Button.removeEventListener('click', handler2);
        };
        choice1Button.addEventListener('click', handler1);
        choice2Button.addEventListener('click', handler2);
    });
}

// Asynchronous Merge Sort based on user input
async function sortList(list) {
    if (list.length <= 1) return list;

    const middle = Math.floor(list.length / 2);
    const left = await sortList(list.slice(0, middle));
    const right = await sortList(list.slice(middle));

    return await merge(left, right);
}

// Merge function that asks user to compare items
async function merge(left, right) {
    let result = [];

    while (left.length && right.length) {
        const best = await askForTheBest(left[0], right[0]);
        if (best === left[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left.length ? left : right);
}

// Function to load input data from localStorage
function loadInput() {
    const storedList = localStorage.getItem('inputData');
    if (storedList) {
        list = JSON.parse(storedList);
    } else {
        // Initialize with default data if none exists
        list = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'];
        localStorage.setItem('inputData', JSON.stringify(list));
    }
    
    const titleData = localStorage.getItem('title');
    if (titleData) {
        // Use titleData as needed
    }
}

// Function to create and display the sorted list
function displaySortedList(sortedList) {
    // Clear any existing content
    resultDiv.innerHTML = '';

    sortedList.forEach((item, index) => {
        const input = document.createElement('input');
        input.classList.add('input-bar');
        input.type = 'text';
        input.readOnly = true;
        input.value = `${index + 1}: ${item}`;

        // Apply custom colors to top 3 items
        if (index === 0) {
            input.style.backgroundColor = '#FFD700'; // Gold
            input.style.color = '#000'; // Black text for contrast
        } else if (index === 1) {
            input.style.backgroundColor = '#C0C0C0'; // Silver
            input.style.color = '#000';
        } else if (index === 2) {
            input.style.backgroundColor = '#CD7F32'; // Bronze
            input.style.color = '#000';
        }

        // Optionally, add some margin for better spacing
        input.style.marginBottom = '8px';
        input.style.padding = '8px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';

        resultDiv.appendChild(input);
    });
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', async () => {
    loadInput();
    const sortedList = await sortList(list);
    displaySortedList(sortedList);
});

// Add fade animation to choice buttons on click
choice1Button.addEventListener('click', () => {
    choice1Button.classList.add('fade');

    setTimeout(() => {
        choice1Button.classList.remove('fade');
    }, 500); // Duration matches the CSS animation duration
});

choice2Button.addEventListener('click', () => {
    choice2Button.classList.add('fade');

    setTimeout(() => {
        choice2Button.classList.remove('fade');
    }, 500); // Duration matches the CSS animation duration
});

// Function to toggle sorted view (assuming you have elements with these classes)
function toggleSorted() {
    document.querySelector('.sorted').classList.toggle('active');
    document.querySelector('.result').classList.toggle('active');
    document.querySelector('.backdrop').classList.toggle('active');
}