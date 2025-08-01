import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Anamolies from "./pages/Anamolies";
function App() {
  return (
    <>
     <Router>
    
            <Routes>
            <Route path="/" element={<Anamolies />} />

          
            </Routes>
    
  
      </Router>
    </>
  );
}

export default App;
