import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, List, ListItem, ListItemButton, ListItemText, Typography, Button } from '@mui/material';

function ConcallList({ companyTicker, onConcallSelect }) {
  const [concalls, setConcalls] = useState([]);
  const [selectedConcall, setSelectedConcall] = useState(null);
  const [visibleQuarters, setVisibleQuarters] = useState(4); // Show 4 by default

  useEffect(() => {
    if (companyTicker) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/concalls/${companyTicker}`)
        .then(response => setConcalls(response.data))
        .catch(error => console.error('Error fetching concalls:', error));
    }
  }, [companyTicker]);

  const handleConcallClick = (link, quarter) => {
    onConcallSelect(link);
    setSelectedConcall(quarter);
  };

  const handleShowMore = () => {
    setVisibleQuarters(prevVisible => prevVisible + 4); // Show 4 more
  };

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '20px', maxWidth: '300px', textAlign: 'left' }}>
      <Typography variant="h6" gutterBottom>
        Available Quarters
      </Typography>
      <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {concalls.slice(0, visibleQuarters).map(concall => (
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
      {concalls.length > visibleQuarters && (
        <Button onClick={handleShowMore} style={{ marginTop: '10px' }}>
          Show More
        </Button>
      )}
    </Paper>
  );
}

export default ConcallList;