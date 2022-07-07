import { Box, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ShopInfo from "components/seller/settings";
import React from "react";
import { useStyles } from "./styles";

export default function Settings() {
  const classes = useStyles();

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <SettingsIcon className={classes.icon} />
          <Typography className={classes.title}>Profile</Typography>
        </Box>
      </Box>
      <Box>
        <ShopInfo />
      </Box>
    </Box>
  );
}
