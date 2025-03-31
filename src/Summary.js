import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Summary({ concallLink }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (concallLink) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/summary`, { pdf_url: concallLink }) // Using env var
        .then(response => setSummary(response.data.summary))
        .catch(error => console.error('Error fetching summary:', error));
    }
  }, [concallLink]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );
}

export default Summary;