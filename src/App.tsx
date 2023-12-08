import React, {useEffect} from 'react';
import './App.css';
import {WalletContext} from "./context/WalletContext";
import {Wallet} from "./data/Wallet";
import {WalletInitializer} from "./component/WalletInitializer";
import {Router} from "./Router";

function App() {
    const wallet = React.useState<Wallet>(new Wallet())[0];

    return (
        <WalletContext.Provider value={{wallet, setPage: ()=>{} }}>
            <WalletInitializer>
                <Router />
            </WalletInitializer>
        </WalletContext.Provider>
    );
}

export default App;
