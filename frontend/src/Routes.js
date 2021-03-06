import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import SignIn from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={SignIn}></Route>
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/create/category" exact component={AddCategory} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/manage/categories" exact component={ManageCategories} />
      </Switch>
    </BrowserRouter>
  );
}
