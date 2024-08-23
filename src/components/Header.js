import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { resetFilters, resetState } from "../redux/newsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    // Dispatch reset filters action on route change
    dispatch(resetFilters());
    dispatch(resetState());
  }, [location, dispatch]);

  return (
    <>
      <header className="pt-5 pb-5 bg-[#ee002d]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="logo uppercase text-white font-bold text-xl">
              <Link className="text-white" to="/">
                NEWS AGGREGATOR
              </Link>
            </div>
            <nav className="navigation flex gap-4">
              <Link className="text-white" to="/">
                Home
              </Link>
              <Link className="text-white" to="/news-api">
                News API
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
