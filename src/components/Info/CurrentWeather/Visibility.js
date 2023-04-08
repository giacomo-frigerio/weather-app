import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function Visibility() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Visibility</div>
      <ul>
        {!apiCtx.loading && !apiCtx.error && <li>{weather.vis_km} km</li>}
      </ul>
    </Card>
  );
}

export default Visibility;
