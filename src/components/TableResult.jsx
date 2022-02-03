import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const TableHeadStyled = styled(TableCell)(() => ({
    fontWeight: 'bold',    
  }));

export default function TableResult({tokensProp, handleDelete}) {
  return  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableHeadStyled>Token ID</TableHeadStyled>
        <TableHeadStyled>Owner's Address</TableHeadStyled>
        <TableHeadStyled>Action</TableHeadStyled>        
      </TableRow>
    </TableHead>
    <TableBody>
      {tokensProp.map((token, index) => (
        <TableRow
          key={token.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>{token.id}</TableCell>
          <TableCell>{token.owner}</TableCell>
          <TableCell><Button variant="contained" color="error" onClick={() => handleDelete(token.id)}>Burn</Button></TableCell>          
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
}
