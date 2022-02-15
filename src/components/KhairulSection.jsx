import React, {useState} from 'react';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

export default function KhairulSection({account, contractInstance2, totalKHA, setLoading2, loading2, loadKhairulFT, cappedAmtState}) {
  
  const [amount, setAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState();

  const handleMint = async () => {
    try {                        
      setLoading2(true);            
      if ((parseInt(totalKHA) + parseInt(amount) ) > parseInt(cappedAmtState)) {
        setErrorMsg(`Cap of ${cappedAmtState} would be exceeded`);
        
      } else {
        await contractInstance2.methods.mint(account, amount).send({ from: account })
        loadKhairulFT();        
      }
      setLoading2(false);
      
      
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleInput = (event) => {
    setAmount(event.target.value);
  }

  return <Box sx={{marginTop: 3}}>
      <Typography variant='h4' sx={{margin: '15px 0 15px 0'}}>Khairul ERC20 KHA</Typography>
      <Box component="div" sx={{display: 'flex', width: '100%', justifyContent: 'center', margin: '10px 0 10px 0'}}>
          <TextField label="Amount (KHA)" size="small" type="number" variant="outlined" value={amount} onChange={handleInput} />
          <Button variant="contained" onClick={handleMint} sx={{marginLeft: 2}}>Mint KHA</Button>
      </Box>      
      { errorMsg && <Typography color="error">{errorMsg}</Typography>}
      { loading2 && <LinearProgress /> }
      <Typography sx={{fontSize: '1.5rem'}}>Supply of KHA: {totalKHA}</Typography>
  </Box>;
}
