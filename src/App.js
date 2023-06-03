import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Sidebar from "./pages/Sidebar";
import CartPage from "./pages/CartPage";
// import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/history" exact element={<History />}></Route>
          <Route path="/cart" exact element={<CartPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
