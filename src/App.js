import React, { useState } from 'react';
import Search from './Search';
import ConcallList from './ConcallList';
import Summary from './Summary';
import { Container, Typography, Grid } from '@mui/material';

function App() {
  const [companyTicker, setCompanyTicker] = useState(null);
  const [concallLink, setConcallLink] = useState(null);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Concall Summary App
      </Typography>
      <Search onCompanySelect={setCompanyTicker} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {companyTicker && <ConcallList companyTicker={companyTicker} onConcallSelect={setConcallLink} />}
        </Grid>
        <Grid item xs={12} md={8}>
          {concallLink && <Summary concallLink={concallLink} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;