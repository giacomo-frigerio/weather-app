import { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import ApiContext from "../../../store/api-context";
import Card from "../../UI/Card";
import styles from "./Sports.module.css";

function Sports() {
  const apiCtx = useContext(ApiContext);
  const [sportData, setSportData] = useState([]);
  const { httpRequest: fetchData, loading, error } = useHttp();

  // Get sports in displayed city
  useEffect(() => {
    const requestConfig = {
      url:
        "https://api.weatherapi.com/v1/sports.json?key=" +
        apiCtx.key +
        "&q=" +
        apiCtx.city,
    };

    const transformData = (data) => {
      const sports = data.football.map((item) => {
        const curDate = new Date(item.start);
        const timestamp = new Intl.DateTimeFormat("locales", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(curDate);
        return { match: item.match, start: timestamp };
      });
      setSportData(sports);
    };

    fetchData(requestConfig, transformData);
  }, [fetchData]);

  return (
    <Card className="container">
      <div className="title">Sport</div>
      <div className={styles.sports}>
        <ul>
          {!loading &&
            !error &&
            sportData &&
            sportData.map((item, index) => (
              <li key={index}>
                <p>{item.match}</p>
                <p>{item.start}</p>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
}

export default Sports;
