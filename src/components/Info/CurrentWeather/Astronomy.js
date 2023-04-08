import { useEffect, useContext, useState } from "react";
import ApiContext from "../../../store/api-context";
import useHttp from "../../../hooks/use-http";
import Card from "../../UI/Card";
import styles from "./Astronomy.module.css";

function Astronomy() {
  const [astronomy, setAstronomy] = useState([]);
  const apiCtx = useContext(ApiContext);
  const { httpRequest: fetchData, loading, error } = useHttp();

  // Get astronomy of displayed city
  useEffect(() => {
    const requestConfig = {
      url:
        "https://api.weatherapi.com/v1/astronomy.json?key=" +
        apiCtx.key +
        "&q=" +
        apiCtx.city +
        "&dt=" +
        new Date(),
    };

    const transformData = (data) => {
      setAstronomy(data.astronomy.astro);
    };

    fetchData(requestConfig, transformData);
  }, [fetchData]);

  return (
    <Card className="container">
      <div className="title">Astronomy</div>
      <div className={styles.info}>
        {!loading && !error && (
          <ul>
            <li>Sunrise: {!loading && astronomy.sunrise}</li>
            <li>Sunset: {!loading && astronomy.sunset}</li>
          </ul>
        )}
      </div>
    </Card>
  );
}

export default Astronomy;
