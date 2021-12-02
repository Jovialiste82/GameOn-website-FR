// DOM Elements
const form = document.getElementById("form");
const city = document.getElementById("city");
const cgu = document.getElementById("checkbox1");
const cguWarning = document.getElementById("cgu");
const locationsGroup = document.getElementById("locations");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const modalbg = document.querySelector(".bground");
const modal = document.querySelector(".content");
const closeBtn = document.querySelector(".close-btn");
const successModal = document.querySelector(".success-modal-content");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeX = document.querySelectorAll(".close");
const locations = document.getElementsByName("location");

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

// Get value of location (radio input)
function getLocation() {
  let selectedLocation = [];
  locations.forEach(
    (location) => location.checked && selectedLocation.push(location.value)
  );
  return selectedLocation.length === 1 ? selectedLocation[0] : null;
}

// Input Format
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameFormat = /^[A-Za-z'-\s]+$/;

// Clear error msg
function clearErrMsg(input) {
  const p = input.parentElement.lastElementChild;
  if (p && p.classList.contains("error-msg")) {
    p.remove();
  }
}

// insert error in error object and format border
function insertError(input, message, errors) {
  clearErrMsg(input);
  errors[input.name] = message;
  input.style.borderColor = "red";
  input.style.borderWidth = "3px";
  input.parentElement.insertAdjacentHTML(
    "beforeend",
    `<p class="error-msg">${message}</p>`
  );

  return errors;
}

// remove error from error object and reset border format
function removeError(input, errors) {
  clearErrMsg(input);
  delete errors[input.name];
  input.style.borderColor = "#ccc";
  input.style.borderWidth = "0.8px";
  return errors;
}

// ///////// Validation //////////////////////

// Validate first name
const validateFirstName = (firstName, errors) => {
  // check if first name is missing
  firstName.value === "" || firstName.value == null
    ? insertError(firstName, "Prénom obligatoire", errors)
    : // check if first name has at least two characters
    firstName.value.length < 2
    ? insertError(firstName, "2 Caractères minimum", errors)
    : !firstName.value.match(nameFormat)
    ? // check if first name has only letters
      insertError(firstName, "Utilisez uniquement des lettres", errors)
    : removeError(firstName, errors);
};

// Validate last name
const validateLastName = (lastName, errors) => {
  // check if last name is missing
  lastName.value === "" || lastName.value == null
    ? insertError(lastName, "Nom obligatoire", errors)
    : // check if last name has at least two characters
    lastName.value.length < 2
    ? insertError(lastName, "2 Caractères minimum", errors)
    : !lastName.value.match(nameFormat)
    ? // check if last name has only letters
      insertError(lastName, "Utilisez uniquement des lettres", errors)
    : removeError(lastName, errors);
};

// Validate email
const validateEmail = (email, errors) => {
  // check if email matches email format
  !email.value.match(mailFormat)
    ? insertError(email, "Email non valide", errors)
    : removeError(email, errors);
};

// Validate birth date
const validateBirthDate = (birthdate, errors) => {
  // set minimum age to register
  const minAge = 12;
  const setMinAge = (age) => 1000 * 60 * 60 * 24 * 365.25 * age;
  const getBirthdateEpoch = (string) => {
    const dateDetails = string.split("-").map((item) => parseInt(item));
    return new Date(
      dateDetails[0],
      dateDetails[1] - 1,
      dateDetails[2]
    ).valueOf();
  };
  // function to check if player is old enough
  const isOldEnough = () => {
    const birthDateObject = getBirthdateEpoch(birthdate.value);
    const todayEpoch = new Date().valueOf();
    return todayEpoch - birthDateObject > setMinAge(minAge) ? true : false;
  };

  // check if birthdate is missing
  birthdate.value === "" || birthdate.value == null
    ? insertError(birthdate, "Saisissez votre date de naissance", errors)
    : // check if player is old enough
    isOldEnough()
    ? removeError(birthdate, errors)
    : insertError(birthdate, `Age minimum: ${minAge} ans`, errors);
};

// Validate quantity field
const validateQuantity = (quantity, errors) => {
  // check if quantity is missing
  quantity.value === "" || quantity.value == null
    ? insertError(quantity, "Sélectionnez un nombre", errors)
    : removeError(quantity, errors);
};

// Validate location radio button
const validateLocation = (location, errors) => {
  // check if city is missing
  if (location === null) {
    errors.location = "Ville non selectionnée";
    city.classList.remove("hidden");
    city.classList.add("error-msg", "fwbolder");
    locationsGroup.classList.add("warning-border");
  } else {
    city.classList.remove("error-msg", "fwbolder");
    city.classList.add("hidden");
    locationsGroup.classList.remove("warning-border");
  }
  return errors;
};

// Validate TCs checkbox
const validateTCs = (cgu, errors) => {
  // check if mandatory TCs have not been checked
  if (!cgu.checked) {
    errors.cgu = "CGU obligatoires";
    cguWarning.classList.remove("hidden");
    cguWarning.classList.add("error-msg", "fwbolder");
  } else {
    cguWarning.classList.remove("error-msg", "fwbolder");
    cguWarning.classList.add("hidden");
  }
  return errors;
};

// ////////// Form Submit ///////////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = {};
  // let height = modal.offsetHeight;
  validateFirstName(firstName, errors);
  validateLastName(lastName, errors);
  validateEmail(email, errors);
  validateBirthDate(birthdate, errors);
  validateQuantity(quantity, errors);
  validateLocation(getLocation(), errors);
  validateTCs(cgu, errors);

  console.log(errors);
  if (Object.keys(errors).length === 0) {
    modal.style.display = "none";
    // successModal.style.height = `${height}px`;
    successModal.style.height = `80vh`;
    successModal.style.display = "block";
  }
});
