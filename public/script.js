let displayBox = document.getElementById('displayBox');
let calculationList = document.getElementById('listItems');
let currentExpression = '';
let operation = '';

function appendToDisplay(value) {

    if(value == '+'){operation = 'SUM';}
    else if(value == '*'){operation = 'MULTIPLY';}
    else if(value == '-'){operation = 'SUBTRACT';}
    else if(value == '%'){operation = 'PERCENTAGE';}
    else if(value == '/'){operation='DIVIDE';}
    currentExpression += value
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
                         <td><button class="delbut" onclick="deleteItem(this)"><i class="fa-sharp fa-solid fa-trash fa-bounce fa-lg" style="color: #312f31;"></i></button></td>`;

    let tableBody = document.querySelector("#calculationList");
    tableBody.appendChild(newRow);

    currentExpression = result;

  } catch (error) {
    displayBox.value = 'Error';
  }
}

function deleteItem(item) {
  item.parentNode.parentNode.remove();
}

document.addEventListener("keydown",(event)=>{
    switch(event.key){
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
        case '0':{
            appendToDisplay(event.key);
            break;
        }
        case 'Enter':
        case 'Return':
        case '=':{
            calculate();
            break;
        }
        case 'Backspace':{
            clearDisplay();
            break;
        }
    }
});
