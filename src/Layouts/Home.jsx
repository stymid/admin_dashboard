import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <Link to={"/users"}> go to Users</Link>
    </div>
  );
};

export default Home;
