import { useContext, useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import WeatherInfo from "./components/Layout/WeatherInfo";
import Menu from "./components/Layout/Menu";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Loading from "./components/UI/Loading";
import ApiContext from "./store/api-context";
import "./App.css";

const DFT_CITY = { url: "milan-lombardia-italy" };

function App() {
  const [loadingDftCity, setLoadingDftCity] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const apiCtx = useContext(ApiContext);

  // Set current location or dft city
  useEffect(() => {
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const city = latitude + "," + longitude;
            apiCtx.changeCity(city, "CURRENT_LOC");
            setLoadingDftCity(false);
          },
          (error) => {
            apiCtx.changeCity(DFT_CITY);
            setLoadingDftCity(false);
          }
        );
      } catch (error) {
        apiCtx.changeCity(DFT_CITY);
        setLoadingDftCity(false);
      }
    } else {
      apiCtx.changeCity(DFT_CITY);
      setLoadingDftCity(false);
    }
  }, []);

  const LoginFormHandler = () => {
    clearLoginStateHandler();
    setLoggingIn(true);
  };

  const SignupFormHandler = () => {
    clearLoginStateHandler();
    setSigningUp(true);
  };

  const clearLoginStateHandler = () => {
    setLoggingIn(false);
    setSigningUp(false);
  };

  let content = <Loading />;
  if (loggingIn)
    content = (
      <Login onSignup={SignupFormHandler} onMainPage={clearLoginStateHandler} />
    );
  if (signingUp)
    content = (
      <Signup onLogin={LoginFormHandler} onMainPage={clearLoginStateHandler} />
    );
  if (
    !loggingIn &&
    !signingUp &&
    !apiCtx.loading &&
    !apiCtx.newCity &&
    !loadingDftCity
  ) {
    content = (
      <>
        <Header
          onLoginForm={LoginFormHandler}
          onSignupForm={SignupFormHandler}
        />
        <Menu />
        <main>
          <WeatherInfo />
          <div className="credit">
            Powered by{" "}
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noreferrer"
              title="Free Weather API"
            >
              WeatherAPI.com
            </a>
          </div>
        </main>
      </>
    );
  }

  return <>{content}</>;
}

export default App;
