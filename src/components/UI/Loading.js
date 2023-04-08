import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.drawing} id="loading">
      <div className={styles["loading-dot"]}></div>
    </div>
  );
}

export default Loading;
