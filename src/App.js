import React from "react";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import CrudApp from "./CrudApp";
import Logo from "./assets/images/CommCoder.png";

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
