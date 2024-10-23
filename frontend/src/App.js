import { Routes, Route/*, Link*/ } from "react-router-dom";
import './App.css';
import Main from "./page/Main";
import Search from "./page/Search2";
import Homebus from "./page/Homebus";
import Schoolbus from "./page/Schoolbus";
import Sidebus from "./page/Sidebus";
import Cyclebus from "./page/Cyclebus";
import Bus from "./page/Bus";
import Building from "./page/Building2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Schoolbus" element={<Schoolbus />} />
        <Route path="/Cyclebus" element={<Cyclebus />} />
        <Route path="/Sidebus" element={<Sidebus />} />
        <Route path="/Homebus" element={<Homebus />} />
        <Route path="/Bus" element={<Bus />} />
        <Route path="/:buildingname/:floornumber" element={<Building />} />
      </Routes>
    </div>
  );
}

export default App;
