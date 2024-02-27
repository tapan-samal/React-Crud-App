import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CrudApp from "./CrudAppOne";
import Logo from "./Assets/CommCoder.png";

const App = () => {
  return (
    <>
      <div className="header">
        <img src={Logo} alt="Logo" />
        <span>Crud Application</span>
      </div>
      <BrowserRouter>
        <CrudApp />
      </BrowserRouter>
    </>
  );
};

export default App;
