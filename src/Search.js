import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Paper } from '@mui/material';

function Search({ onCompanySelect }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/companies?query=${inputValue}`) // Using env var
        .then(response => {
          console.log('API response:', response.data);
          setOptions(response.data.map(company => ({
            value: company.ticker,
            label: company.name,
          })));
        })
        .catch(error => console.error('Error fetching companies:', error));
    } else {
      setOptions([]); // Clear options when input is empty
    }
  }, [inputValue]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      onCompanySelect(newValue.value);
    }
  };

  return (
    <Paper elevation={2} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newValue) => setInputValue(newValue)}
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label="Search for a company..." variant="outlined" />
        )}
      />
    </Paper>
  );
}

export default Search;