import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=1&seed=abc")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>USER ID CARD</h1>
      <div className="card-container">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <div className="square">.</div>
            <div className="ring-one">.</div>
            <div className="ring-two">.</div>

            <div className="user-img">
              <img
                src={user.picture.large}
                alt={`${user.name.first}'s profile`}
                className="profile-picture"
              />
            </div>
            <div className="user-details">
              <div className="username"><h1>{`${user.name.first} ${user.name.last}`}</h1></div>
              <div className="gender">Gender: {user.gender}</div>
              <div className="phone">Phone Number: {user.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
