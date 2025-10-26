import React from "react";
import {Typography, Button, Divider} from "@mui/material";
import models from "../../modelData/models";
import "./styles.css";
import {useParams, Link} from "react-router-dom";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const {userId} = useParams();
    const user = models.userModel(userId);
    if(!user) return <Typography>User not found</Typography>
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
