import React, { useState, useEffect } from "react";
import { Typography, Button, Divider, CircularProgress } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user detail từ backend API
    setLoading(true);
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch khi userId thay đổi

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography>Loading user details...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading user: {error}
      </Typography>
    );
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>Location: {user.location}</Typography>
      <Typography>Occupation: {user.occupation}</Typography>
      <Typography>Description: {user.description}</Typography>

      <Divider sx={{ marginY: 2 }} />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${userId}`}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;