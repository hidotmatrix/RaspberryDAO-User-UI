import { createContext  , useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Activity from "./components/Activity/Activity";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Profiledesc from "./components/Profiledesc/Profiledesc";
import Swap from "./components/Swap/Swap";
export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("dark");
  

  useEffect(()=>{
    async function callGethandler(){
      await handleGetRequest()
    }
    callGethandler()
  },[])

  const handleGetRequest = async () =>{
    const response = await fetch("https://raspberrydaobridge.herokuapp.com/")
    if(response.status){
    }
 }

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
            <Route path="/marketplace" exact element={<Swap />} />
            <Route path="/activity" exact element={<Activity />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
