import { Menu, MenuItem } from "@material-ui/core";
import { NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import "./topbar.css";
import Icons from "constants/icons";
import { logout } from "pages/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Topbar() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const handleLogoutClick = () => {
    localStorage.clear();
    const action = logout();
    dispatch(action);

    enqueueSnackbar("See you again 👋👋", {
      variant: "info",
    });

    history.push("/");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">E-Clothes</span>
        </div>
        {isLoggedIn && (
          <div className="topRight">
            <img
              src="https://res.cloudinary.com/e-decor/image/upload/v1643338393/uploads/asqpu8io4nkw074gsiaf.png"
              alt=""
              className="topAvatar"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
            <Menu
              elevation={2}
              keepMounted={false}
              id="simple-menu"
              anchorEl={anchorEl}
              // keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  transform: "translateX(-40px) translateY(40px)",
                },
              }}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
