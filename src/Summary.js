import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Alert } from '@mui/material';

function Summary({ concallLink }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (concallLink) {
      setLoading(true);
      setError(null);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/summary`, { pdf_url: concallLink })
        .then((response) => {
          setSummary(response.data.summary);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching summary:', err);
          setError('Failed to fetch summary. Please try again.');
          setLoading(false);
        });
    } else {
      setSummary('');
      setLoading(false);
      setError(null);
    }
  }, [concallLink]);

  if (loading) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
        <Typography variant="h6">Loading summary...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  if (!summary) {
    return (
      <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
        <Typography variant="body1">No summary available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '20px' }}>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </Paper>
  );
}

export default Summary;