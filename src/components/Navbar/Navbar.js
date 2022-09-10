import React, { useState, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logoDark from "../../images/logoDark.svg";
import logoWhite from "../../images/logoWhite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Toggle from "../../utils/Toggle/Toggle";
import hamburger from "../../images/Hamburger.svg";
import hamburgerdark from "../../images/HamburgerDark.svg";
import close from "../../images/close.svg";
import { ThemeContext } from "../../App";

function Navbar() {
  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;
  const nav = useLocation();
  // console.log("nav ", nav.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.entirenavbar}>
        <div className={styles.left}>
          <NavLink to="/">
            <div className={styles.logo}>
              {theme === "light" ? (
                <img src={logoWhite} alt="Logo" />
              ) : (
                <img src={logoDark} alt="Logo" />
              )}
            </div>
          </NavLink>
          <div className={styles.content}>
            <ul className={styles.menulinks}>
              <li>
                <NavLink
                  to="/"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Home
                  <div></div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Dashboard
                  <div></div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/marketplace"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Bridge NFT
                  <div></div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/activity"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Activities
                  <div></div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.toggle}>
            <Toggle setStatus={toggleTheme} status={theme} />
          </div>
          <div style={{color: "#4D3BCE" }}>
            <ConnectButton />
          </div>
          <div className={styles.hamburger} onClick={() => setMobileOpen(true)}>
            {
              theme === "light" ? (
                <img src={hamburgerdark} alt="Hamburger"></img>
              ) : (
                <img src={hamburger} alt="Hamburger"></img>
              )
            }
          </div>
        </div>
      </div>
      {mobileOpen ? (
        <div className={styles.mobileham}>
          <div className={styles.closeimg} onClick={() => setMobileOpen(false)}>
            <img src={close} alt="close"></img>
          </div>
          <div className={styles.mobileleft}>
            <div className={styles.mobilelogo}>
              <NavLink to="/">
                {theme === "light" ? (
                  <img
                    className={styles.mobilelogoimage}
                    onClick={() => setMobileOpen(false)}
                    src={logoWhite}
                    alt=""
                  />
                ) : (
                  <img
                    className={styles.mobilelogoimage}
                    onClick={() => setMobileOpen(false)}
                    src={logoDark}
                    alt=""
                  />
                )}
              </NavLink>
            </div>
            <div className={styles.mobilecontent}>
              <ul className={styles.mobilemenulinks}>
                <li onClick={() => setMobileOpen(false)}>
                  <NavLink
                    to="/"
                    className={(nav) =>
                      nav.isActive
                        ? `${styles.navlinks} ${styles.active}`
                        : `${styles.navlinks}`
                    }
                  >
                    Home
                    <div></div>
                  </NavLink>
                </li>
                <li onClick={() => setMobileOpen(false)}>
                  <NavLink
                    to="/profile"
                    className={(nav) =>
                      nav.isActive
                        ? `${styles.navlinks} ${styles.active}`
                        : `${styles.navlinks}`
                    }
                  >
                    Dashboard
                    <div></div>
                  </NavLink>
                </li>
                <li onClick={() => setMobileOpen(false)}>
                  <NavLink
                    to="/marketplace"
                    className={(nav) =>
                      nav.isActive
                        ? `${styles.navlinks} ${styles.active}`
                        : `${styles.navlinks}`
                    }
                  >
                    Bridge NFT
                    <div></div>
                  </NavLink>
                </li>
                <li onClick={() => setMobileOpen(false)}>
                  <NavLink
                    to="/activity"
                    className={(nav) =>
                      nav.isActive
                        ? `${styles.navlinks} ${styles.active}`
                        : `${styles.navlinks}`
                    }
                  >
                    Activities
                    <div></div>
                  </NavLink>
                </li>
                {/* <NavLink to="/profile" onClick={() => setMobileOpen(false)}>
                  <li className={styles.explore}>Dashboard</li>
                </NavLink>
                <NavLink to="/marketplace" onClick={() => setMobileOpen(false)}>
                  <li className={styles.marketplace}>Bridge NFT</li>
                </NavLink>
                <NavLink to="/activity" onClick={() => setMobileOpen(false)}>
                  <li className={styles.activities}>Activities</li>
                </NavLink> */}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
