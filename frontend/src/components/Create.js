import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  
  const [error, seterror] = useState("");
  // console.log(name, email, age);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const adduser = { name, email, age };
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(adduser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      seterror(result.error);
    }
    if (response.ok) {
      console.log(result);
      seterror("");
      setname("");
      setemail("");
      setage("");
      navigate("/all");
    }
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter The Data </h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
