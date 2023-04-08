import { useContext, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import ApiContext from "../../store/api-context";
import CheckFormData from "./check-form-data";
import styles from "./Signup.module.css";
import leftArrowIcon from "../../assets/left-arrow.svg";
import { type } from "@testing-library/user-event/dist/type";

const firebaseConfig = {
  apiKey: "AIzaSyAkuk2sWPEdlppgWhY9siVMUq8KR5Sv1m4",
  authDomain: "weather-app-react-3603c.firebaseapp.com",
  databaseURL: "https://weather-app-react-3603c-default-rtdb.firebaseio.com",
  projectId: "weather-app-react-3603c",
  storageBucket: "weather-app-react-3603c.appspot.com",
  messagingSenderId: "819260109088",
  appId: "1:819260109088:web:1351a47e5a2ae078cb6745",
  measurementId: "G-GK4NBE2ZV7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Signup(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUserInfo } = useContext(ApiContext);
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();

  const SignupHandler = (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // check form validity
    const formInputValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
    const { formIsValid, error } = CheckFormData(formInputValues, "SIGNUP");
    if (!formIsValid) {
      setErrorMessage(error);
      return;
    }

    // Firebase create user
    createUserWithEmailAndPassword(
      auth,
      formInputValues.email,
      formInputValues.password
    )
      .then((userCredential) => {
        const user = userCredential.user;

        const fullName =
          formInputValues.firstName + " " + formInputValues.lastName;
        updateProfile(user, {
          displayName: fullName,
        });
        sendEmailVerification(user);

        setUserInfo(user);
        props.onMainPage();
      })
      .catch((error) => {
        const firebaseErrorMessage = error.message;
        setErrorMessage(firebaseErrorMessage);
      });
  };

  return (
    <>
      <div className={styles.back}>
        <img
          src={leftArrowIcon}
          alt="menu"
          width="50"
          height="50"
          align="left"
          onClick={props.onMainPage}
        />
      </div>
      <form className={styles.form} onSubmit={SignupHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" ref={firstNameRef} />
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" ref={lastNameRef} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        {errorMessage && (
          <div className={styles.error}>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className={styles.actions}>
          <button onClick={props.onLogin}>Login</button>
          <button className={styles.submit}>Signup</button>
        </div>
      </form>
    </>
  );
}

export default Signup;
