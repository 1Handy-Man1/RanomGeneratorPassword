// DOM elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
})

// generate password function
function generatePassword(lower, upper, number, symbol, length){
    // 1. Init password var
    // 2. Filter out un-checked types
    // 3. Loop over length, call generator function for each type
    // 4. add final password to the password var and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount: ', typesCount);

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // console.log('typesArr: ', typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName)

            generatedPassword += randomFun[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Generate function - http://www.net-comber.com/charset.html

// generate lowercase letter
/* 
    The fromCharCode will get all type of numbers, symbols and letter; each are numbered. 97 - 122 contains lowercase letter.
    Math floor will make it whole numbers with multiply 26 as the total letters(length of all letters) adding 97 will then between 97 - 122 for all the lowercase letter
*/
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function getRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomLower())