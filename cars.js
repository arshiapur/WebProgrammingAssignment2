function validateCar(e) {
    if (e) e.preventDefault();

    const cityEl = document.getElementById("carCity");
    const carTypeEl = document.getElementById("carType");
    const checkInEl = document.getElementById("carCheckIn");
    const checkOutEl = document.getElementById("carCheckOut");
    const resultEl = document.getElementById("carResult");

    const city = (cityEl ? cityEl.value : "").trim().toLowerCase();
    const carType = (carTypeEl ? carTypeEl.value : "").trim().toLowerCase();
    const checkIn = checkInEl ? checkInEl.value : "";
    const checkOut = checkOutEl ? checkOutEl.value : "";

    const errors = [];

    if (!city) errors.push("Please enter a city.");
    else if (!isValidCity(city)) errors.push("City must be in Texas or California.");

    const allowed = ["economy", "suv", "compact", "midsize"];
    if (!carType) errors.push("Please select a car type.");
    else if (!allowed.includes(carType)) errors.push("Car type must be Economy, SUV, Compact, or Midsize.");

    if (!checkIn || !checkOut) {
        errors.push("Please select both check-in and check-out dates.");
    } else {
        if (!isValidDateInRange(checkIn) || !isValidDateInRange(checkOut)) {
            errors.push("Dates must be between Sep 1, 2024 and Dec 1, 2024.");
        }
        if (new Date(checkOut) < new Date(checkIn)) {
            errors.push("Check-out date must be after check-in date.");
        }
    }

    if (errors.length) {
        showErrors(resultEl, errors);
        return false;
    }

    const msg = `
    <h3>Car Rental Information</h3>
    <p><b>City:</b> ${city}</p>
    <p><b>Car Type:</b> ${carType}</p>
    <p><b>Check-In:</b> ${checkIn}</p>
    <p><b>Check-Out:</b> ${checkOut}</p>
  `;
    showResult(resultEl, msg);
    return false;
}

function initCarsPage() {
    const form = document.getElementById("carForm");
    if (form) form.addEventListener("submit", validateCar);
}

document.addEventListener("DOMContentLoaded", initCarsPage);