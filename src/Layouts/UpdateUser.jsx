import { useParams } from "react-router-dom";
import useGetUsers from "../Hooks/useGetUsers";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import useUpdateUser from "../Hooks/useUpdateUser";

const UpdateUser = () => {
  const { id } = useParams();
  const { data, errorGet, isLoading, reFetch } = useGetUsers(id);
  const { errorUpdate, isLoadingUpdate, updateUser } = useUpdateUser();
  const [errorvalidation, setErrorValidation] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validate = () => {
    const newError = {};
    if (!formData.name) {
      newError.name = "Name is required";
    }
    if (!formData.lastname) {
      newError.lastname = "Last name is required";
    }
    if (!formData.email) {
      newError.email = "email is required";
    }
    if (
      formData.password &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newError.email = "Invalid email address";
    }
    if (!formData.password) {
      newError.password = "password is required";
    }
    if (formData.confirmPassword !== formData.password) {
      newError.confirmPassword = "Passwords do not match";
    }
    return newError;
  };
  const handleSubmit = () => {
    console.log("validationErrors");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
      setErrorValidation(validationErrors);
      return;
    }
    updateUser(id, formData);
    if (errorUpdate) return;

    setTimeout(() => {
      reFetch();
    }, 500);
    setIsSucces(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        lastname: data.lastname || "",
        email: data.email || "",
        password: data.password || "",
        confirmPassword: data.confirmPassword || "",
      });
    }
  }, [data]);
  // useEffect(() => {
  //   console.log(validate());
  // }, [validate]);
  console.log(errorGet);

  return (
    <>
      <form
        className="grid grid-cols-2 gap-5 p-4"
        onSubmit={(e) => {
          console.log("jh,");

          e.preventDefault();
          handleSubmit();
        }}
      >
        {Object.entries(formData).map(([key, value], i) => {
          return (
            <div key={i} className="flex flex-col gap-2">
              <label className="text-lg" htmlFor={`${key}`}>
                {key}
              </label>
              <input
                className="border border-gray-500 px-2 py-1 rounded-lg "
                id={`${key}`}
                onChange={handleChange}
                value={value}
                placeholder={`Please write your ${key}`}
                type="text"
              />
              <span className="text-red-500">{errorvalidation[key]}</span>
            </div>
          );
        })}
        <div>
          <Button type="submit">
            {isLoading && isLoadingUpdate ? "creating..." : "Submit"}
          </Button>
        </div>
      </form>

      <p className="text-green-600">
        {isSuccess && "the user updated successfully"}
      </p>
      <p>{errorUpdate}</p>
    </>
  );
};

export default UpdateUser;
