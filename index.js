const display = document.getElementById("display");
const scientificInput = document.getElementById("scientific-input");
const scientificResult = document.getElementById("scientific-result");

// Tab switching
const tabButtons = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// Basic calculator
function appendToDisplay(input) {
  if (display.value === "Error") {
    display.value = "";
  }
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value.replace(/[^0-9+\-*/().]/g, "");
    display.value = expression ? String(Function(`"use strict"; return (${expression})`)()) : "";
  } catch {
    display.value = "Error";
  }
}

// Scientific calculator
function applyScientific(operation) {
  const value = Number(scientificInput.value);
  if (operation !== "pi" && Number.isNaN(value)) {
    scientificResult.textContent = "Result: Please enter a valid number.";
    return;
  }

  let result;

  switch (operation) {
    case "sin":
      result = Math.sin((value * Math.PI) / 180);
      break;
    case "cos":
      result = Math.cos((value * Math.PI) / 180);
      break;
    case "tan":
      result = Math.tan((value * Math.PI) / 180);
      break;
    case "sqrt":
      result = Math.sqrt(value);
      break;
    case "log":
      result = Math.log10(value);
      break;
    case "ln":
      result = Math.log(value);
      break;
    case "square":
      result = value ** 2;
      break;
    case "cube":
      result = value ** 3;
      break;
    case "inverse":
      result = 1 / value;
      break;
    case "exp":
      result = Math.exp(value);
      break;
    case "pi":
      result = Math.PI;
      scientificInput.value = String(Math.PI.toFixed(8));
      break;
    default:
      result = "Invalid operation";
  }

  if (Number.isFinite(result)) {
    scientificResult.textContent = `Result: ${result.toFixed(6)}`;
    scientificInput.value = String(result);
  } else {
    scientificResult.textContent = "Result: Undefined for the given input.";
  }
}

function clearScientific() {
  scientificInput.value = "";
  scientificResult.textContent = "Result: —";
}

// Civil engineering calculators
function calcConcreteVolume() {
  const l = Number(document.getElementById("conc-length").value);
  const w = Number(document.getElementById("conc-width").value);
  const d = Number(document.getElementById("conc-depth").value);
  const result = l * w * d;
  document.getElementById("conc-result").textContent = Number.isFinite(result) && result > 0
    ? `Volume: ${result.toFixed(3)} m³`
    : "Volume: Please enter valid positive values.";
}

function calcBeamLoad() {
  const w = Number(document.getElementById("beam-w").value);
  const l = Number(document.getElementById("beam-l").value);
  const reaction = (w * l) / 2;
  document.getElementById("beam-result").textContent = Number.isFinite(reaction) && reaction > 0
    ? `Reaction at each support: ${reaction.toFixed(3)} kN`
    : "Reaction at each support: Please enter valid positive values.";
}

function calcBrickCount() {
  const length = Number(document.getElementById("wall-length").value);
  const height = Number(document.getElementById("wall-height").value);
  const thickness = Number(document.getElementById("wall-thickness").value);

  const wallVolume = length * height * thickness;
  const standardBrickVolume = 0.19 * 0.09 * 0.09;
  const bricks = wallVolume / standardBrickVolume;

  document.getElementById("brick-result").textContent = Number.isFinite(bricks) && bricks > 0
    ? `Estimated bricks: ${Math.ceil(bricks)} (approx.)`
    : "Estimated bricks: Please enter valid positive values.";
}

// Mechanical engineering calculators
function calcPower() {
  const torque = Number(document.getElementById("torque").value);
  const rpm = Number(document.getElementById("rpm").value);
  const powerWatts = (2 * Math.PI * rpm * torque) / 60;

  document.getElementById("power-result").textContent = Number.isFinite(powerWatts) && powerWatts > 0
    ? `Power: ${(powerWatts / 1000).toFixed(3)} kW (${powerWatts.toFixed(1)} W)`
    : "Power: Please enter valid positive values.";
}

function calcExpansion() {
  const length0 = Number(document.getElementById("length0").value);
  const alpha = Number(document.getElementById("alpha").value);
  const deltaT = Number(document.getElementById("deltaT").value);
  const deltaL = length0 * alpha * deltaT;

  document.getElementById("expansion-result").textContent = Number.isFinite(deltaL)
    ? `Expansion: ${deltaL.toExponential(4)} m`
    : "Expansion: Please enter valid values.";
}

function calcKineticEnergy() {
  const mass = Number(document.getElementById("mass").value);
  const velocity = Number(document.getElementById("velocity").value);
  const ke = 0.5 * mass * velocity ** 2;

  document.getElementById("ke-result").textContent = Number.isFinite(ke) && ke > 0
    ? `Kinetic Energy: ${ke.toFixed(3)} J`
    : "Kinetic Energy: Please enter valid positive values.";
}
