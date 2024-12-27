import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState(null); // Initialize with null
  const [error, setError] = useState("");

  async function getdata() {
    try {
      const response = await fetch("http://localhost:5000");

      // Handle non-2xx HTTP responses (e.g., 404, 500)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const result = await response.json();
      setData(result); // Set the fetched data to state
    } catch (error) {
      setError(error.message); // Capture and display the error
      console.error("Fetch error:", error.message);
    }
  }

  const handledelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    const result = await response.json();
    if (!response.ok) {
  
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("Deleted Successfully");
      
      setTimeout(() => {
        setError("")
        getdata();
      }, 1000);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  console.log(data);
  

  return (
    <div className="container my-2">
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data ? (
          data.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{ele.name}</h4>
                  
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    {ele.email}
                  </h6>
                  <h5 className="card-text">{ele.age}</h5>
                  <a
                    href="#"
                    className="card-link"
                    onClick={ ()=>handledelete(ele._id)}
                  >
                    Delete
                  </a>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>{error || "Loading data..."}</p>
        )}
      </div>
    </div>
  );
};

export default Read;

