import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewYourkTimesNews from "./components/NewYorkTimesNews";
import NewsAPINews from "./components/NewsAPINews";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="flex-1 main pt-5 pb-5">
          <Routes>
            <Route path="/" element={<NewYourkTimesNews />} />
            <Route path="/news-api" element={<NewsAPINews/>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
