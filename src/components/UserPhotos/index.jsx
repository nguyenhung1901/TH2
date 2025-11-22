import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cả user info và photos
    setLoading(true);
    
    Promise.all([
      fetchModel(`/user/${userId}`),
      fetchModel(`/photosOfUser/${userId}`)
    ])
      .then(([userData, photosData]) => {
        setUser(userData);
        setPhotos(photosData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading photos:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch khi userId thay đổi

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography>Loading photos...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading photos: {error}
      </Typography>
    );
  }

  if (!user || !photos) {
    return <Typography>No photos found</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      
      {photos.length === 0 ? (
        <Typography>No photos available</Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} sx={{ marginBottom: 2, padding: 2 }}>
            <img
              src={`/images/${photo.file_name}`}
              alt={photo.file_name}
              style={{ width: "100%", maxWidth: "600px" }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {new Date(photo.date_time).toLocaleString()}
              </Typography>
              
              {photo.comments && photo.comments.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Comments:
                  </Typography>
                  {photo.comments.map((c) => (
                    <div key={c._id} style={{ marginBottom: "8px" }}>
                      <Typography variant="body2">
                        <strong>
                          <Link 
                            to={`/users/${c.user._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {c.user.first_name} {c.user.last_name}
                          </Link>
                        </strong>
                        {" "}({new Date(c.date_time).toLocaleString()}):
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {c.comment}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default UserPhotos;