import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function FeelsLike() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Feels Like</div>
      <ul>
        {!apiCtx.loading && !apiCtx.error && <li>{weather.feelslike_c} °C </li>}
      </ul>
    </Card>
  );
}

export default FeelsLike;
