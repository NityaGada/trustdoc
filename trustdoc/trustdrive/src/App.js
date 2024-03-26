import './styles/App.scss';

import abi from './contracts/DocumentDetails.json';

import { useState, useEffect } from 'react';

import { ethers } from "ethers";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as Pages from "./pages/index.js";

function App() {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract: null
  });

  useEffect(() => {
    const connect_wallet=async()=>{
      const contract_address = "0xe3bC518761F7c8be3Ae97419a85b61E8ccf77DA1";
      const contract_abi = abi.abi;
      
      try {
        const { ethereum } = window;
        
        if(ethereum) {
          const account = await ethereum.request({method: "eth_requestAccounts",})
        }
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contract_address, contract_abi, signer);
        
        setState({provider, signer, contract});
      }
      catch(error) {
        console.log(error);
      }
    };
    connect_wallet();
  }, []);

  return (
    <div id="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pages.Home />}></Route>
            <Route path="/view" element={<Pages.User info_state ={state}/>}></Route>
            <Route path="/add" element={<Pages.Manufacturer_Add_Product_Form info_state ={state}/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
