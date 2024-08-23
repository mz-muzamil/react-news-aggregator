import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchNews from "./Hooks/useFetchNews";
import { setFilters, setNewsData, setSearchValue } from "../redux/newsSlice";
import NewsCard from "./NewsCard";
import EmptyCardSkeleton from "./EmptyCardSkeleton";
import { handleFilterChange as genericHandleFilterChange } from "../utils/handleFilterChange";

const NewYourkTimesNews = () => {
  const newsData = useSelector((state) => state.news.newsData);
  const loading = useSelector((state) => state.news.loading);
  const searchValue = useSelector((state) => state.news.searchValue);
  const filters = useSelector((state) => state.news.filters);
  const dispatch = useDispatch();

  const url = useMemo(() => {
    const baseUrl =
      searchValue || filters.date || filters.category || filters.source
        ? "https://api.nytimes.com/svc/search/v2/articlesearch.json"
        : "https://api.nytimes.com/svc/topstories/v2/world.json";

    const params = {
      "api-key": process.env.REACT_APP_NYT_API_KEY,
      ...(searchValue && { q: searchValue }),
    };

    if (filters.date) {
      params.pub_date = filters.date;
    }

    if (filters.category) {
      params.fq = `news_desk:("${filters.category}")`;
    }

    if (filters.source) {
      params.fq = params.fq
        ? `${params.fq} AND source:("${filters.source}")`
        : `source:("${filters.source}")`;
    }

    const queryString = new URLSearchParams(params).toString();

    return `${baseUrl}?${queryString}`;
  }, [searchValue, filters]);

  const result = useFetchNews(url);

  useEffect(() => {
    if (result && result[0]) {
      let finalResults = [];

      if (
        searchValue !== "" ||
        filters.date ||
        filters.category ||
        filters.source
      ) {
        finalResults = result[0]?.response?.docs?.map((record) => ({
          title: record?.headline?.main,
          description: record?.lead_paragraph,
          urlToImage: record.multimedia?.length
            ? `https://static01.nyt.com/${record.multimedia[0]?.url}`
            : "",
          author: record?.byline?.original,
        }));
      } else {
        const homeResults = result[0]?.results || [];
        finalResults = homeResults.map((record) => ({
          title: record?.title,
          description: record?.abstract,
          urlToImage: record?.multimedia?.[0]?.url || "",
          author: record?.byline?.original,
        }));
      }

      if (finalResults) {
        if (JSON.stringify(newsData) !== JSON.stringify(finalResults)) {
          dispatch(setNewsData(finalResults));
        }
      }
    }
  }, [result, searchValue, filters, dispatch, newsData]);

  const handleSearch = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleFilterChange = genericHandleFilterChange(
    filters,
    dispatch,
    setFilters
  );

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
            Filters:
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
            <select
              name="category"
              className="p-2 border"
              onChange={handleFilterChange}
            >
              <option value="">Please Select</option>
              <option value="Technology">Technology</option>
              <option value="Food">Food</option>
              <option value="Cars">Cars</option>
              <option value="Culture">Culture</option>
              <option value="Education">Education</option>
            </select>
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
export default NewYourkTimesNews;
