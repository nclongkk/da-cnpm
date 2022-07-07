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
import { AttachMoney } from "@material-ui/icons";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Pagination } from "@material-ui/lab";
import { LoadingTable } from "components/Common/LoadingTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import { statisticSelector } from "redux/selectors";
import { getTransactions } from "redux/statisticRedux";
import { useStyles } from "./styles";
import "./transactionList.css";

export default function TransactionList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const { transactions, isLoading, totalTransactions } =
    useSelector(statisticSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getTransactions({ page, limit: 10 }));
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
          <AttachMoney className={classes.icon} />
          <Typography className={classes.title}>Transactions</Typography>
        </Box>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            id ? history.push("/shipment") : history.push("/shipment/add");
          }}
        >
          {id ? "Back To transactions List" : "Report"}
        </Button>
      </Box>
      <Box my={2} mb={4}>
        {id ? (
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
                  <TableCell style={{ fontWeight: 600 }}>User</TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Date
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Amount
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">
                    Service Fee
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
                  <LoadingTable colsNumber={7} />
                ) : (
                  transactions.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                          <Avatar src={row.shop.avatar} alt="" />
                        </Box>
                      </TableCell>
                      <TableCell>{row?.shop.name}</TableCell>
                      <TableCell>{row?.user?.name}</TableCell>
                      <TableCell align="center">
                        {new Date(row?.createdAt).toLocaleDateString("en-us", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell align="center">
                        ${row?.order.amount ?? "..."}
                      </TableCell>
                      <TableCell align="center">
                        $
                        {(
                          row?.order.amount * row?.order?.serviceFeePercentage
                        ).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          color="primary"
                          label={row?.status}
                          style={{
                            letterSpacing: 1.2,
                            fontSize: 14,
                            backgroundColor: (() => {
                              switch (row?.status) {
                                case "transfer":
                                  return "#ffc107";
                                case "charge":
                                  return "#28a745";
                                case "refund":
                                  return "rgb(111 111 111)";
                                default:
                                  return "#ffc107";
                              }
                            })(),
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Detail">
                          <IconButton
                            aria-label="edit"
                            onClick={() => {
                              history.push(`/`);
                            }}
                          >
                            <ArrowForwardIcon />
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
      {transactions?.length === 0 ? (
        <></>
      ) : (
        <Box p={1} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalTransactions / 10)}
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
