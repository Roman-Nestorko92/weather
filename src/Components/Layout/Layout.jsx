import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="headerBox">
        <ul className="head">
          <li>
            <h2 className="Title">Weather</h2>
          </li>
          <li></li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
