import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Player from "./pages/Player";
import ChoosePlan from "./pages/ChoosePlan";
import Settings from "./pages/Settings";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/player/:id" element={<Player />} />
        <Route path="/" element={<Home />} />
        <Route path="/for-you" element={<Dashboard />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/choose-plan" element={<ChoosePlan />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;