import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user list từ backend API
    fetchModel("/user/list")
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography>Loading users...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading users: {error}
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText
                primary={`${item.first_name} ${item.last_name}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;