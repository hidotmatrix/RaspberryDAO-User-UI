import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Activity from "./components/Activity/Activity";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Profiledesc from "./components/Profiledesc/Profiledesc";
import Swap from "./components/Swap/Swap";
import { useAccount, useNetwork } from "wagmi";

export const ThemeContext = createContext(null);

function App() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/profile/:id" exact element={<Profiledesc />} />
            <Route
              path="/swap"
              exact
              element={
                isConnected && chain.network !== "Godwoken" ? (
                  <Swap />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route path="/activity" exact element={<Activity />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
