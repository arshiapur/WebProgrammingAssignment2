function initPage() {
  const dateTimeElem = document.getElementById("localDateTime");
  function updateDateTime() {
    const now = new Date();
    dateTimeElem.textContent = now.toLocaleString();
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  document.getElementById("fontSizeSelect").addEventListener("change", function() {
    document.body.style.fontSize = this.value + "px";
  });

  document.getElementById("bgColorSelect").addEventListener("change", function() {
    document.body.style.backgroundColor = this.value;
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", validateContact);
  }
}

function validateContact(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');

  const resultDiv = document.getElementById("contactResult");
  const errors = [];

  const namePattern = /^[A-Z][a-zA-Z]*$/;
  const phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName) errors.push("First name is required.");
  else if (!namePattern.test(firstName)) errors.push("First name must start with a capital letter and contain only letters.");

  if (!lastName) errors.push("Last name is required.");
  else if (!namePattern.test(lastName)) errors.push("Last name must start with a capital letter and contain only letters.");

  if (firstName && lastName && firstName === lastName) errors.push("First and last name cannot be the same.");

  if (!phone) errors.push("Phone number is required.");
  else if (!phonePattern.test(phone)) errors.push("Phone number must be formatted as (ddd) ddd-dddd.");

  if (!email) errors.push("Email is required.");
  else if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");

  if (!gender) errors.push("Please select your gender.");

  if (!comment) errors.push("Comment is required.");
  else if (comment.length < 10) errors.push("Comment must be at least 10 characters long.");

  if (errors.length > 0) {
    resultDiv.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
    return;
  }

  resultDiv.innerHTML = `
    <h3>Submission Successful!</h3>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Gender:</strong> ${gender.value}</p>
    <p><strong>Comment:</strong> ${comment}</p>
  `;

  document.getElementById("contactForm").reset();
}
