import { useCallback, useEffect, useState } from "react";

const useGetUsers = (id) => {
  const [data, setData] = useState([]);
  const [errorGet, setErrorGet] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getusers = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchData = await fetch(
        id
          ? `http://localhost:5890/api/users/${id}`
          : "http://localhost:5890/api/users"
      );
      if (!fetchData.ok) throw new Error("an error acured");
      const res = await fetchData.json();

      setData(res);
    } catch (err) {
      setErrorGet(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getusers();
  }, [getusers]);
  return { data, errorGet, isLoading, reFetch: getusers };
};
export default useGetUsers;
