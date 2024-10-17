const addButton = document.getElementById('add-btn');
const removeButton = document.getElementById('remove-btn');
const inputList = document.getElementById('input-list');
const nameInput = document.getElementById('title');

function updateCounter() {
    const rows = document.querySelectorAll('.input-row');
    document.querySelector('.input-counter').textContent = rows.length;
}

function addInputRow(value = '') {
    const inputRow = document.createElement('div');
    inputRow.classList.add('input-row');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input-bar');
    input.placeholder = 'Enter text';
    input.value = value;

    inputRow.appendChild(input);
    inputList.appendChild(inputRow);

    input.focus();
    updateCounter();
}

document.addEventListener('paste', (event) => {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    const pastedLines = pasteData.split('\n');
    
    pastedLines.forEach(line => {
        addInputRow(line.trim());
    });

    event.preventDefault();  // Prevent the default paste behavior
});

addButton.addEventListener('click', () => addInputRow());

document.addEventListener('input-bar', () => {
    saveInput();
});

document.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('inputData'));
    console.log(savedData);
    
    if (savedData && savedData.length > 0) {
        loadInput();  // Load saved data
    } else {
        addInputRow();  // Ensure the input row is visible
        const inputBars = document.querySelectorAll('.input-bar');
        if (inputBars.length > 0) {
            inputBars[0].focus();  // Focus on the first input bar
        }
    }
});
removeButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('.input-row');
    if (rows.length > 1) {
        rows[rows.length - 1].remove();
    }
    updateCounter();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const rows = document.querySelectorAll('.input-bar');
        if (rows.length > 0 && document.activeElement === rows[rows.length - 1]) {
            addInputRow();
        }
    }
});

function saveInput() {
    const inputBars = document.querySelectorAll('.input-bar');
    const title = nameInput.value;
    const inputValues = Array.from(inputBars).map(input => input.value);
    localStorage.setItem('inputData', JSON.stringify(inputValues));
    localStorage.setItem('title', JSON.stringify(title));
}

function loadInput() {
    const savedData = JSON.parse(localStorage.getItem('inputData'));
    const titleData = JSON.parse(localStorage.getItem('title'));

    nameInput.value = titleData;

    if (savedData && savedData.length > 0) {
        savedData.forEach(value => {
            const inputRow = document.createElement('div');
            inputRow.classList.add('input-row');

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('input-bar');
            input.value = value;

            inputRow.appendChild(input);
            inputList.appendChild(inputRow);
        });
        updateCounter();
    }
    updateCounter();
}

function autosave() {
    setInterval(() => {
        saveInput();
    }, 1000);
}

autosave();

const clearButton = document.getElementById('clear-btn');
const continueButton = document.getElementById('continue-btn');

clearButton.addEventListener('click', () => {
    localStorage.removeItem('inputData');  // Remove the saved input data from localStorage
    nameInput.value = '';
    inputList.innerHTML = '';  // Clear the inputs from the page
    addInputRow();  // Add a fresh new input row
    updateCounter();  // Update the counter
});

continueButton.addEventListener('click', () => {
    saveInput();
    window.location.href = 'file:///Users/tijevandeursen/Desktop/RANKIEPANKIE/choice.html';
});