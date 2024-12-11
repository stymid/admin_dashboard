import useGetUsers from "../Hooks/useGetUsers";
import useDeleteUser from "../Hooks/useDeleteUser";
import Table from "./Table";

const UserList = () => {
  const { data, errorGet, isLoading, reFetch } = useGetUsers();

  const { deleteUser, isDeleting, errorDelete } = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;
  if (errorGet) return <div>Error: {errorGet}</div>;
  if (!data || data.length === 0) return <div>No users found.</div>;

  return (
    <>
      {errorDelete && (
        <div className="text-red-700">delet was unsucsesfull</div>
      )}
      <Table
        data={data}
        reFetch={reFetch}
        deleteUser={deleteUser}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserList;
