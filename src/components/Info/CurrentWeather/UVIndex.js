import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";
import styles from "./UVIndex.module.css";

function UVIndex() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  // Set css variable
  const indicator = document.querySelector(":root");
  indicator.style.setProperty("--uv-index", weather.uv);

  // Set uv index desription
  let uvDescription = "";
  if (weather.uv <= 2) uvDescription = "Low";
  if (weather.uv > 2 && weather.uv <= 5) uvDescription = "Moderate";
  if (weather.uv > 5 && weather.uv <= 7) uvDescription = "High";
  if (weather.uv > 7 && weather.uv <= 10) uvDescription = "Very high";
  if (weather.uv > 10) uvDescription = "Extreme";

  return (
    <Card className="container">
      <div className="title">UV Index</div>
      {!apiCtx.loading && !apiCtx.error && (
        <>
          <div className={styles.info}>
            <ul>
              <li>
                {/* <p>{weather.uv}</p> */}
                <p>{uvDescription}</p>
              </li>
            </ul>
          </div>
          <div className={styles["index-bar"]}>
            <div className={styles.indicator}></div>
          </div>
        </>
      )}
    </Card>
  );
}

export default UVIndex;
