/* eslint-disable react/prop-types */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

export default function BasicTable(props) {
  const { data, reFetch, deleteUser, isDeleting } = props;
  const [isOpen, setIsOpen] = useState(false);
  // const { id } = useParams();
  // useEffect(() => {
  //   if (!id) {
  //     setIsOpen(false);
  //   }
  // }, [id]);
  // console.log(id);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name + " " + row.lastname}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    variant="contained"
                  >
                    <Link to={`/users/${row._id}`}>
                      <VisibilityIcon />
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={isDeleting}
                    onClick={() => {
                      deleteUser(row._id);
                      setTimeout(() => {
                        reFetch();
                      }, 0);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/users/update/${row._id}`}
                    className="p-2"
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpen && <Outlet />}
    </>
  );
}
