import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const rows = [];

  profileData.forEach((profile, idx) => {
    const { first, last } = profile.name;
    if (!(first + " " + last).toLowerCase().includes(search.toLowerCase())) {
      return;
    }
    rows.push(
      <Profile
        picture={profile.picture}
        location={profile.location}
        name={profile.name}
        key={idx}
      />
    );
  });

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <h4 className="title">Live User Filter</h4>
        <small className="subtitle">Search by name and/or location</small>
        <input
          value={search}
          onChange={searchHandler}
          type="text"
          placeholder="Search..."
        />
      </div>
      <ul className="users-list">
        {loading === true ? (
          <li>
            <h3>Loading...</h3>
          </li>
        ) : (
          rows
        )}
      </ul>
    </div>
  );
}

const Profile = (props) => {
  const { picture, location, name } = props;

  return (
    <li>
      <img src={picture.large} alt={name.first} />
      <div className="user-info">
        <h4>
          {name.first} {name.last}
        </h4>
        <p>
          {location.city} {location.country}
        </p>
      </div>
    </li>
  );
};
