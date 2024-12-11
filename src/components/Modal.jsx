import { useNavigate, useParams } from "react-router";
import useGetUsers from "../Hooks/useGetUsers";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  console.log(id);

  const { data, errorGet, isLoading } = useGetUsers(id);
  if (isLoading) {
    return <p> wait...</p>;
  }
  if (errorGet) {
    return <p>an error is eccured</p>;
  }
  return (
    <div className="absolute flex items-center z-10 left-0 top-0 right-0 bottom-0 bg-white bg-zinc-700/50 backdrop-blur-sm transition-all duration-200">
      <div className="relative w-10/12 max-w-[750px] bg-white mx-auto rounded-md shadow-sm shadow-red-900 p-3">
        <h1 className="text-xl">User Detail:</h1>
        {Object.entries(data).map(([key, value], i) => {
          return (
            <div key={i} className="">
              <h2 className="inline text-xl text-zinc-500">{key}: </h2>
              <p className="inline text-zinc-600"> {value}</p>
            </div>
          );
        })}
        <Button
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </div>
  );
};

export default Modal;
