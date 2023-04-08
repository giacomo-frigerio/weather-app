import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";
import styles from "./Wind.module.css";

function Wind() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Wind</div>
      <div className={styles.info}>
        {!apiCtx.loading && !apiCtx.error && (
          <ul>
            <li>
              <p>{weather.wind_kph} km/h</p>
              <p>{weather.wind_dir}</p>
            </li>
            <li className={styles.addInfo}>
              <p>Gusts: {weather.gust_kph} km/h</p>
            </li>
          </ul>
        )}
      </div>
    </Card>
  );
}

export default Wind;
