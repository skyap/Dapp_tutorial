import React, {useState,useEffect} from 'react';
import {ethers} from 'ethers';
const Wallet = () =>{
    const [errorMessage,setErrorMessage] = useState(null);
    const [defaultAccount,setDefaultAccount] = useState(null);
    const [userBalance,setUserBalance] = useState(null);
    const [connButtonText,setConnButtonText] = useState('Connect Wallet');

    const connectWalletHandler = () =>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result=>{
                accountChangedHandler(result);

            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangedHandler = (newAccount) =>{
        setDefaultAccount(newAccount[0]);
        getUserBalance(newAccount[0].toString());
    }

    const getUserBalance = (address)=>{
        window.ethereum.request({method: 'eth_getBalance',params:[address,'latest']})
        .then(balance=>{
            setUserBalance(ethers.formatEther(balance));
        })
    }

    const chainChangedHandler = ()=>{
        window.location.reload();
    }
    window.ethereum.on("accountsChanged",accountChangedHandler);

    window.ethereum.on("chainChanged",chainChangedHandler);

    // useEffect(()=>{
    //     window.ethereum.on("accountsChanged",accountChangedHandler);
    //     return ()=>{
    //         window.ethereum.removeListener('accountsChanged', accountChangedHandler)
    //     }
    // },[])

    

    return(
        <div className="wallet">
            <h4>{"Connection to MetaMask using window.ethereum methods"}</h4>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
        </div>
    )
}

export default Wallet;