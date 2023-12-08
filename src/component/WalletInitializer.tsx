import React, {useEffect} from "react";
import {WalletContext} from "../context/WalletContext";
import {WalletSetupScreen} from "./WalletSetupScreen";
import {WalletLoading} from "../WalletLoading";

enum WalletInitStatus {
    LOADING,
    READY,
    FAILED,
}

export function WalletInitializer(props: React.PropsWithChildren) {
    const {wallet} = React.useContext(WalletContext);

    const [loaded, setLoaded] =
        React.useState<WalletInitStatus>(WalletInitStatus.LOADING);

    useEffect(() => {
        if(loaded !== WalletInitStatus.LOADING) return;
        wallet.load().then(() => {
            setLoaded(WalletInitStatus.READY);
        }).catch((e) => {
            console.error(e);
            setLoaded(WalletInitStatus.FAILED);
            if(e.message !== "no_config")
                alert(e);
        })
    }, [wallet, loaded]);

    const recheck = () => {
        setLoaded(WalletInitStatus.LOADING);
    }

    if(loaded === WalletInitStatus.FAILED)
        return <WalletSetupScreen onConfirm={recheck} />

    if(loaded === WalletInitStatus.LOADING)
        return <WalletLoading />;

    return (
        <div>
            {props.children}
        </div>
    );
}
