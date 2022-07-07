import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shipmentSelector } from "redux/selectors";
import { createShipment, updateShipment } from "redux/shipmentRedux";
import { useStyles } from "./styles";

export default function ShipmentForm(props) {
  const { id } = useParams();
  const { shipments } = useSelector(shipmentSelector);

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [fee, setFee] = useState("");
  const [maxOrderValue, setMaxOrderValue] = useState("");

  useEffect(() => {
    if (id !== "add") {
      const shipment = shipments.find((item) => +item.id === +id);
      setName(shipment?.name);
      setDescription(shipment?.description);
      setFee(shipment?.fee);
      setMaxOrderValue(shipment?.maxOrderValue);
      setWorkingTime(shipment?.workingTime);
    }
  }, [id, shipments]);

  const handleSubmit = () => {
    const shipment = { name, description, maxOrderValue, fee, workingTime };
    if (id === "add") {
      dispatch(createShipment(shipment));
    } else {
      dispatch(updateShipment({ id, shipment }));
    }
    history.push("/shipments");
  };
  return (
    <Paper>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">
                  Shipment's Name
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  label="Shipment's Name"
                  placeholder="Shipment's Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">Fee</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={fee}
                  onChange={(e) => {
                    setFee(e.target.value);
                  }}
                  label="Fee"
                  placeholder="Fee"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                className={classes.phone}
              >
                <InputLabel htmlFor="component-outlined">
                  Over Max Value
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={maxOrderValue}
                  onChange={(e) => {
                    setMaxOrderValue(e.target.value);
                  }}
                  label="Over Max Value"
                  placeholder="Over Max Value"
                  inputProps={{ type: "text" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">
                  Working Time
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={workingTime}
                  onChange={(e) => {
                    setWorkingTime(e.target.value);
                  }}
                  label="Working Time"
                  placeholder="Working Time"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">
                  Description
                </InputLabel>
                <OutlinedInput
                  multiline
                  rows={3}
                  id="component-outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  label="Description"
                  placeholder="Description"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {id === "add" ? "Add New" : "Save Changes"}
          </Button>
        </Box>
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
