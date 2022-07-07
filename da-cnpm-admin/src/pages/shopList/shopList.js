import {
  Avatar,
  Box,
  Button,
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
import { Add, Delete, Edit, Storefront } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { LoadingTable } from "components/Common/LoadingTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import { userSelector } from "redux/selectors";
import { deleteShipment } from "redux/shipmentRedux";
import { getShops } from "redux/userRedux";
// import ShipmentForm from "./shipmentForm";
import "./shopList.css";
import { useStyles } from "./styles";

export default function ShopList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const { shops, isLoading, totalShops } = useSelector(userSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getShops({ limit: 10, page }));
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
          <Storefront className={classes.icon} />
          <Typography className={classes.title}>Shops</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            id ? history.push("/shops") : history.push("/shops/add");
          }}
        >
          {id ? (
            "Back To Shipments List"
          ) : (
            <>
              <Add />
              New Shop
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
                  <TableCell style={{ fontWeight: 600 }}>Shop's Name</TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Paypal Email
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Owner's Name
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
                  shops?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar src={row.avatar} alt="" />
                        </Box>
                      </TableCell>
                      <TableCell>{row?.name ? row?.name : "xxx"}</TableCell>

                      <TableCell align="center">
                        {row?.paypalMail ? row?.paypalMail : "..."}
                      </TableCell>
                      <TableCell align="center">
                        {row?.owner?.name ? row?.owner?.name : "..."}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              history.push(`/shops/${row?.id}`);
                            }}
                          >
                            <Edit />
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
      {shops?.length === 0 ? (
        <></>
      ) : (
        <Box p={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalShops / 10)}
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
