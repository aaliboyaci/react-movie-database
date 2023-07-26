import { useState, useEffect } from 'react';

export function useRandomFetch<T>(promiseCallback: () => Promise<T>, dice:number) {
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
  }, [dice]);


  return { data, error, isLoading, dice };
}
