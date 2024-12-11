import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function BasicTable(props) {
  const { data, reFetch, deleteUser, isDeleting } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="left">Email</TableCell>

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
                  variant="contained"
                  disabled={isDeleting}
                  onClick={() => {
                    deleteUser(row._id);
                    setTimeout(() => {
                      reFetch();
                    }, 0);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align="right">
                <Link to={`/users/${row._id}`} className="p-2">
                  Update
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
