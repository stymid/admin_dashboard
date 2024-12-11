import { useState } from "react";

const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(null);
  const [errorDelete, setError] = useState(false);
  const deleteUser = async (id) => {
    setIsDeleting(true);
    setError(null);
    try {
      const fetchData = await fetch(`http://localhost:5890/api/users/${id}`, {
        method: "DELETE",
      });
      if (!fetchData.ok) throw new Error("an error acured during the deleting");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };
  return { deleteUser, isDeleting, errorDelete };
};
export default useDeleteUser;
