import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import ApiContext from "../../store/api-context";
import SearchedCityList from "./SearchedCityList";
import styles from "./SearchCity.module.css";

function SearchCity(props) {
  const [enteredCity, setEnteredCity] = useState("");
  const [searchingCity, setSearchingCity] = useState(false);
  const [searchedCities, setsearchedCities] = useState([]);
  const { httpRequest: fetchData, loading, error } = useHttp();
  const apiCtx = useContext(ApiContext);

  // Get searched cities list
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (enteredCity.trim().length === 0) {
        setSearchingCity(false);
        return;
      }

      const requestConfig = {
        url:
          "https://api.weatherapi.com/v1/search.json?key=" +
          apiCtx.key +
          "&q=" +
          enteredCity,
      };

      const transformData = (data) => {
        if (error) return;

        setsearchedCities(data);
        setSearchingCity(true);
      };

      fetchData(requestConfig, transformData);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredCity, fetchData]);

  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  // Choosed city to display
  const chooseCityHandler = (event) => {
    event.preventDefault();

    let cityId = null;
    if (event.target.tagName === "LI") cityId = +event.target.id;
    else {
      const ele = event.target.closest("li");
      cityId = +ele.id;
    }

    if (cityId === null) return;

    const searchedCity = searchedCities.filter((item) => {
      return item.id === cityId;
    });
    apiCtx.changeCity(searchedCity[0]);
  };

  return (
    <div className={styles.city}>
      <form onSubmit={chooseCityHandler}>
        <input
          type="text"
          name="city"
          placeholder="Search city"
          onChange={cityChangeHandler}
        />
      </form>
      {error && <p>Error</p>}
      {loading && <p>Loading...</p>}
      {!error && !loading && searchingCity && (
        <SearchedCityList
          cities={searchedCities}
          favCities={props.favCities}
          onSubmit={chooseCityHandler}
        />
      )}
    </div>
  );
}

export default SearchCity;
