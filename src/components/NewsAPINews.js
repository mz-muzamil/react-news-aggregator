import { useDispatch, useSelector } from "react-redux";
import { setNewsData, setSearchValue } from "../redux/newsSlice";
import useFetchNews from "./Hooks/useFetchNews";
import { useEffect } from "react";
import NewsCard from "./NewsCard";
import EmptyCardSkeleton from "./EmptyCardSkeleton";
// import { handleFilterChange as genericHandleFilterChange } from "../utils/handleFilterChange";

const NewsAPINews = () => {
  const newsData = useSelector((state) => state.news.newsData);
  const loading = useSelector((state) => state.news.loading);
  const searchValue = useSelector((state) => state.news.searchValue);
  // const filters = useSelector((state) => state.news.filters);
  const dispatch = useDispatch();

  const url = `https://newsapi.org/v2/everything?q=${
    searchValue || "bitcoin"
  }&apiKey=3f19ce51e72f416b821e35ebd0b2658e`;

  const result = useFetchNews(url);

  useEffect(() => {
    if (result) {
      if (JSON.stringify(newsData) !== JSON.stringify(result[0]?.articles)) {
        dispatch(setNewsData(result[0]?.articles));
      }
    }
  }, [result, dispatch, newsData]);

  const handleSearch = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  // console.log("resultresult", result);

  return (
    <>
      <div className="container mx-auto">
        <div className="section-heading border-b mb-5 flex justify-between items-center">
          <h6 className="py-3 px-5 bg-[#ee002d] text-white inline-block font-bold">
            Popular News
          </h6>
          <div className="search-filters flex gap-4 items-center">
            Search{" "}
            <input
              onChange={handleSearch}
              type="text"
              name="search_term"
              value={searchValue}
              placeholder="Search..."
              className="block flex-1 border bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {!loading && newsData ? (
            newsData.map((singleNews, index) => (
              <NewsCard singleNews={singleNews} key={index} />
            ))
          ) : (
            <EmptyCardSkeleton count={9} />
          )}
        </div>
      </div>
    </>
  );
};
export default NewsAPINews;
