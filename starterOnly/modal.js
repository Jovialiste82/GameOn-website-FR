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
const validateFirstName = (firstName, errors) => {
  firstName.value === "" || firstName.value == null
    ? insertError(firstName, "Prénom obligatoire", errors)
    : firstName.value.length < 2
    ? insertError(firstName, "2 Caractères minimum", errors)
    : !firstName.value.match(nameFormat)
    ? insertError(firstName, "Utilisez uniquement des lettres", errors)
    : removeError(firstName, errors);
};

const validateLastName = (lastName, errors) => {
  lastName.value === "" || lastName.value == null
    ? insertError(lastName, "Nom obligatoire", errors)
    : lastName.value.length < 2
    ? insertError(lastName, "2 Caractères minimum", errors)
    : !lastName.value.match(nameFormat)
    ? insertError(lastName, "Utilisez uniquement des lettres", errors)
    : removeError(lastName, errors);
};

const validateEmail = (email, errors) => {
  !email.value.match(mailFormat)
    ? insertError(email, "Email non valide", errors)
    : removeError(email, errors);
};

const validateBirthDate = (birthdate, errors) => {
  const minAge = 15;
  const setMinAge = (age) => 1000 * 60 * 60 * 24 * 365.25 * age;
  const getBirthdateEpoch = (string) => {
    const dateDetails = string.split("-").map((item) => parseInt(item));
    return new Date(
      dateDetails[0],
      dateDetails[1] - 1,
      dateDetails[2]
    ).valueOf();
  };
  const isOldEnough = () => {
    const birthDateObject = getBirthdateEpoch(birthdate.value);
    const todayEpoch = new Date().valueOf();
    return todayEpoch - birthDateObject > setMinAge(minAge) ? true : false;
  };

  birthdate.value === "" || birthdate.value == null
    ? insertError(birthdate, "Saisissez votre date de naissance", errors)
    : isOldEnough()
    ? removeError(birthdate, errors)
    : insertError(birthdate, `Age minimum: ${minAge} ans`, errors);
};

const validateQuantity = (quantity, errors) => {
  quantity.value === "" || quantity.value == null
    ? insertError(quantity, "Sélectionnez un nombre", errors)
    : removeError(quantity, errors);
};

const validateLocation = (location, errors) => {
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

const validateTCs = (cgu, errors) => {
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
  let height = modal.offsetHeight;
  let errors = {};

  validateFirstName(firstName, errors);
  validateLastName(lastName, errors);
  validateEmail(email, errors);
  validateBirthDate(birthdate, errors);
  validateQuantity(quantity, errors);
  validateLocation(getLocation(), errors);
  validateTCs(cgu, errors);

  console.log(errors);
  if (Object.keys(errors).length === 0) {
    setTimeout(() => {
      modal.style.display = "none";
      successModal.style.height = `${height}px`;
      successModal.style.display = "block";
    }, 10);
  }
});
