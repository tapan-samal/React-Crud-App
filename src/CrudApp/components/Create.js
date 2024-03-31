import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultImg from "../../assets/images/profile.jpeg";
import loader from "../../assets/images/loader.gif";

const Create = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultImg);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleUploadFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for empty field
    if (!name || !email || !number) {
      alert("Please fill all the input fields !!");
      return;
    }
    setIsLoading(true);

    axios
      .post("https://6596cf026bb4ec36ca036150.mockapi.io/commerce-coder", {
        name: name,
        email: email,
        number: number,
        file: selectedFile,
      })
      .then(() => {
        history("/");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Add User</h2>
      {isLoading && <img src={loader} alt="profile" className="loader-gif" />}
      {!isLoading && (
        <form className="create-form">
          <div>
            <label>User Name:</label> <br />
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label> Email address: </label>
            <br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label> Mobile Number: </label> <br />
            <input type="text" onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="img-file">
            <label> Upload File: </label> <br />
            <input type="file" onChange={(e) => handleUploadFile(e)} />
            <img src={imageUrl} alt="image" />
          </div>
          <div className="button">
            <Link to="/">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary fs-6">
                Submit
              </button>
            </Link>
            <Link to="/">
              <button type="submit" className="btn btn-dark fs-6">
                Back
              </button>
            </Link>
          </div>
        </form>
      )}
      ;
    </>
  );
};

export default Create;
