import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import HomePage from "./pages/HomePage/HomePage.js";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
