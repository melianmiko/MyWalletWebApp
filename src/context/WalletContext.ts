import {Wallet} from "../data/Wallet";
import React from "react";
import {AppPages} from "../Router";

export type WalletContextType = {
    wallet: Wallet,
    setPage: (page: AppPages) => any,
};

export const WalletContext = React.createContext<WalletContextType>({
    wallet: new Wallet(),
    setPage: () => {},
});
