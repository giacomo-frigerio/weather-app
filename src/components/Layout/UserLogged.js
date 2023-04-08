import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import ApiContext from "../../store/api-context";
import styles from "./UserLogged.module.css";
import userIcon from "../../assets/user.svg";

function UserLogged(props) {
  const apiCtx = useContext(ApiContext);

  // Firebase logout
  const LogoutUserHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        apiCtx.setUserInfo(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.actions}>
      {!apiCtx.userInfo && (
        <div className={styles["flip-card-inner"]}>
          <div className={styles["flip-card-front"]}>
            <img
              src={userIcon}
              alt="menu"
              width="35"
              height="35"
              align="right"
            />
          </div>
          <div className={styles["flip-card-back"]}>
            <button onClick={props.onLoginForm}>Login</button>
            <button onClick={props.onSignupForm}>Signup</button>
          </div>
        </div>
      )}
      {apiCtx.userInfo && <button onClick={LogoutUserHandler}>Logout</button>}
    </div>
  );
}

export default UserLogged;
