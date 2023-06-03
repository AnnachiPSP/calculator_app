let displayBox = document.getElementById('displayBox');
let calculationList = document.getElementById('calculationList');
let currentExpression = '';
let operation = '';

function appendToDisplay(value) {
  if (value == '+') {
    operation = 'SUM';
  } else if (value == '*') {
    operation = 'MULTIPLY';
  } else if (value == '-') {
    operation = 'SUBTRACT';
  } else if (value == '%') {
    operation = 'PERCENTAGE';
  } else if (value == '/') {
    operation = 'DIVIDE';
  } else if (value == 'cube') {
    operation = 'CUBE';
    calculateCube();
    return;
  }
  
  currentExpression += value;
  displayBox.value += value;
}

function clearDisplay() {
  currentExpression = '';
  displayBox.value = '';
}

function calculate() {
  try {
    let result = eval(currentExpression);
    displayBox.value = result;

    // Add the calculation to the list
    let newRow = document.createElement('tr');

    newRow.innerHTML = `<td>${operation}</td>
                         <td>${currentExpression}</td>
                         <td>${result}</td>
                         <td>
                          <button class="fontbut" onclick="repeatOperation('${currentExpression}', '${operation}')">
                            <i class="fa-sharp fa-solid fa-redo fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>
                         <td>
                          <button class="fontbut" onclick="deleteItem(this)">
                            <i class="fa-sharp fa-solid fa-trash fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>`;

    let tableBody = document.querySelector("#calculationList tbody");
    tableBody.appendChild(newRow);

    currentExpression = result;

  } catch (error) {
    displayBox.value = 'Error';
  }
}

function calculateCube() {
  try {
    let number = eval(currentExpression);
    let result = Math.pow(number, 3);
    displayBox.value = result;

    // Add the calculation to the list
    let newRow = document.createElement('tr');

    newRow.innerHTML = `<td>CUBE</td>
                         <td>${currentExpression}<sup>3</sup></td>
                         <td>${result}</td>
                         <td>
                          <button class="fontbut" onclick="repeatOperation('${currentExpression}', 'CUBE')">
                            <i class="fa-sharp fa-solid fa-redo fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>
                         <td>
                          <button class="fontbut" onclick="deleteItem(this)">
                            <i class="fa-sharp fa-solid fa-trash fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>`;

    let tableBody = document.querySelector("#calculationList tbody");
    tableBody.appendChild(newRow);

    currentExpression = result;

  } catch (error) {
    displayBox.value = 'Error';
  }
}


function repeatOperation(expression, operation) {
  try {
    let result;
    if (operation === 'SUM') {
      result = eval(`${currentExpression} + ${expression}`);
    } else if (operation === 'SUBTRACT') {
      result = eval(`${currentExpression} - ${expression}`);
    } else if (operation === 'MULTIPLY') {
      result = eval(`${currentExpression} * ${expression}`);
    } else if (operation === 'DIVIDE') {
      result = eval(`${currentExpression} / ${expression}`);
    } else if (operation === 'PERCENTAGE') {
      result = eval(`${currentExpression} * ${expression / 100}`);
    } else if (operation === 'CUBE') {
      result = Math.pow(eval(currentExpression), 3);
    }

    displayBox.value = result;

    // Add the calculation to the list
    let newRow = document.createElement('tr');

    newRow.innerHTML = `<td>${operation}</td>
                         <td>${currentExpression}</td>
                         <td>${result}</td>
                         <td>
                          <button class="fontbut" onclick="repeatOperation('${expression}', '${operation}')">
                            <i class="fa-sharp fa-solid fa-redo fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>
                         <td>
                          <button class="fontbut" onclick="deleteItem(this)">
                            <i class="fa-sharp fa-solid fa-trash fa-bounce fa-lg" style="color: #312f31;"></i>
                          </button>
                         </td>`;

    let tableBody = document.querySelector("#calculationList tbody");
    tableBody.appendChild(newRow);

    currentExpression = result;

  } catch (error) {
    displayBox.value = 'Error';
  }
}


function deleteItem(item) {
  item.parentNode.parentNode.remove();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
    case '.':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0': {
      appendToDisplay(event.key);
      break;
    }
    case 'Enter':
    case 'Return':
    case '=': {
      calculate();
      break;
    }
    case 'Backspace': {
      clearDisplay();
      break;
    }
  }
});
