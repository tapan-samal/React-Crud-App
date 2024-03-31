import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//✏️ 🗑️

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
    if (userConfirmed) {
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
        <div
          className="form-check form-switch"
          style={{ display: "flex", gap: "22px" }}
        >
          <input
            className="form-check-input fs-3 px-4 py-2 ms-5" 
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={() => {
              setTableDark((prevValue) =>
                prevValue === "table-dark" ? "" : "table-dark"
              );
            }}
          />

          <input
            className="search-button"
            type="text"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link>
            <button className="btn btn-primary px-4 fs-6">Delete</button>
          </Link>
          <Link to="/create">
            <button className="btn btn-primary px-3 fs-6">New Create</button>
          </Link>
        </div>
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
          {!hasError &&
            filteredData?.map((eachData, index) => (
              <tr key={eachData.id}>
                <th scope="row">{index + 1}</th>
                <th scope="row">{100 + eachData.id}</th>
                <td>{eachData.name}</td>
                <td>{eachData.email}</td>
                <td>{eachData.number}</td>
                <td>
                  <Link to="/update">
                    <button
                      className="action-border"
                      onClick={() =>
                        setToLocalStorage(eachData.id, eachData.name, eachData.email, eachData.number)
                      }
                    >
                      ✏️
                    </button>
                  </Link>
                  <button
                    className="action-border"
                    onClick={() =>
                      handleDeleteClick(eachData.id, eachData.name)
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {hasError && (
        <div>
          <h4 style={{ color: "red" }}>Error: {error}</h4>
        </div>
      )}
      <div style={{ float: "right", marginRight: "20px" }}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Display;
