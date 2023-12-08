import React, {useEffect} from "react";
import {WalletContext} from "../context/WalletContext";
import {SectionTitle} from "./text/SectionTitle";
import {AppPages} from "../Router";

export function DayFinishedPage() {
    const {wallet, setPage} = React.useContext(WalletContext);
    const ref = React.createRef<HTMLDivElement>();

    const todayBalance = wallet.getTodayBalance();

    useEffect(() => {
        setTimeout(() => {
            if(!ref.current) return;
            ref.current.style.opacity = "0"
        }, 500);
        setTimeout(() => {
            wallet.startNewDay();
            setPage(AppPages.HOME_PAGE);
        }, 2500);
    });

    return (
        <div ref={ref} style={{
            margin: 16,
            textAlign: "center",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            opacity: "1",
            transition: "opacity 2s",
        }}>
            <SectionTitle>
                Day finished
            </SectionTitle>
            <br/>
            <p style={{fontSize: "1.3em"}}>
                You saved <strong>{todayBalance}</strong>.
            </p>
        </div>
    )
}