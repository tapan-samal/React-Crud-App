import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Display = () => {
  const [data, setData] = useState([]);
  const [tableDark, setTableDark] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://6596cf026bb4ec36ca036150.mockapi.io/commerce-coder"
      );
      setHasError(false);
      setData(response.data);
    } catch (error) {
      console.error("Error: ", error.response.data);
      setHasError(true);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = async (id, name) => {
    const userConfirmed = window.confirm(`Are you sure to delete "${name}" ?`);
    if(userConfirmed){
      try {
        await axios.delete(
          `https://6596cf026bb4ec36ca036150.mockapi.io/commerce-coder/${id}`
          );
          getData();
        } catch (error) {
          console.error("Error: ", error);
        }
      }
  };

  const setToLocalStorage = (id, name, email, number) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("number", number);
  };

  const filteredData = data.filter((eachData) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      eachData.name.toLowerCase().includes(searchTerm) ||
      eachData.email.toLowerCase().includes(searchTerm) ||
      eachData.number.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      <div className="display-data">
        <h2>Displayed all Lists</h2>
        <div className="form-check form-switch">
          <input
            style={{width: "62px", height: "26px", border: "5px solid lightBlue",}}
            className="form-check-input mt-4 ms-4"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={() => {
              setTableDark((prevValue) =>
                prevValue === "table-dark" ? "" : "table-dark"
              );
            }}
          />
        </div>
        <div>
          <input
            className="search-button"
            type="text"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/create">
          <button className="btn btn-primary fs-6 p-2">New Create</button>
        </Link>
      </div>
      <table
        className={`table ${tableDark}`}
        style={{ width: "89%", textAlign: "center", margin: "20px 96px" }}
      >
        <thead>
          <tr>
            <th scope="col">Serial</th>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!hasError && filteredData?.map((eachData, index) => (
            <tr key={eachData.id}>
              <th scope="row">{index + 1}</th>
              <th scope="row">{100 + eachData.id}</th>
              <td>{eachData.name}</td>
              <td>{eachData.email}</td>
              <td>{eachData.number}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setToLocalStorage(eachData.id, eachData.name, eachData.email, eachData.number)
                    }
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(eachData.id, eachData.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasError && <div><h4 style={{color:'red'}}>Error: {error}</h4></div>}
    </div>
  );
};

export default Display;
