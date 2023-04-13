
// Save to localStorage the name of the user and start the score count.
function login(){
    const user = document.getElementById('username').value;
    window.localStorage.setItem('user', user);
    window.localStorage.setItem('scoreWins',0);
    window.localStorage.setItem('scoreLost',0);
    window.open('mastermind.html', '_self');
}

var nInputNumb; // List Of the Inputs that will store the entered number
var nRowsAdded; // Row the user will input the digit 0-> 9.
var corrNumber; // Value of the correct number to guess
var gameEnded; // If True the game has ended, if not the user can enter digits.
var nElementNumberCorr; //Array of number of occurrences of every digit in the correct number


// List of inputs that we will replace in the table to the row the user will be entering the digits.
var listInputs = [
'<input type="text" oninput="onFill(event,0)" onkeydown="detectBack(event,0)" class="input-num" maxlength="1"></input>',
'<input type="text" oninput="onFill(event,1)" onkeydown="detectBack(event,1)" class="input-num" maxlength="1"></input>',
'<input type="text" oninput="onFill(event,2)" onkeydown="detectBack(event,2)" class="input-num" maxlength="1"></input>',
'<input type="text" oninput="onFill(event,3)" onkeydown="detectBack(event,3)" class="input-num" maxlength="1"></input>'];

//Funcion that will be caled when the screen has loaded.
function loadElements(){
    nInputNumb = document.getElementsByClassName('input-num');
    nRowsAdded = 0;

    //Clear input to not get the previous one on reload
    clearInputs();

    corrNumber = generateValidNumber();
    console.log("The correct answer: " + corrNumber);


    // Show the name of the user in the screen.
    const user = window.localStorage.getItem('user');
    document.getElementById('nametag').textContent= user; 

    //Show the number of wins and loses of the user.
    const win = window.localStorage.getItem('scoreWins');
    const lost = window.localStorage.getItem('scoreLost');
    document.getElementById('vigtag').textContent = "Victories: " + win;
    document.getElementById('lostag').textContent = "Derrotes: " + lost;

    //We focus the first input to start entering digits.
    nInputNumb[0].focus();

    gameEnded = false;

    //We calculate the array that will allow us to tell the digits that appear in the correct number. We can do it only when we generate a new number so we don't have to calculate every time.
    nElementNumberCorr =  calculateNumbersArray(corrNumber);
}


//Generate an array with the number of appearances that each digit has in the correct number.
//For example: The value 1256 would be [0,1,1,0,0,1,1,0,0,0]
function calculateNumbersArray(calcValue){

    let nElementNumber = [0,0,0,0,0,0,0,0,0,0];
    let numbAct;
    for(i = 0; i < 4; i ++){
        numbAct = calcValue%10;
        calcValue = Math.trunc(calcValue/10);
        nElementNumber[numbAct] = 1;
    }

    return nElementNumber;
}


// Called when the user fills an input, with the event e.
function onFill(e,nInput){

    var key = e.keyCode || e.charCode;

    //If the key is not <Retorn> and the value is not empty, the input has been filled and we will focus the next input.
    if (key != 8 && key != 46 && nInputNumb[nInput].value != "") {

        //If its not the last input we will focus the next one
        if(nInput < 3){
            nInputNumb[nInput+1].focus();
            
        }else{
            //If its the last input:

            //Get the number with the digits entered.
            let nextNum = 1000* nInputNumb[0].value +  100* nInputNumb[1].value + 10* nInputNumb[2].value +1* nInputNumb[3].value;
            
            //If the input is not valid we show in alerts why its not.
            if(isValid(nextNum)){
                numberIsValid(nextNum);
            }
        }
    }
}


// Return true if the value is Valid.
function isValid(nextNum){
    let nElementNumber = [0,0,0,0,0,0,0,0,0,0];
    let numbAct = 0;
    let curNum = nextNum;

    for(i = 0; i < 4; i++){
        numbAct = curNum%10;
        curNum = Math.trunc(curNum/10);
        if(isNaN(numbAct)){
            alert("All the values must be numbers");
            return false; 
        }
        nElementNumber[numbAct] =  nElementNumber[numbAct] +1;
        if( nElementNumber[numbAct] > 1){
            alert("All the values must be different");
            return false;
        }
    }
    return true;
}

// If the number(row) entered is valid we do the following:
// Calculate the hits and update the row.
// If you haven't won or lost you lower the inputs one row.
function numberIsValid(nextNum){

    const [nCorrect, nSameNum] = getHits(nextNum);
    updateHits(nCorrect, nSameNum);
    
    if(nCorrect === 4){ //If the 4 digits are correct you won
        alert("YOU WIN " + window.localStorage.getItem('user') + "!!");

        const win = window.localStorage.getItem('scoreWins');
        window.localStorage.setItem('scoreWins', parseInt(win) + 1);
        window.open('mastermind.html', '_self');
        gameEnded = true;
    }else if(nRowsAdded >= 9){ //We'll have added 9 rows at max because the first one doesn't count.
        alert("YOU HAVE BEEN DEFEATED " + window.localStorage.getItem('user') );

        const lost = window.localStorage.getItem('scoreLost');
        window.localStorage.setItem('scoreLost', parseInt(lost) + 1);
        window.open('mastermind.html', '_self');
    }
    else lowerInputsOneRow(nextNum); //If you haven't won or been defeated you lower the inputs one row
    clearInputs();
}

//Triggered when backslash is pressed
function detectBack(e, nInput){
    var key = e.keyCode || e.charCode;
    if ((key == 8 || key == 46) && nInput > 0 && nInputNumb[nInput].value === "") {
        nInputNumb[nInput-1].focus(); 
    }
}

// A row of inputs is added under the current one.
function lowerInputsOneRow(newTableValue){
    //Copiem el valor he hem de posar per no modificar-ho
    let curTable = newTableValue;


    //Obtenim tots els td de la linia que hem de ocupar seguent:
    let table = document.getElementById("table-game");
    var rows = table.getElementsByTagName('tr'); //Vigila perquè ara hi ha dues taules
    var cells = rows[nRowsAdded].children;
    rows[nRowsAdded].id = "full-row4";
    

    for(i = 3; i >= 0; i--){
        cells[i].innerHTML = curTable %10;
        curTable = Math.floor(curTable/10);
    }

    if(nRowsAdded < 9&& !gameEnded){
        var cellsInput = rows[nRowsAdded+1].children;
        rows[nRowsAdded+1].id = "input-row";
        for(i = 3; i >= 0; i--){
            cellsInput[i].innerHTML = listInputs[i];
        }    
    }
    nRowsAdded ++;
}

//Clear all the imputs
function clearInputs(){
    for(i = 0; i < nInputNumb.length; i++){
        nInputNumb[i].value = "";
        nInputNumb[0].focus();
    }
}

// Process of calculating how many hits did nextNum do in the correct answer
function getHits(nextNum){
    
    let curNum = nextNum;
    let curCorrectNum = corrNumber;

    let numbAct;
    let numbCAct;

    let posNumberCorrect = 0;
    let numberCorrect = 0;

    let nElementNumberNext = [0,0,0,0,0,0,0,0,0,0];

    //Create the position vector of the entered number
    nElementNumberNext = calculateNumbersArray(curNum);   

    //Check how many digits match between the entered and the correct
    for(i = 0; i < 9; i ++){
        if(nElementNumberNext[i] == 1 &&  nElementNumberCorr[i] == 1){
            numberCorrect = numberCorrect +1;
        }
    }
    
    //Check if the two numbers have the same digit in the same place
    curNum = nextNum;
    curCorrectNum = corrNumber;
    for(i = 0; i < 4; i++){
        numbAct = curNum%10;
        curNum = Math.trunc(curNum/10);

        numbCAct = curCorrectNum%10;
        curCorrectNum = Math.trunc(curCorrectNum/10);

        if(numbAct === numbCAct){
            posNumberCorrect = posNumberCorrect + 1;  
        }
    }

    //Calculate the number of digits that match but are not in a correct position.
    numberCorrect = numberCorrect - posNumberCorrect;
    return [posNumberCorrect, numberCorrect];
}

// Returns a 4 digit number generated randomly.
function generateValidNumber(){
    let nElementNumber = [0,0,0,0,0,0,0,0,0,0];
    let numbAct = 0;
    let numberElements = 0;
    let nFinal = 0;
    while(numberElements < 4){
        let x = Math.trunc(Math.random() * 9); //Generate a decimal random value between 0-1, multiply by 9 and truncate it.
        if(nElementNumber[x] == 0){
            numbAct = x;
            nFinal += numbAct * Math.pow(10,numberElements);
            numberElements = numberElements + 1;
            nElementNumber[x] = 1;
        }
    }
    return nFinal;
}


//Change values of the hint table to contain in the correct layer the nDigitCorrect(same place same digit) and the nDigitGuessed(diferent place, same digit)
function updateHits(nDigitCorrect, nDigitGuessed){
    let table = document.getElementById("table-result");
    table.rows[nRowsAdded].cells[1].innerHTML = nDigitCorrect;
    table.rows[nRowsAdded].cells[3].innerHTML = nDigitGuessed;
}