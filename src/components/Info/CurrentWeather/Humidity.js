import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function Humidity() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Humidity</div>
      <ul>
        {!apiCtx.loading && !apiCtx.error && <li>{weather.humidity}%</li>}
      </ul>
    </Card>
  );
}

export default Humidity;
