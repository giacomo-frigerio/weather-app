import { useContext, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ApiContext from "../../store/api-context";
import CheckFormData from "./check-form-data";
import leftArrowIcon from "../../assets/left-arrow.svg";
import styles from "./Login.module.css";

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

function Login(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUserInfo } = useContext(ApiContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const LoginHandler = (event) => {
    event.preventDefault();

    // check form validity
    const formInputValues = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const { formIsValid, error } = CheckFormData(formInputValues);
    if (!formIsValid) {
      setErrorMessage(error);
      return;
    }

    // Firebase sign in
    signInWithEmailAndPassword(
      auth,
      formInputValues.email,
      formInputValues.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
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
      <form id="loginForm" className={styles.form} onSubmit={LoginHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        {errorMessage && (
          <div className={styles.error}>
            <p>{errorMessage}</p>
          </div>
        )}
        <div className={styles.actions}>
          <button onClick={props.onSignup}>Signup</button>
          <button className={styles.submit}>Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
