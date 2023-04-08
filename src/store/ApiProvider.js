import { useEffect, useReducer, useState } from "react";
import useHttp from "../hooks/use-http";
import {
  getDatabase,
  ref,
  push,
  child,
  update,
  remove,
} from "firebase/database";
import ApiContext from "./api-context";

const defaultApiState = {
  key: "fe48fd6377724dd494a202312231502",
  city: null,
  currentWeather: {},
  isCurrentLocation: false,
  currentLocationWeather: null,
};

const apiReducer = (state, action) => {
  if (action.type === "CHANGE_CITY")
    return {
      key: state.key,
      city: action.city.url,
      currentWeather: state.current,
      isCurrentLocation: false,
      currentLocationWeather: state.currentLocationWeather,
    };
  if (action.type === "CHANGE_CITY_CUR_LOC")
    return {
      key: state.key,
      city: action.city,
      currentWeather: state.current,
      isCurrentLocation: true,
      currentLocationWeather: state.currentLocationWeather,
    };
  if (action.type === "CURRENT_WEATHER")
    if (state.isCurrentLocation) {
      return {
        key: state.key,
        city: state.city,
        currentWeather: action.current,
        isCurrentLocation: state.isCurrentLocation,
        currentLocationWeather: action.current,
      };
    } else {
      return {
        key: state.key,
        city: state.city,
        currentWeather: action.current,
        isCurrentLocation: state.isCurrentLocation,
        currentLocationWeather: state.currentLocationWeather,
      };
    }

  return defaultApiState;
};

function ApiProvider(props) {
  const [apiState, dispatchApiAction] = useReducer(apiReducer, defaultApiState);
  const [newCity, setNewCity] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { httpRequest, loading, error } = useHttp();

  // Set city info
  const changeCityHandler = (city, dataType = "URL") => {
    setNewCity(true);

    if (city.url === apiState.city) {
      setNewCity(false);
      return;
    }

    if (dataType === "URL") dispatchApiAction({ type: "CHANGE_CITY", city });
    if (dataType === "CURRENT_LOC")
      dispatchApiAction({ type: "CHANGE_CITY_CUR_LOC", city });
  };

  // Add city to favourites list
  const addFavouriteCityHandler = (city) => {
    const db = getDatabase();
    const newKey = push(child(ref(db), "posts")).key;
    const updates = {};
    updates["users/" + userInfo.uid + "/favouriteCities/" + newKey] = city;
    update(ref(db), updates);
  };

  // Remove city from favourites list
  const removeFavoutireCityHandler = (cityId) => {
    const db = getDatabase();
    const cityRef = ref(
      db,
      "users/" + userInfo.uid + "/favouriteCities/" + cityId
    );
    remove(cityRef);
  };

  // Set logged in user
  const UserInfoHandler = (user) => {
    setUserInfo(user);
  };

  // Get current weather data
  useEffect(() => {
    if (!apiState.city) return;

    const requestConfig = {
      url:
        "https://api.weatherapi.com/v1/current.json?key=" +
        apiState.key +
        "&q=" +
        apiState.city +
        "&aqi=yes ",
    };

    const transformData = (data) => {
      dispatchApiAction({
        type: "CURRENT_WEATHER",
        current: data,
      });
      setNewCity(false);
    };

    httpRequest(requestConfig, transformData);
  }, [httpRequest, apiState.key, apiState.city]);

  const apiContext = {
    key: apiState.key,
    city: apiState.city,
    changeCity: changeCityHandler,
    currentWeather: apiState.currentWeather,
    loading,
    error,
    newCity,
    addFavCity: addFavouriteCityHandler,
    removeFavCity: removeFavoutireCityHandler,
    userInfo,
    setUserInfo: UserInfoHandler,
    currentLocationWeather: apiState.currentLocationWeather,
  };

  return (
    <ApiContext.Provider value={apiContext}>
      {props.children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
