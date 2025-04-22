// Function to convert temperature
function convertTemperature() {
    const input = parseFloat(document.getElementById('tempInput').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;
    let celsius;
    
    if (from === 'C') celsius = input;
    else if (from === 'F') celsius = (input - 32) * 5/9;
    else if (from === 'R') celsius = input * 5/4;
    
    let result;
    if (to === 'C') result = celsius;
    else if (to === 'F') result = celsius * 9/5 + 32;
    else if (to === 'R') result = celsius * 4/5;
    
    document.getElementById('tempResult').innerText = result.toFixed(2);
}

// Function to convert length
function convertLength() {
    const input = parseFloat(document.getElementById('lengthInput').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;
    let meters;

    // Convert to meters first
    if (from === 'km') meters = input * 1000;
    else if (from === 'm') meters = input;
    else if (from === 'cm') meters = input / 100;
    else if (from === 'mm') meters = input / 1000;
    else if (from === 'mile') meters = input * 1609.34;

    let result;
    // Convert meters to desired unit
    if (to === 'km') result = meters / 1000;
    else if (to === 'm') result = meters;
    else if (to === 'cm') result = meters * 100;
    else if (to === 'mm') result = meters * 1000;
    else if (to === 'mile') result = meters / 1609.34;

    document.getElementById('lengthResult').innerText = result.toFixed(2);
}

// Function to convert weight
function convertWeight() {
    const input = parseFloat(document.getElementById('weightInput').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;
    let grams;

    // Convert to grams first
    if (from === 'kg') grams = input * 1000;
    else if (from === 'g') grams = input;
    else if (from === 'mg') grams = input / 1000;
    else if (from === 'ton') grams = input * 1000000;
    else if (from === 'oz') grams = input * 28.3495;

    let result;
    // Convert grams to desired unit
    if (to === 'kg') result = grams / 1000;
    else if (to === 'g') result = grams;
    else if (to === 'mg') result = grams * 1000;
    else if (to === 'ton') result = grams / 1000000;
    else if (to === 'oz') result = grams / 28.3495;

    document.getElementById('weightResult').innerText = result.toFixed(2);
}
