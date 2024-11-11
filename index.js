const display = document.getElementById("display");

function appendToDisplay(input) {
    if (display.value === "Error") {
        display.value = "";  // Clear "Error" before appending new input
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}
function calculate() {
    try {
        if (display.value !== "Error") {
            display.value = eval(display.value);
        } else {
            display.value = "Error";
        }
    }
    catch (error) {
        display.value = "Error";
    }
}
