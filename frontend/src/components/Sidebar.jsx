import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faWallet,
  faCoins,
  faShoppingCart,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div>
        {/* -------- PROFILE -------- */}
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>Abhinn</div>
            <div>Your Money</div>
          </div>
        </div>

        {/* -------- NAV -------- */}
        <ul className={styles.navList}>
          <NavLink to="/" className={styles.navLink}>
            <li className={styles.navItem}>
              <FontAwesomeIcon icon={faChartBar} />
              Dashboard
            </li>
          </NavLink>

          <NavLink to="/transactions" className={styles.navLink}>
            <li className={styles.navItem}>
              <FontAwesomeIcon icon={faWallet} />
              View Transactions
            </li>
          </NavLink>

          <NavLink to="/incomes" className={styles.navLink}>
            <li className={styles.navItem}>
              <FontAwesomeIcon icon={faCoins} />
              Incomes
            </li>
          </NavLink>

          <NavLink to="/expense" className={styles.navLink}>
            <li className={styles.navItem}>
              <FontAwesomeIcon icon={faShoppingCart} />
              Expenses
            </li>
          </NavLink>
        </ul>
      </div>

      {/* -------- SIGN OUT -------- */}
      <div className={styles.signOut}>
        <button className={styles.signOutBtn}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
