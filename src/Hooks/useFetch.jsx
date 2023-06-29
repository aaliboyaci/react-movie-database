import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        if (response.ok) {
          const jsonData = await response.json();
          if (typeof jsonData === 'object') {
            if (jsonData.hasOwnProperty('results')) {
              setData(jsonData.results);
            } else if (jsonData.hasOwnProperty('genres')) {
              setData(jsonData.genres);
            } else 
              setData(jsonData);
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
