import { useContext, useState, useEffect } from "react";
import ApiContext from "../../../store/api-context";
import useHttp from "../../../hooks/use-http";
import Card from "../../UI/Card";
import styles from "./HourForecast.module.css";

function HourForecast() {
  const [hourForecast, setHourForecast] = useState([]);
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
        "&days=1",
    };

    const transformData = (data) => {
      setHourForecast(
        data.forecast.forecastday[0].hour.map((hour) => ({
          id: hour.time_epoch,
          hour: new Date(hour.time).toLocaleTimeString(undefined, {
            hour: "2-digit",
          }),
          condition: hour.condition.icon,
          temperature: hour.temp_c,
        }))
      );
    };

    fetchData(requestConfig, transformData);
  }, [fetchData]);

  return (
    <Card className="container">
      <div className="title">Hourly Forecast</div>
      <div>
        <ul className={styles.hours}>
          {!loading &&
            !error &&
            hourForecast.map((hour) => (
              <li key={hour.id}>
                <div>{hour.hour}</div>
                <div className={styles.condition}>
                  <img
                    src={hour.condition}
                    alt="condition"
                    height="25"
                    width="25"
                    align="center"
                  />
                </div>
                <div>{hour.temperature} °C</div>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
}
export default HourForecast;
