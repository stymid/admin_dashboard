import { useState } from "react";

const useCreateUser = () => {
  const [createError, setError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const creatUser = async (userData) => {
    setCreateLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("http://localhost:5890/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setCreateLoading(false);
        return response;
      }
      if (!response.ok) throw new Error(response);
    } catch (error) {
      setCreateLoading(false);
      setError("an error is fucked");
      return error;
    }
  };

  return { creatUser, createError, createLoading };
};
export default useCreateUser;
