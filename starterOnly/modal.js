// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modal = document.querySelector(".content");
const successModal = document.querySelector(".success-modal-content");
const formData = document.querySelectorAll(".formData");
const closeX = document.querySelectorAll(".close");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.getElementsByName("location");

// Mail Format
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// insert error in error object and format border
function insertError(input, message, errors) {
  errors[input.name] = message;
  input.style.borderColor = "red";
  input.style.borderWidth = "3px";
  return errors;
}

// remove error from error object and reset border format
function removeError(input, errors) {
  delete errors[input.name];
  input.style.borderColor = "#ccc";
  input.style.borderWidth = "0.8px";
  return errors;
}

// Get value of location (radio input)
function getLocation() {
  let selectedLocation = [];
  locations.forEach(
    (location) => location.checked && selectedLocation.push(location.value)
  );
  return selectedLocation.length === 1 ? selectedLocation[0] : null;
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
  modal.style.display = "none";
}
// close success modal
function closeSuccessModal() {
  modalbg.style.display = "none";
  successModal.style.display = "none";
  // to prevent new registration, add code below:
  // modalBtn.forEach((btn) => btn.removeEventListener("click", launchModal));
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modal.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event with X btn
closeX.forEach((btn) => btn.addEventListener("click", closeModal));

// close success modal event with Close btn
closeBtn.addEventListener("click", closeSuccessModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = {};
  const location = getLocation();

  firstName.value === "" || firstName.value == null
    ? insertError(firstName, "Prénom obligatoire", errors)
    : firstName.value.length < 2
    ? insertError(firstName, "2 Caractères minimum", errors)
    : removeError(firstName, errors);

  lastName.value === "" || lastName.value == null
    ? insertError(lastName, "Nom obligatoire", errors)
    : lastName.value.length < 2
    ? insertError(lastName, "2 Caractères minimum", errors)
    : removeError(lastName, errors);

  !email.value.match(mailFormat)
    ? insertError(email, "Email non valide", errors)
    : removeError(email, errors);

  birthdate.value === "" || birthdate.value == null
    ? insertError(birthdate, "Saisissez votre date de naissance", errors)
    : removeError(birthdate, errors);

  quantity.value === "" || quantity.value == null
    ? insertError(quantity, "Sélectionnez un nombre", errors)
    : removeError(quantity, errors);

  location === null && (errors.location = "Sélectionnez la ville");

  console.log(errors);
  if (Object.keys(errors).length === 0) {
    let height = modal.offsetHeight;
    modal.style.display = "none";
    successModal.style.height = `${height}px`;
    successModal.style.display = "block";
  }
});
