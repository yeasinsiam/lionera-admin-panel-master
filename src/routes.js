import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import OcassionsPage from "./pages/occasionsPage/ocassions.page";
import PackagesPage from "./pages/packages/packages.page";
import OrderManager from "./pages/orderManager/orderManager.page";
import AddonsPage from "./pages/addonsPage/addonsPage";
import EditPage from "./pages/occasionsPage/editPage";
import CustomizingPackage from "./pages/customizingPackagePage/cutomizingPackage.page";
import NewAddOnsPage from "./pages/newAddOn/newAddOnsPage";
import OrderDetailsPage from "./pages/orderDetailsPage/orderDetails.page";
import DesignPage from "./pages/design/design.page";
import SlideShow from "./pages/slideshow/slideshow.page";
import Form from "./pages/form/form.page";
import Login from "./pages/login.page";
import { useAuth } from "./hooks/useAuth";
import { Spin } from "antd";
import ShippingAreasPage from "./pages/shippingAreas/shippingAreas.page";

const Routes = () => {
  const { authed, authenticating } = useAuth();

  return authenticating ? (
    <Spin />
  ) : (
    <Switch>
      {!authenticating && authed && (
        <>
          <Route exact path="/">
            <OcassionsPage />
          </Route>
          <Route path="/design">
            <DesignPage />
          </Route>
          <Route path="/slideshow">
            <SlideShow />
          </Route>
          <Route path="/forms">
            <Form />
          </Route>
          <Route path="/packages">
            {" "}
            <PackagesPage />{" "}
          </Route>
          <Route path="/ordermanager">
            {" "}
            <OrderManager />{" "}
          </Route>
          <Route path="/addons">
            <AddonsPage />
          </Route>
          <Route
            exact
            path="/edit/:ocassionId"
            render={(props) => <EditPage {...props} />}
          />
          <Route
            exact
            path="/package/:packageId"
            render={(props) => <CustomizingPackage {...props} />}
          />
          <Route path="/new-addon">
            <NewAddOnsPage />
          </Route>
          <Route
            path="/order-details/:orderId"
            render={(props) => <OrderDetailsPage {...props} />}
          />
          <Route path="/ocassions/edit/:id" component={EditPage} />

          {/* Shipping Areas */}
          <Route path="/shipping-areas" component={ShippingAreasPage} />
        </>
      )}

      {/* When the user is authenticated there is no need of login route */}
      {!authenticating && !authed && (
        <Route to="/login">
          <Login />
        </Route>
      )}

      <Route to="/*">
        {authed ? <Redirect to="/" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};

export default Routes;
