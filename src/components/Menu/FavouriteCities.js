import { useCallback, useContext, useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import ApiContext from "../../store/api-context";
import styles from "./FavouriteCities.module.css";
import trashIcon from "../../assets/trash.svg";
import trashIconWhite from "../../assets/trash-white.svg";

function FavouriteCities(props) {
  const [favCities, setFavCities] = useState([]);
  const [errorFav, setErrorFav] = useState(false);
  const apiCtx = useContext(ApiContext);
  const { onLoadingFav } = props;
  let clickedRemoveButton = false;

  // Remove city from favourites list
  const removeFavouriteHandler = (event) => {
    clickedRemoveButton = true;
    const cityId = event.target.closest("li").id;

    if (cityId === null) return;

    const newFavCities = favCities.filter((city) => city.id !== cityId);

    setFavCities(newFavCities);
    apiCtx.removeFavCity(cityId);

    console.log(newFavCities);
    onLoadingFav(newFavCities);
  };

  // Display clicked city
  const chooseCityHandler = (event) => {
    event.preventDefault();

    // Do nothing if clicked city to remove it
    if (clickedRemoveButton === true) {
      clickedRemoveButton = false;
      return;
    }

    const cityId = event.target.closest("li").id;

    if (cityId === null) return;

    const searchedCity = favCities.filter((item) => {
      return item.id === cityId;
    });
    apiCtx.changeCity(searchedCity[0]);
  };

  // Set trash icon to white
  const whiteIconHandler = useCallback(
    (event) => {
      const cityId = event.target.closest("li").id;

      if (cityId === null) return;

      const icon = trashIconWhite;

      setFavCities((prevState) => {
        const key = favCities.findIndex((city) => city.id === cityId);
        const newState = [...prevState];
        newState[key] = {
          ...newState[key],
          icon,
        };
        return newState;
      });
    },
    [favCities]
  );

  // Set trash icon to black (dft)
  const blackIconHandler = useCallback(
    (event) => {
      const cityId = event.target.closest("li").id;

      if (cityId === null) return;

      const icon = trashIcon;

      setFavCities((prevState) => {
        const key = favCities.findIndex((city) => city.id === cityId);
        const newState = [...prevState];
        newState[key] = {
          ...newState[key],
          icon,
        };
        return newState;
      });
    },
    [favCities]
  );

  // Get favourites city list from firebase
  useEffect(() => {
    const db = getDatabase();
    let favCitiesRef;
    if (apiCtx.userInfo) {
      favCitiesRef = ref(
        db,
        "users/" + apiCtx.userInfo.uid + "/favouriteCities"
      );
    }

    if (!favCitiesRef) return;

    const transformData = (data) => {
      if (data === null) return;

      const loadedCities = [];

      for (const key in data) {
        loadedCities.push({
          id: key,
          cityId: data[key].id,
          name: data[key].name,
          region: data[key].region,
          country: data[key].country,
          url: data[key].url,
          icon: trashIcon,
        });
      }

      setFavCities(loadedCities);
      onLoadingFav(loadedCities);
    };

    const listener = onValue(favCitiesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        transformData(data);
        setErrorFav(false);
      } catch (error) {
        setErrorFav(true);
      }
    });

    return () => {
      listener();
    };
  }, [apiCtx.userInfo, onLoadingFav]);

  // Set returned content
  let content = "";
  if (!apiCtx.userInfo)
    content = (
      <p className={styles.unavailable}>Must be logged in to see favourites</p>
    );
  else {
    if (errorFav) content = <p className={styles.unavailable}>Error</p>;
    if (!errorFav && favCities) {
      content = favCities.map((city) => (
        <li
          key={city.id}
          id={city.id}
          onClick={chooseCityHandler}
          onMouseOver={whiteIconHandler}
          onMouseOut={blackIconHandler}
        >
          <div className={styles.name}>
            <p>{city.name}</p>
            <p className={styles.cityInfo}>
              {city.region && city.region + ","} {city.country}
            </p>
          </div>
          <img
            src={city.icon}
            width="20"
            height="20"
            align="right"
            alt="remove"
            title="remove from favourite"
            onClick={removeFavouriteHandler}
          />
        </li>
      ));
    }
  }

  return (
    <div className={styles.favourites}>
      <h3>Favourites</h3>
      <ul>{content}</ul>
    </div>
  );
}

export default FavouriteCities;
