import { useState } from "react";
import styles from "./page.module.scss";
import classNames from "classnames";

function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div
      className={classNames(styles.Page, {
        isDarkMode,
      })}
    >
      <button
        onClick={handleToggleMode}
        className={classNames(styles.Page_button, {
          [styles["Page_button--active"]]: isDarkMode,
        })}
      >
        {isDarkMode ? "라이트" : "다크"}모드로 변경
      </button>
      <h1 className={styles.Page_h1}>제목 입니다.</h1>
      <div>
        <p className={styles.Page_p}>내용 입니다.</p>
      </div>
    </div>
  );
}

export default Page;
