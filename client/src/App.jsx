import { Route, Routes } from "react-router-dom";
import Home from "./Home"
import Catalogue from "./Catalogue";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
      </Routes>
    </div>
  )
}

export default App