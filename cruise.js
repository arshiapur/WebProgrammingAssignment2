function validateCruise() {
    const destination = jQuery("#destination").val();
    const departDate = jQuery("#departBetween").val();
    const minDays = parseInt(jQuery("#minDays").val(), 10);
    const maxDays = parseInt(jQuery("#maxDays").val(), 10);
    const adults = parseInt(jQuery("#cruiseAdults").val(), 10);
    const children = parseInt(jQuery("#cruiseChildren").val(), 10);
    const infants = parseInt(jQuery("#cruiseInfants").val(), 10);
    const $result = jQuery("#cruiseResult");

    const errors = [];
    const validDestinations = ["Alaska", "Bahamas", "Europe", "Mexico"];

    if (!destination) errors.push("Please select a destination.");
    else if (!validDestinations.includes(destination)) errors.push("Destination must be Alaska, Bahamas, Europe, or Mexico.");

    if (!departDate) errors.push("Please select a departure date.");
    else if (!isValidDateInRange(departDate)) errors.push("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");

    if (isNaN(minDays)) errors.push("Please enter minimum duration.");
    else if (minDays < 3) errors.push("Minimum duration must be at least 3 days.");
    if (isNaN(maxDays)) errors.push("Please enter maximum duration.");
    else if (maxDays > 10) errors.push("Maximum duration cannot exceed 10 days.");
    if (!isNaN(minDays) && !isNaN(maxDays) && minDays > maxDays) {
        errors.push("Minimum days cannot exceed maximum days.");
    }

    if (isNaN(adults) || adults < 1) errors.push("At least one adult is required.");
    if (!isNaN(children) && children < 0) errors.push("Children cannot be negative.");
    if (!isNaN(infants) && infants < 0) errors.push("Infants cannot be negative.");

    if (errors.length) {
        $result.html(errors.map(e => `<p style="color:red">${e}</p>`).join(""));
        return;
    }

    const mainGuests = (isNaN(adults) ? 0 : adults) + (isNaN(children) ? 0 : children);
    const roomsNeeded = Math.ceil(mainGuests / 2);

    $result.html(`
    <h3>Cruise Booking Information</h3>
    <p><b>Destination:</b> ${destination}</p>
    <p><b>Departure Date:</b> ${departDate}</p>
    <p><b>Duration:</b> ${minDays} – ${maxDays} days</p>
    <p><b>Adults:</b> ${isNaN(adults) ? 0 : adults}</p>
    <p><b>Children:</b> ${isNaN(children) ? 0 : children}</p>
    <p><b>Infants:</b> ${isNaN(infants) ? 0 : infants}</p>
    <p><b>Rooms Needed:</b> ${roomsNeeded}</p>
  `);
}

function initCruisesPage() {
    const $btn = jQuery("#cruiseBtn");
    if ($btn.length) $btn.on("click", validateCruise);
}

if (window.jQuery) {
    jQuery(initCruisesPage);
} else {
    document.addEventListener("DOMContentLoaded", () => {
        if (window.jQuery) jQuery(initCruisesPage);
    });
}