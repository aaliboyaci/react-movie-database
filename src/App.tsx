import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import Header from "./presentation/Components/Header";
import Footer from "./presentation/Components/Footer";
import HomePage from "./presentation/Routes/HomePage";
import { Trending } from "./presentation/Routes/Trending/TrendingPage";
import { GenresPage } from "./presentation/Routes/Genres/GenresPage";
import WatchList from "./presentation/Routes/WatchList/WatchList";
import { MovieDetailsPage } from "./presentation/Routes/Details/MovieDetails";
import ErrorPage from "./presentation/Routes/ErrorPage";
import SearchPage from "./presentation/Routes/Search/SearchPage";
import PersonPage from "./presentation/Routes/Details/PersonDetails";
import {
  HOME,
  TRENDING,
  GENRESPAGE,
  WATCHLIST,
  DETAILSPAGE,
  PERSONPAGE,
  SEARCHPAGE,
  ERROR,
} from "./presentation/Routes/routes";
import Loader from "./presentation/Components/loaderIntro/Loader";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 2100);
  }, []);

  return (
    <>
      {showWelcome ? (
        <div className="welcome">
          <h2>Welcome to </h2>
          <h1>Movie Database App</h1>
          <Loader />
        </div>
      ) : (
        <div id="container">
          <Provider store={store}>
            <Router
              basename={
                process.env.NODE_ENV === "development"
                  ? "/"
                  : "/react-movie-database/"
              }
            >
              <Header />
              <Routes>
                <Route path={HOME} element={<HomePage />} />
                <Route path={TRENDING} element={<Trending />} />
                <Route path={GENRESPAGE} element={<GenresPage />} />
                <Route path={WATCHLIST} element={<WatchList />} />
                <Route path={DETAILSPAGE} element={<MovieDetailsPage />} />
                <Route path={PERSONPAGE} element={<PersonPage />} />
                <Route path={SEARCHPAGE} element={<SearchPage />} />
                <Route path={ERROR} element={<ErrorPage />} />
              </Routes>
              <br></br>
              <Footer />
            </Router>
          </Provider>
        </div>
      )}
    </>
  );
}

export default App;
