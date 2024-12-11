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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="bg-slate-500"
          id="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Please write your name"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input
          className="bg-slate-500"
          id="lastname"
          onChange={handleChange}
          value={formData.lastname}
          placeholder="Please write your lastname"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="bg-slate-500"
          id="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Please write your email"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="bg-slate-500"
          id="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Please write your Passwoord"
          type="password"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="bg-slate-500"
          id="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          placeholder="Please write your confirm Password"
          type="password"
        />
      </div>
      <div>
        <Button type="submit">
          {isLoading && isLoadingUpdate ? "creating..." : "Submit"}
        </Button>
      </div>
      <p>{errorGet}</p>
      <p>{errorUpdate}</p>
    </form>
  );
};

export default UpdateUser;
