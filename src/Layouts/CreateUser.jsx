import { Button } from "@mui/material";
import { useState } from "react";
import useCreateUser from "../Hooks/useCreateUser";

const CreateUser = () => {
  const { creatUser, createError, createLoading } = useCreateUser();

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
    if (!formData.confirmPassword) {
      newError.confirmPassword = "confirmPassword is required";
    }
    if (!formData.confirmPassword === formData.password) {
      newError.confirmPassword = "Passwords do not match";
    }
    return newError;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    const response = await creatUser(formData);
    console.log(response);
    if (response.ok) {
      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <form
      className="grid grid-cols-2 gap-5 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {Object.keys(formData).map((value, key) => {
        return (
          <div className="flex flex-col gap-2" key={key}>
            <label className="text-lg" htmlFor={value}>
              {value.split("")[0].toUpperCase() + value.slice(1)}
            </label>
            <input
              className="border border-gray-500 px-2 py-1 rounded-lg "
              id={value}
              onChange={handleChange}
              value={formData[value]}
              placeholder={`Please write your ${value}`}
              type="text"
            />
          </div>
        );
      })}

      <div>
        <Button disabled={createLoading} type="submit">
          {createLoading ? "creating..." : "Submit"}
        </Button>
      </div>
      <div>{createLoading ? "creating..." : ""}</div>
      <div>{createError}</div>
    </form>
  );
};

export default CreateUser;
