import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return <Container sx={{backgroundColor:"lightblue", padding: "10px", textAlign: 'center', marginTop: 4}}>
      <Typography variant="p">Copyright &#169; Khairul Azman</Typography>
  </Container>;
}
