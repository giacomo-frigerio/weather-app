import React, { useContext } from "react";
import ApiContext from "../../store/api-context";
import styles from "./SearchedCityList.module.css";

function SearchedCityList(props) {
  const apiCtx = useContext(ApiContext);

  // Add city to favourites list
  const addFavoutiteCityHandler = (event) => {
    const ele = event.target.closest("li");
    const cityId = +ele.id;

    if (cityId === null) return;

    const cityDataArray = props.cities.filter((city) => city.id === cityId);
    const cityData = cityDataArray[0];
    if (cityData.fav === true) return;

    apiCtx.addFavCity(cityData);
  };

  // Add "fav" value to cities to set coloured or b/w star icon
  let searchedCities = [];
  props.cities.map((city) => {
    const favouriteCity = props.favCities.find(
      (favCity) => city.id === favCity.cityId
    );

    if (favouriteCity) searchedCities.push(Object.assign(city, { fav: true }));
    else searchedCities.push(Object.assign(city, { fav: false }));
  });

  return (
    <div className={styles.cities}>
      <ul>
        {props.cities.map((city) => (
          <li key={city.id} id={city.id} onClick={props.onSubmit}>
            <div className={styles.name}>
              <h4>{city.name}</h4>
              {apiCtx.userInfo && (
                <button
                  title="add to favourite"
                  onClick={addFavoutiteCityHandler}
                  className={`${styles["star-button"]} ${
                    city.fav && styles["star-button-active"]
                  }`}
                />
              )}
            </div>
            <div className={styles.cityInfo}>
              <p>
                {city.region && city.region + ","} {city.country}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(SearchedCityList);
