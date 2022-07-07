import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add, Delete, Person } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import { Pagination } from "@material-ui/lab";
import { LoadingTable } from "components/Common/LoadingTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import { userSelector } from "redux/selectors";
import { deleteShipment } from "redux/shipmentRedux";
import { getUsers, updateStatus } from "redux/userRedux";
import { useStyles } from "./styles";
import "./userList.css";

export default function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { users, isLoading, totalUsers } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getUsers({ limit: 10, page }));
  }, [dispatch, page]);

  return (
    <Box style={{ flex: 4 }} p={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Person className={classes.icon} />
          <Typography className={classes.title}>Users</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            id ? history.push("/users") : history.push("/users/add");
          }}
        >
          {id ? (
            "Back To Shipments List"
          ) : (
            <>
              <Add />
              New User
            </>
          )}
        </Button>
      </Box>
      <Box my={2} mb={2}>
        {id ? (
          // <ShipmentForm />
          <></>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Avatar
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }}>User's Name</TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Email
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Status
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <LoadingTable colsNumber={5} />
                ) : (
                  users?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar src={row.avatar} alt="" />
                        </Box>
                      </TableCell>
                      <TableCell>{row?.name ? row?.name : "xxx"}</TableCell>
                      <TableCell align="center">
                        {row?.email ? row?.email : "..."}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          color="primary"
                          label={row?.isActive ? "Active" : "InActive"}
                          style={{
                            letterSpacing: 1.2,
                            fontSize: 14,
                            backgroundColor: row?.isActive
                              ? "rgb(49 142 246)"
                              : "rgb(244 45 45)",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={row?.isActive ? "InActive" : "Active"}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              dispatch(
                                updateStatus({
                                  id: row?.id,
                                  data: {
                                    isActive: !row?.isActive,
                                  },
                                })
                              );
                            }}
                          >
                            {row?.isActive ? (
                              <LockIcon />
                            ) : (
                              <NoEncryptionIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              dispatch(deleteShipment(row?.id));
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {users?.length === 0 ? (
        <></>
      ) : (
        <Box p={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalUsers / 10)}
            page={page}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Box>
  );
}
