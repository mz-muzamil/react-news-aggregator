import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/newsSlice";

const useFetchNews = (api) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(api);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setData([]);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [api, dispatch]);

  return [data];
};

export default useFetchNews;
