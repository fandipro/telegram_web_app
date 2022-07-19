import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/home";
import RequireAuth from "../../components/base/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
