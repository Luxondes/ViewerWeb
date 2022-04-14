function getCodeValidation() {
  return document.getElementById("code-validation");
}

function disableSubmit(disabled) {
  if (disabled) {
    document
      .getElementById("submit-btn")
      .setAttribute("disabled", true);
  } else {
    document
      .getElementById("submit-btn")
      .removeAttribute("disabled");
  }
}

document
  .getElementById("code")
  .addEventListener("input", function(e) {
  if (/^CODE-/.test(e.target.value)) {
    getCodeValidation().innerText = "Code valide";
    disableSubmit(false);
  } else {
    getCodeValidation().innerText = "Code invalide";
    disableSubmit(true);
  }
});