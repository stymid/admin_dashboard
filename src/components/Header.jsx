import { Link } from "react-router";

const Header = () => {
  return (
    <div className="bg-slate-500 flex items-center justify-between px-5">
      <div>
        <Link to={"/"} className="p-2">
          Logo
        </Link>
        <Link to={"/"} className="hover:text-slate-600">
          Home
        </Link>
      </div>
      <div>
        <Link to="/createuser">&#43;user</Link>
      </div>
    </div>
  );
};

export default Header;
