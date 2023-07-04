import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const jsonData = response.data;
          if (typeof jsonData === 'object') {
            if (jsonData.hasOwnProperty('results')) {
              setData(jsonData.results);
            } else if (jsonData.hasOwnProperty('genres')) {
              setData(jsonData.genres);
            } else {
              setData(jsonData);
            }
          }
        } else {
          setError('Error occurred while fetching data');
        }
      } catch (error) {
        setError('Error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;
