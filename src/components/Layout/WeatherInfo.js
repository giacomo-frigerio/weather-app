import Card from "../UI/Card";
import DayForecast from "../Info/Forecast/DayForecast";
import HourForecast from "../Info/Forecast/HourForecast";
import AirQuality from "../Info/CurrentWeather/AirQuality";
import Astronomy from "../Info/CurrentWeather/Astronomy";
import UVIndex from "../Info/CurrentWeather/UVIndex";
import Wind from "../Info/CurrentWeather/Wind";
import Precipitation from "../Info/CurrentWeather/Precipitation";
import FeelsLike from "../Info/CurrentWeather/FeelsLike";
import Humidity from "../Info/CurrentWeather/Humidity";
import Pressure from "../Info/CurrentWeather/Pressure";
import Visibility from "../Info/CurrentWeather/Visibility";
import Cloud from "../Info/CurrentWeather/Cloud";
import Sports from "../Info/MoreInfo/Sports";
import styles from "./WeatherInfo.module.css";

function WeatherInfo() {
  return (
    <Card className={styles.card}>
      <div className={styles.weatherInfo}>
        <HourForecast />
        <div className={styles.right}>
          <DayForecast />
          <div className={styles.addInfo}>
            <Astronomy />
            <AirQuality />
          </div>
          <div className={styles.addInfo}>
            <UVIndex />
            <Wind />
            <Precipitation />
          </div>
          <div className={styles.addInfo}>
            <FeelsLike />
            <Visibility />
            <Humidity />
            <Pressure />
            <Cloud />
          </div>
          <div className={styles.addInfo}>
            <Sports />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WeatherInfo;
