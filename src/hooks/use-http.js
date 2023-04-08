import { useCallback, useState } from "react";

function useHttp() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const httpRequest = useCallback(async (requestConfig, applyData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Couldn't fetch data");
    }

    setLoading(false);
  }, []);

  return { httpRequest, loading, error };
}

export default useHttp;
