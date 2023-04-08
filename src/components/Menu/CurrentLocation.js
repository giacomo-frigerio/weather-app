import React, { useContext } from "react";
import ApiContext from "../../store/api-context";
import styles from "./CurrentLocation.module.css";

function CurrentLocation() {
  const apiCtx = useContext(ApiContext);
  const location = apiCtx.currentLocationWeather.location;

  // Select city to display
  const chooseCityHandler = (event) => {
    event.preventDefault();

    const cityId = event.target.closest("li").id;

    if (cityId === null) return;

    const newCity = { url: cityId };
    apiCtx.changeCity(newCity);
  };

  // Security check
  if (!location) return;

  return (
    <div className={styles.currentLocation}>
      <h3>Current location</h3>
      <ul>
        <li
          key={location.lat + "," + location.lon}
          id={location.lat + "," + location.lon}
          onClick={chooseCityHandler}
        >
          <div className={styles.name}>
            <p>{location.name}</p>
            <p className={styles.cityInfo}>
              {location.region && location.region + ","} {location.country}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(CurrentLocation);
