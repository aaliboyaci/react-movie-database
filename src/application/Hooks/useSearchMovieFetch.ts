import { useState, useEffect } from "react";

export function useSearchMovieFetch<T>(
  promiseCallback: () => Promise<T>,
  query: string,
  page: number,
  setSearchSelect: number,
  genreID: string | null,
) {
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
        setError(error.message || "An error occurred");
        setIsLoading(false);
      });
  }, [query, page, setSearchSelect, genreID]);

  return { data, error, isLoading };
}
