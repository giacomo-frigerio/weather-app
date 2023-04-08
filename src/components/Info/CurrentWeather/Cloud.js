import { useContext } from "react";
import Card from "../../UI/Card";
import ApiContext from "../../../store/api-context";

function Cloud() {
  const apiCtx = useContext(ApiContext);
  const weather = apiCtx.currentWeather.current;

  return (
    <Card className="container">
      <div className="title">Cloud</div>
      <ul>{!apiCtx.loading && !apiCtx.error && <li>{weather.cloud} %</li>}</ul>
    </Card>
  );
}

export default Cloud;
