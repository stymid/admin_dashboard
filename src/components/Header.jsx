import { Link } from "react-router";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import FitbitIcon from "@mui/icons-material/Fitbit";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5">
      <div>
        <Link to={"/"} className="p-2">
          <FitbitIcon />
        </Link>
        <Link to={"/"} className="hover:text-slate-600">
          <HomeIcon color="success" />
        </Link>
      </div>
      <div>
        <Link to="/createuser">
          <AddBoxIcon color="success" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
