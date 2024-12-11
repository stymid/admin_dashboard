import { useState } from "react";

const useUpdateUser = () => {
  const [errorUpdate, setError] = useState("");
  const [isLoadingUpdate, setisLoading] = useState("");
  const updateUser = async (id, userData) => {
    setisLoading(true);
    try {
      const response = await fetch(`http://localhost:5890/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("update is ot valid");
    } catch (error) {
      setError(error.message);
    } finally {
      setisLoading(false);
    }
  };
  return { errorUpdate, isLoadingUpdate, updateUser };
};
export default useUpdateUser;
