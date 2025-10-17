function startDateTime(id="localDateTime"){
  const el = document.getElementById(id);
  if(!el) return;
  function tick(){
    const now = new Date();
    const s = now.toLocaleString();
    el.textContent = s;
  }
  tick();
  setInterval(tick, 1000);
}

function initControls(){
  const fontSelect = document.getElementById('fontSizeSelect');
  const bgSelect = document.getElementById('bgColorSelect');
  if(fontSelect){
    fontSelect.addEventListener('change', e=>{
      const v = e.target.value;
      document.documentElement.style.setProperty('--main-font', v+'px');
    });
  }
  if(bgSelect){
    bgSelect.addEventListener('change', e=>{
      const v = e.target.value;
      document.documentElement.style.setProperty('--main-bg', v);
    });
  }
}

const VALID_START_DATE = new Date("2024-09-01");
const VALID_END_DATE = new Date("2024-12-01");

const VALID_CITIES = [
  "austin", "dallas", "houston", "san antonio", "fort worth", "el paso", // Texas
  "los angeles", "san diego", "san francisco", "san jose", "sacramento"  // California
];

function showMessage(msg, isError = false) {
  const box = document.getElementById("stayResult") || document.getElementById("messageBox");
  if (box) {
    box.innerHTML = msg;
    box.style.color = isError ? "red" : "green";
  } else {
    alert(msg);
  }
}

function isValidDateInRange(dateStr) {
  const date = new Date(dateStr);
  return date >= VALID_START_DATE && date <= VALID_END_DATE;
}

function isValidCity(city) {
  return VALID_CITIES.includes(city.trim());
}

function parseNumber(input) {
  const n = parseInt(input, 10);
  return isNaN(n) ? 0 : n;
}

function parseYMD(str) {
  return new Date(str);
}

function inDateRange(dateStr, startStr, endStr) {
  const d = new Date(dateStr);
  return d >= new Date(startStr) && d <= new Date(endStr);
}

function showErrors(element, errors) {
  element.innerHTML = errors.join("<br>");
  element.style.color = "black";
}

function showResult(element, message) {
  element.innerHTML = message;
  element.style.color = "black";
}

document.addEventListener("DOMContentLoaded", function() {
  startDateTime();  
  initControls();
});