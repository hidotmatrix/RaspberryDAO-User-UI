import React, { useContext } from "react";
import styles from "./Activity.module.scss";
import Profile from "../../images/ActivityProfile.svg";
import { ThemeContext } from "../../App";
function Activity() {
  const themes = useContext(ThemeContext);
  const { theme } = themes;
  let Activities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.activitypage}>
        <table className={styles.displaytable}>
          <thead>
            <tr className={styles.clientrowhead}>
              <th></th>
              <th>Name</th>
              <th>Transaction No.</th>
              <th>Transaction Type</th>
              <th>Total Amount</th>
              <th>Mint Address</th>
            </tr>
          </thead>
          <tbody>
            {Activities.map((c, i) => {
              return (
                <tr className={styles.clientrow}>
                  <td>
                    <img src={Profile} alt="Profile"></img>
                  </td>
                  <td>Hello</td>
                  <td>Hello</td>
                  <td>Helllo</td>
                  <td>Hello</td>
                  <td>Helllo</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activity;
