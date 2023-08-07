import { useState, useEffect } from 'react';

export function useFetch<T>(promiseCallback: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    promiseCallback()
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'An error occurred');
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading };
}
