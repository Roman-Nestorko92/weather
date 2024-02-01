import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="head">
        <h2 className="Title">Your Weather</h2>
      </div>
      <Outlet />
    </>
  );
}
