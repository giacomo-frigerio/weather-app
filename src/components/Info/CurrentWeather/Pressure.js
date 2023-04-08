import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function Pressure() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Pressure</div>
      <ul>
        {!apiCtx.loading && !apiCtx.error && <li>{weather.pressure_mb} mb</li>}
      </ul>
    </Card>
  );
}

export default Pressure;
