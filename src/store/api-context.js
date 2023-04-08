import React from "react";

const ApiContext = React.createContext({
  key: "fe48fd6377724dd494a202312231502",
  city: null,
  changeCity: () => {},
  currentWeather: {},
  loading: true,
  error: null,
  newCity: false,
  addFavCity: () => {},
  removeFavCity: () => {},
  userInfo: null,
  setUserInfo: () => {},
  currentLocationWeather: null,
});

export default ApiContext;
