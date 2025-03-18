import { useEffect, useState } from "react";

/**
 * Fetches data from an api url.
 *
 * Returns three variables indicating the stage of the fetching process bundled in an object.
 * In case the data is successfully fetched that is also returned.
 *
 * @param {String} apiUrl The endpoint to which to request the data.
 *
 * @return {Object} An object with the properties 'data', 'error' and 'loading'. The last two
 * are binaries indicating a status, while 'data' also returns the data requested if it is successful.
 */
const useData = (apiUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl, {
      mode: "cors",
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error(`Unable to fetch data. Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data["data"]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));

    return () => {
      setData(null);
      setError(null);
      setLoading(true);
    };
  }, [apiUrl]);

  return { data, error, loading };
};

export default useData;
