import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Layouts/Home";
import CreateUser from "./Layouts/CreateUser";
import UpdateUser from "./Layouts/UpdateUser";
import Layout from "./Layouts/Layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/users/:id" element={<UpdateUser />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/createuser/:ui" element={<CreateUser />} />
      </Route>
    </Routes>
  );
}

export default App;