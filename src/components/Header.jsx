import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Header({account}) {
  return (
  <Container sx={{backgroundColor: "darkblue", color: "white", display: 'flex', justifyContent: 'space-between', padding: '15px'}}>
      <Typography variant="p">Azman NFT</Typography>
      <Typography variant="p">{account}</Typography>
  </Container> );
}
