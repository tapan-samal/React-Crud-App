import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loader from "../../Assets/loader.gif";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setNumber(localStorage.getItem("number"));
  }, []);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    //Validation check for empty input field
    if (!name || !email || !number) {
      alert("Please fill all the input field !!");
      return;
    }
    setIsLoading(true);

    axios
      .put(`https://6596cf026bb4ec36ca036150.mockapi.io/commerce-coder/${id}`, {
        name: name,
        email: email,
        number: number,
      })
      .then(() => {
        navigate("/");
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setIsLoading(true);
      });
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Update User</h2>
      {isLoading && <img src={loader} alt="loader" className="loader-gif" />}
      {!isLoading && (
        <form className="create-form">
          <div>
            <label>User Name</label> <br />
            <input
              className=""
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label> Email address </label>
            <br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label> Mobile Number </label> <br />
            <input
              type="text"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>
          <div className="button">
            <Link to="/">
              <button
                onClick={handleUpdateClick}
                type="submit"
                className="btn btn-primary fs-4"
              >
                Submit
              </button>
            </Link>
            <Link to="/">
              <button type="submit" className="btn btn-dark fs-4">
                Back
              </button>
            </Link>
          </div>
        </form>
      )}
      ;
    </div>
  );
};

export default Update;
