const DFT_STATE = { formIsValid: true, error: "" };

function CheckFormData(formInputValues, type = "LOGIN") {
  let errorMessage = "";
  const validSymbolsEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  if (formInputValues.email.trim().length === 0) {
    errorMessage = "Insert email";
    return { formIsValid: false, error: errorMessage };
  }
  if (!validSymbolsEmail.test(String(formInputValues.email).toLowerCase())) {
    errorMessage = "Invalid email";
    return { formIsValid: false, error: errorMessage };
  }
  if (type === "SIGNUP") {
    if (formInputValues.firstName.trim().length === 0) {
      errorMessage = "Insert first name";
      return { formIsValid: false, error: errorMessage };
    }
    if (formInputValues.lastName.trim().length === 0) {
      errorMessage = "Insert last name";
      return { formIsValid: false, error: errorMessage };
    }
  }
  if (formInputValues.password.trim().length === 0) {
    errorMessage = "Insert password";
    return { formIsValid: false, error: errorMessage };
  }
  if (formInputValues.password.trim().length < 6) {
    if (type === "LOGIN") errorMessage = "Invalid password";
    else errorMessage = "Password should be at least 6 characters";
    return { formIsValid: false, error: errorMessage };
  }
  if (
    (!formInputValues.password.match(numbers) ||
      !formInputValues.password.match(lowerCaseLetters) ||
      !formInputValues.password.match(upperCaseLetters)) &&
    type === "SIGNUP"
  ) {
    errorMessage =
      "Password must contain at least a number, a lower case and a capital letter";
    return { formIsValid: false, error: errorMessage };
  }

  return DFT_STATE;
}

export default CheckFormData;
