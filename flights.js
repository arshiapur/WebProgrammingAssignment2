function initPassengerToggle() {
  const icon = document.getElementById("passengerIcon");
  const form = document.getElementById("passengerForm");
  if (!icon || !form) return;

  icon.addEventListener("click", function () {
    form.style.display = (form.style.display === "none" || form.style.display === "") ? "flex" : "none";
  });
}

function initTripTypeToggle() {
  const tripRadios = document.querySelectorAll('input[name="tripType"]');
  const returnDateInput = document.getElementById("returnDate");
  if (!tripRadios || !returnDateInput) return;

  function toggleReturnDate() {
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    if (tripType === "round") {
      returnDateInput.style.display = "inline-block";
    } else {
      returnDateInput.style.display = "none";
      returnDateInput.value = ""; 
    }
  }

  tripRadios.forEach(radio => radio.addEventListener("change", toggleReturnDate));

  toggleReturnDate();
}

function validateFlight(e) {
  e.preventDefault();

  const tripType = document.querySelector('input[name="tripType"]:checked').value;
  const origin = document.getElementById("origin").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const departDate = document.getElementById("departDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const adults = parseNumber(document.getElementById("adults").value);
  const children = parseNumber(document.getElementById("children").value);
  const infants = parseNumber(document.getElementById("infants").value);
  const result = document.getElementById("messageBox");

  const errors = [];

  if (!origin) errors.push("Please enter an origin city.");
  else if (!isValidCity(origin)) errors.push("Origin must be a city in Texas or California.");

  if (!destination) errors.push("Please enter a destination city.");
  else if (!isValidCity(destination)) errors.push("Destination must be a city in Texas or California.");

  if (origin && destination && origin === destination) errors.push("Origin and destination cannot be the same.");

  if (!departDate) errors.push("Please select a departure date.");
  else if (!inDateRange(departDate, VALID_START_DATE, VALID_END_DATE)) errors.push("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");

  if (tripType === "round") {
    if (!returnDate) errors.push("Please select a return date for a round trip.");
    else if (!inDateRange(returnDate, VALID_START_DATE, VALID_END_DATE)) errors.push("Return date must be between Sep 1, 2024 and Dec 1, 2024.");
    else if (new Date(returnDate) <= new Date(departDate)) errors.push("Return date must be after departure date.");
  }

  if (adults < 1) errors.push("At least one adult is required.");
  if (adults > 4 || children > 4 || infants > 4) errors.push("Number of passengers for each category cannot exceed 4.");
  if (children < 0 || infants < 0) errors.push("Number of children or infants cannot be negative.");

  if (errors.length > 0) {
    showErrors(result, errors);
    return;
  }

  const message = `
    <h3>Flight Information</h3>
    <p><b>Trip type:</b> ${tripType === "oneway" ? "One-way" : "Round-trip"}</p>
    <p><b>Origin:</b> ${origin}</p>
    <p><b>Destination:</b> ${destination}</p>
    <p><b>Departure date:</b> ${departDate}</p>
    ${tripType === "round" ? `<p><b>Return date:</b> ${returnDate}</p>` : ""}
    <p><b>Passengers:</b> ${adults} adults, ${children} children, ${infants} infants</p>
    <p> Your flight details are valid. Ready to book!</p>
  `;
  showResult(result, message);
}

function initFlightPage() {
  const flightForm = document.getElementById("flightForm");
  if (flightForm) flightForm.addEventListener("submit", validateFlight);

  initPassengerToggle();
  initTripTypeToggle();
}

document.addEventListener("DOMContentLoaded", initFlightPage);
