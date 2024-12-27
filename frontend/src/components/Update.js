import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Update = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [error, seterror] = useState("");
  const {id} = useParams();
  const navigate=useNavigate();
  // get single user data by using this method
  const getSingleUser= async () => {
    
    const response=await fetch(`http://localhost:5000/${id}`)
    const result=await response.json();
   if(!response.ok){
    console.log(result.error);
    seterror(result.error);
   }
   if(response.ok){
    seterror("");
    console.log("updated user",result);
    setname(result.name);
    setemail(result.email);
    setage(result.age);
   }

  }
  // send updated data in the backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateduser = { name, email, age };
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateduser),
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
      seterror("")
      navigate("/all");
    }
  }
  useEffect(() => {
    getSingleUser();
  }, [])
  
  
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the Data</h2>
      <form onSubmit={handleUpdate}>
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
  )
}

export default Update