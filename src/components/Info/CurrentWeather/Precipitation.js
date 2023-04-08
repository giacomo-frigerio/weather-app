import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function Precipitation() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Precipitation</div>
      <ul>
        {!apiCtx.loading && !apiCtx.error && <li>{weather.precip_mm} mm</li>}
      </ul>
    </Card>
  );
}
export default Precipitation;
