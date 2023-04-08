import { Fragment, useContext } from "react";
import ApiContext from "../../store/api-context";
import UserLogged from "./UserLogged";
import styles from "./Header.module.css";

function Header(props) {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather;

  // timestamp in dd/mm/yy, hh:mm
  const curDate = new Date(weather.location.localtime);
  const timestamp = new Intl.DateTimeFormat("locales", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(curDate);

  // Set returned content
  let headerContent = <p>Loading...</p>;
  if (!apiCtx.loading)
    headerContent = (
      <>
        <UserLogged
          onLoginForm={props.onLoginForm}
          onSignupForm={props.onSignupForm}
        />
        <div className={styles.info}>
          <h2>{weather.current.temp_c} °C</h2>
          <h3>{weather.current.condition.text}</h3>
          <h4>{weather.location.name}</h4>
          <p>{timestamp}</p>
        </div>
        <div className={styles.icon}>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      </>
    );

  return (
    <Fragment>
      <div className={styles.header}>{headerContent}</div>
    </Fragment>
  );
}

export default Header;
