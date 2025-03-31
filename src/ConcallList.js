import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemButton, ListItemText, Typography, Button, Alert } from '@mui/material';

function ConcallList({ companyTicker, onConcallSelect }) {
  const [concalls, setConcalls] = useState([]);
  const [selectedConcall, setSelectedConcall] = useState(null);
  const [visibleQuarters, setVisibleQuarters] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (companyTicker) {
      setLoading(true);
      setError(null);
      axios.get(`${process.env.REACT_APP_API_URL}/api/concalls/${companyTicker}`)
        .then(response => {
          console.log('API response:', response.data);
          if (Array.isArray(response.data)) {
            setConcalls(response.data);
          } else if (response.data && response.data.message === "No transcripts found.") { // Check response.data.error
            setConcalls([]);
            setError("No transcripts found.");
          } else {
            setConcalls([]);
            setError('Invalid data format received from the server.');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching concalls:', error);
          setError('Failed to fetch concalls. Please try again.');
          setLoading(false);
        });
    } else {
      setConcalls([]);
      setLoading(false);
      setError(null);
    }
  }, [companyTicker]);

  const handleConcallClick = (link, quarter) => {
    onConcallSelect(link);
    setSelectedConcall(quarter);
  };

  const handleShowMore = () => {
    setVisibleQuarters(prevVisible => prevVisible + 4);
  };

  if (loading) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px', maxWidth: '300px', textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
          Loading...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px', maxWidth: '300px', textAlign: 'left' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (concalls.length === 0 && companyTicker) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px', maxWidth: '300px', textAlign: 'left' }}>
        <Typography variant="body1">
          No concalls found for {companyTicker}.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '20px', maxWidth: '300px', textAlign: 'left' }}>
      <Typography variant="h6" gutterBottom>
        Available Quarters
      </Typography>
      <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {Array.isArray(concalls) && concalls.slice(0, visibleQuarters).map(concall => (
          <ListItem disablePadding key={concall.link} style={{ borderBottom: '1px solid #eee' }}>
            <ListItemButton
              onClick={() => handleConcallClick(concall.link, concall.quarter)}
              style={{
                backgroundColor: selectedConcall === concall.quarter ? '#e0f2fe' : 'transparent',
                borderRadius: '8px',
              }}
            >
              <ListItemText primary={concall.quarter} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {Array.isArray(concalls) && concalls.length > visibleQuarters && (
        <Button onClick={handleShowMore} style={{ marginTop: '10px' }}>
          Show More
        </Button>
      )}
    </Paper>
  );
}

export default ConcallList;