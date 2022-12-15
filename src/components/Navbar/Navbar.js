import React, { useState, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logo from "../../images/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import Toggle from "../../utils/Toggle/Toggle";
import hamburger from "../../images/Hamburger.svg";
import hamburgerdark from "../../images/HamburgerDark.svg";
import close from "../../images/close.svg";
import { ThemeContext } from "../../App";

function Navbar() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const themes = useContext(ThemeContext);
  const { theme, toggleTheme } = themes;
  const nav = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={theme === "light" ? styles.light : styles.dark}>
      <div className={styles.entirenavbar}>
        <div className={styles.left}>
          <NavLink exact to="/">
            <div className={styles.logo}>
              <img src={logo} alt="Logo" />
              {/* {theme === "light" ? (
                <img src={raspberrylogo} alt="Logo" />
              ) : (
                <img src={raspberrylogo} alt="Logo" />
              )} */}
            </div>
          </NavLink>
        </div>
        <div className={styles.content}>
          <ul className={styles.menulinks}>
            <li>
              <NavLink
                exact
                to="/"
                className={(nav) =>
                  nav.isActive ? `${styles.navlinks}` : `${styles.navlinks}`
                }
              >
                Home
                <div></div>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/profile"
                className={(nav) =>
                  nav.isActive
                    ? `${styles.navlinks} ${styles.active}`
                    : `${styles.navlinks}`
                }
              >
                My NFTs
                <div></div>
              </NavLink>
            </li>
            {isConnected && chain.network !== "Godwoken Testnet" ? (
              <li>
                <NavLink
                  exact
                  to="/marketplace"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Swap NFT
                  <div></div>
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {/* {isConnected && chain.network !== "Godwoken Testnet" ? (
              <li>
                <NavLink
                  exact
                  to="/marketplace"
                  className={(nav) =>
                    nav.isActive
                      ? `${styles.navlinks} ${styles.active}`
                      : `${styles.navlinks}`
                  }
                >
                  Swap NFTs
                  <div></div>
                </NavLink>
              </li>
            ) : (
              ""
            )} */}

            {/* <li>
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
              </li> */}
          </ul>
        </div>
        <div className={styles.right}>
          <div className={styles.toggle}>
            <Toggle setStatus={toggleTheme} status={theme} />
          </div>
          <div style={{ color: "#F1709E" }}>
            <ConnectButton />
          </div>
          <div className={styles.hamburger} onClick={() => setMobileOpen(true)}>
            <img src={hamburger} alt="Hamburger"></img>
            {/* {theme === "light" ? (
              <img src={hamburgerdark} alt="Hamburger"></img>
            ) : (
              <img src={hamburger} alt="Hamburger"></img>
            )} */}
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
                <img
                  className={styles.mobilelogoimage}
                  onClick={() => setMobileOpen(false)}
                  src={logo}
                  alt=""
                />
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
                    My NFTs
                    <div></div>
                  </NavLink>
                </li>
                {isConnected && chain.network !== "Godwoken Testnet" ? (
                  <li onClick={() => setMobileOpen(false)}>
                    <NavLink
                      exact
                      to="/marketplace"
                      className={(nav) =>
                        nav.isActive
                          ? `${styles.navlinks} ${styles.active}`
                          : `${styles.navlinks}`
                      }
                    >
                      Swap NFT
                      <div></div>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
