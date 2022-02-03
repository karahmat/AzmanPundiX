import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AzmanNFT from './contracts/abi/AzmanNFT.json';
import Header from './components/Header';
import Footer from './components/Footer';
import LinearProgress from '@mui/material/LinearProgress';
import TableResult from './components/TableResult';


function App() {
  const [account, setAccount] = useState();
  const [contractInstance, setContractInstance] = useState();
  const [totalNFT, setTotalNFT] = useState();
  const [pauseState, setPauseState] = useState();
  const [tokens, setTokens] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadWeb3() {

    // check if metamask is installed
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // Smart Contract Address: 0xcB20DF505f3f15C6570A9001d5b693eF50480174
  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    
    if(AzmanNFT) {
      const abi = AzmanNFT.abi;
      const address = AzmanNFT.contractAddress;
      const contract = new web3.eth.Contract(abi, address);  
      setContractInstance(contract);    
      const totalSupply = await contract.methods.totalSupply().call();
      const isPaused = await contract.methods.paused.call();
      setTotalNFT(totalSupply);    
      setPauseState(isPaused);
      
      setLoading(true);
      let newArray = [];
      for (let i=0; i<totalSupply; i++) {
        const ownerToken = await contract.methods.ownerOf(i).call();
        const tokenObject = { id: i, owner: ownerToken };        
        newArray.push(tokenObject);
      }
      setTokens(newArray);
      setLoading(false);
      
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [toggle]);
  
  const handleMint = async() => {
    try {            
      setLoading(true);
      contractInstance.methods.safeMint(account).send({ from: account })
      .then(() => {
        setToggle(!toggle);
        setLoading(false);
      });      
      // const totalSupply = await contractInstance.methods.totalSupply().call();
      // setTotalNFT(totalSupply);   
      // console.log(totalSupply);
      // const ownerToken = await contractInstance.methods.ownerOf(totalSupply-1).call();
      // const tokenObject = { id: totalSupply-1, owner: ownerToken };
      // setTokens([...tokens, tokenObject]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async(tokenId) => {
    setLoading(true);
    contractInstance.methods.burn(tokenId).send({ from: account })
    .then(() => {
      setToggle(!toggle);
      setLoading(false);
    });        
  }

  console.log(tokens);

  return (
    <div className="App">
      <Header account={account} />
      <Container maxWidth='lg' sx={{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h1' align="center">Dashboard</Typography>
        <Typography variant='h4' sx={{margin: '15px 0 15px 0'}}>Azman ERC721 NFT</Typography>
        { pauseState === true ? 
         <Typography variant="p" align="center" sx={{marginTop: '10px', color: "red"}}>Smart contract is paused</Typography> :
         <Typography variant="p" align="center" sx={{marginTop: '10px', color: "green"}}>Smart contract is active</Typography> 
        }
        <Box component="div" sx={{display: 'flex', width: '100%', justifyContent: 'center', margin: '10px 0 10px 0'}}>
          <Button variant="contained" onClick={handleMint}>Mint</Button>
        </Box>
        { loading && <LinearProgress /> }
        { tokens.length > 0 && <TableResult tokensProp={tokens} handleDelete={handleDelete} /> }
        { totalNFT && <Typography sx={{marginTop: '10px', fontSize: '1.5rem'}}>My total NFT is: {totalNFT} </Typography>}
      </Container>      
      
      <Footer />
    </div>
  );
}

export default App;
