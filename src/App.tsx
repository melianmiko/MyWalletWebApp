import React from 'react';
import './App.css';
import {WalletContext} from "./context/WalletContext";
import {Wallet} from "./data/Wallet";
import {WalletInitializer} from "./component/WalletInitializer";
import {Router} from "./Router";
import {MobileOnly} from "./component/MobileOnly";

function App() {
    const wallet = React.useState<Wallet>(new Wallet())[0];

    return (
        <WalletContext.Provider value={{wallet, setPage: ()=>{} }}>
            <MobileOnly>
                <WalletInitializer>
                    <Router />
                </WalletInitializer>
            </MobileOnly>
        </WalletContext.Provider>
    );
}

export default App;
