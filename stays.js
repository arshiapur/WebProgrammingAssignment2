function validateStay(e) {
  e.preventDefault(); 
  const city = document.getElementById("stayCity").value.trim().toLowerCase();
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = parseNumber(document.getElementById("adultsStay").value);
  const children = parseNumber(document.getElementById("childrenStay").value);
  const infants = parseNumber(document.getElementById("infantsStay").value);
  const result = document.getElementById("stayResult");

  const errors = [];

  const VALID_START_DATE = "2024-09-01";
  const VALID_END_DATE = "2024-12-01";

  if (!checkIn || !checkOut) {
    errors.push("Please select both check-in and check-out dates.");
  } else if (!inDateRange(checkIn, VALID_START_DATE, VALID_END_DATE) || !inDateRange(checkOut, VALID_START_DATE, VALID_END_DATE)) {
    errors.push("Dates must be between September 1, 2024 and December 1, 2024.");
  } else if (parseYMD(checkOut) <= parseYMD(checkIn)) {
    errors.push("Check-out date must be after check-in date.");
  }

  if (!city) errors.push("Please enter a city.");
  else if (!isValidCity(city)) errors.push("City must be in Texas or California.");

  if (adults <= 0) errors.push("At least one adult is required.");
  if (children < 0 || infants < 0) errors.push("Number of children or infants cannot be negative.");

  let roomsNeeded = 0;
  if (adults > 0) {
    const totalMainGuests = adults + children;
    roomsNeeded = Math.ceil(totalMainGuests / 2);
  }

  if (errors.length > 0) {
    showErrors(result, errors);
    return;
  }

  const message = `
    <h3>Stay Information</h3>
    <p><b>City:</b> ${city}</p>
    <p><b>Check-in:</b> ${checkIn}</p>
    <p><b>Check-out:</b> ${checkOut}</p>
    <p><b>Guests:</b> ${adults} adults, ${children} children, ${infants} infants</p>
    <p><b>Rooms needed:</b> ${roomsNeeded}</p>
    <p> Your stay details are valid. Great deals available!</p>
  `;
  showResult(result, message);
}

function initStaysPage() {
  const stayForm = document.getElementById("stayForm");
  if (stayForm) stayForm.addEventListener("submit", validateStay);
}

document.addEventListener("DOMContentLoaded", initStaysPage);
