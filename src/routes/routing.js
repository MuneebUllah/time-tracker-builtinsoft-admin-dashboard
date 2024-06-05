import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Employees from "../components/Employees/Employees";
import AddUserForm from "../components/useForm/AddUserForm";
import UserDetail from "../components/useDetail/UserDetail";
import Login from "../components/login/Login";
import { TokenCheck } from "./tokenCheck";
import UserScreenShots from "../components/userScreenShots/UserScreenShots";

export default function Routing() {
  const routes = [
    { path: "*", element: <Navigate to="/" /> },
    { path: "/login", element: <Login /> },
    {
      path: '/', element: (
        <TokenCheck>
          <Employees/>
        </TokenCheck>
      )
    },
    {
      path: '/user-form',
      element: (
        <TokenCheck>
          <AddUserForm />
        </TokenCheck>
      )
    },
    {
      path: `/user-detail/:id`,
      element: (
        <TokenCheck>
          <UserDetail />
        </TokenCheck>
      )
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/user-screenshots/:id',
      element: (
        <TokenCheck>
          <UserScreenShots  />
        </TokenCheck>
      )
    },

  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
