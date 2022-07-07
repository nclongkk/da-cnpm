import { Box, Container } from "@material-ui/core";
import Sidebar from "components/sidebar/Sidebar";
import Topbar from "components/topbar/Topbar";
import Home from "pages/home/Home";
import NewProduct from "pages/newShop/NewShop";
import NewUser from "pages/newUser/NewUser";
import Shop from "pages/shop/Shop";
import ShipmentList from "pages/shipmentList/shipmentList";
import TransactionList from "pages/transactionList/transactionList";
import User from "pages/user/User";
import UserList from "pages/userList/userList";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ShopList from "pages/shopList/shopList";

const Main = () => {
  return (
    <Container style={{ width: "100%", padding: 0, maxWidth: "100%" }}>
      <Topbar />
      <Box display="flex">
        <Sidebar />

        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/users" exact>
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/shops" exact>
            <ShopList />
          </Route>
          <Route path="/shop/:shopId">
            <Shop />
          </Route>
          <Route path="/new-shop">
            <NewProduct />
          </Route>
          <Route path="/shipments" exact>
            <ShipmentList />
          </Route>

          <Route path={`/shipments/:id`} exact>
            <ShipmentList />
          </Route>

          <Route path="/transactions" exact>
            <TransactionList />
          </Route>
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    </Container>
  );
};

export default Main;
