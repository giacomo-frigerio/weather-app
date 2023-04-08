import { useContext } from "react";
import ApiContext from "../../../store/api-context";
import Card from "../../UI/Card";
import styles from "./AirQuality.module.css";

function AirQuality() {
  const apiCtx = useContext(ApiContext);

  const weather = apiCtx.currentWeather.current.air_quality;
  const aqiIndex = weather["gb-defra-index"];

  // Set css variable
  const indicator = document.querySelector(":root");
  indicator.style.setProperty("--aqi-index", aqiIndex);

  // Set description of air quality index
  let aqiDescription = "";
  if (aqiIndex <= 3) aqiDescription = "Low";
  if (aqiIndex > 3 && aqiIndex <= 6) aqiDescription = "Moderate";
  if (aqiIndex > 6 && aqiIndex <= 9) aqiDescription = "High";
  if (aqiIndex > 9) aqiDescription = "Very high";

  return (
    <Card className="container">
      <div className="title">Air Quality</div>
      {!apiCtx.loading && !apiCtx.error && (
        <>
          <div className={styles.info}>
            <ul>
              <li>
                {/* <p>{aqiIndex}</p> */}
                <p>Air pollution banding: {aqiDescription}</p>
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

export default AirQuality;
