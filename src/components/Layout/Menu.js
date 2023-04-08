import { useCallback, useContext, useState } from "react";
import Modal from "../UI/Modal";
import FavouriteCities from "../Menu/FavouriteCities";
import SearchCity from "../Menu/SearchCity";
import ApiContext from "../../store/api-context";
import CurrentLocation from "../Menu/CurrentLocation";
import menuIcon from "../../assets/menu.svg";
import menuIconWhite from "../../assets/menu-white.svg";
import styles from "./Menu.module.css";

function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [favCities, setFavCities] = useState([]);
  const apiCtx = useContext(ApiContext);

  const toggleMenuHandler = () => {
    setShowMenu((prevState) => {
      return !prevState;
    });
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  const LoadingFavCitiesHandler = useCallback((data) => {
    console.log(data);
    setFavCities(data);
  }, []);

  // Visible menu
  if (showMenu)
    return (
      <Modal className={styles.navBar} onClose={closeMenuHandler}>
        <img
          src={menuIcon}
          width="30"
          height="30"
          align="right"
          alt="menu"
          onClick={toggleMenuHandler}
        />
        <SearchCity favCities={favCities} />
        <div className={styles.cityList}>
          {apiCtx.currentLocationWeather && <CurrentLocation />}
          <FavouriteCities onLoadingFav={LoadingFavCitiesHandler} />
        </div>
      </Modal>
    );

  // Hidden menu
  return (
    <div className={`${styles.navBar} ${styles.hidden}`}>
      <img
        src={menuIconWhite}
        alt="menu"
        width="30"
        height="30"
        align="right"
        onClick={toggleMenuHandler}
      />
    </div>
  );
}

export default Menu;
