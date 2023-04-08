import { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import ApiContext from "../../../store/api-context";
import Card from "../../UI/Card";
import styles from "./DayForecast.module.css";

function DayForecast() {
  const [dayForecast, setDayForecast] = useState([]);
  const apiCtx = useContext(ApiContext);
  const { httpRequest: fetchData, loading, error } = useHttp();

  // Get forecast of displayed city
  useEffect(() => {
    const requestConfig = {
      url:
        "https://api.weatherapi.com/v1/forecast.json?key=" +
        apiCtx.key +
        "&q=" +
        apiCtx.city +
        "&days=10",
    };

    const transformData = (data) => {
      setDayForecast(
        data.forecast.forecastday.map((day) => ({
          date: new Date(day.date).toLocaleDateString(undefined, {
            weekday: "short",
          }),
          id: day.date_epoch,
          days: day.day,
        }))
      );
    };

    fetchData(requestConfig, transformData);
  }, [fetchData]);

  return (
    <Card className="container">
      <div className="title">3 Day Forecast</div>
      <ul className={styles.forecast}>
        {!loading &&
          !error &&
          dayForecast.map((day) => (
            <li key={day.id}>
              <div className={styles.day}>{day.date}</div>
              <div>H: {day.days.maxtemp_c} °C</div>
              <div>L: {day.days.mintemp_c} °C</div>
            </li>
          ))}
      </ul>
    </Card>
  );
}

export default DayForecast;
