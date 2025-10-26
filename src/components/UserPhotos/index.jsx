import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, ImageList, ImageListItem, Card, CardContent, Divider } from "@mui/material";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const {userId} = useParams();
    const photos=models.photoOfUserModel(userId);
    const user = models.userModel(userId);
    return (
      <div>
        <Typography variant="body1" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>
        <Divider sx={{marginBottom:2}} />
        {photos.map((photo)=>(
          <Card key={photo._id} sx={{marginBottom:2, padding:2}}>
            <img
            src={`src/images/${photo._id}`}
            alt={photo.file_name}
            width="100%"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {photo.date_time}
              </Typography>
              {photo.comments && photo.comments.map((c)=>(
                <div key={c._id}>
                  <Typography variant="body1">
                    <strong>
                      <Link to={`/users/${c.user._id}`}>
                      {c.user.first_name} {c.user.last_name}
                      </Link>
                    </strong>
                    :{c.comment}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
}

export default UserPhotos;
