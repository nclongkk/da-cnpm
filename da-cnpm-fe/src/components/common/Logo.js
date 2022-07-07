import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginLeft: -4,
  },
  text: {
    color: "white",
    fontSize: 26,
  },
}));
export default function Logo() {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Link to="/" className={classes.wrapper}>
        <Typography variant="h6" className={classes.text} noWrap>
          E-CLOTHES
        </Typography>
      </Link>
      {window.location.pathname === "/cart" && (
        <Box ml={2} display="flex" alignItems="center">
          <Divider
            orientation="vertical"
            flexItem
            style={{ backgroundColor: "white", height: 30 }}
          />
          <Box pl={2} style={{ fontSize: 20 }}>
            Shopping Cart
          </Box>
        </Box>
      )}
      {window.location.pathname === "/checkout" && (
        <Box ml={2} display="flex" alignItems="center">
          <Divider
            orientation="vertical"
            flexItem
            style={{ backgroundColor: "white", height: 30 }}
          />
          <Box pl={2} style={{ fontSize: 20 }}>
            Checkout
          </Box>
        </Box>
      )}
    </Box>
  );
}
