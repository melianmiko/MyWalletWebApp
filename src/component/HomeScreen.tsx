import {HomeScreenHeader} from "./HomeScreenHeader";
import React, {useEffect} from "react";
import {BalanceView} from "./text/BalanceView";
import {WalletContext} from "../context/WalletContext";
import {InputKeyboard} from "./InputKeyboard";
import {SmartNotices} from "../tools/SmartNotices";
import {AppPages} from "../Router";

export function HomeScreen() {
    const {wallet, setPage} = React.useContext(WalletContext);
    const [pendingSpent, setPendingSpent] = React.useState<string>("");

    const pendingSpentInt = pendingSpent !== "" ? parseFloat(pendingSpent) : 0;
    const todayBalance = Math.max(0, wallet.getTodayBalance() - pendingSpentInt);
    const newTodayBalance = wallet.getNewTodayBalance(pendingSpentInt);
    const notice = SmartNotices.getHomePageNotice(pendingSpentInt, todayBalance);

    useEffect(() => {
        if(wallet.isDayFinished())
            setPage(AppPages.DAY_FINISHED_PAGE);
    });

    const onConfirm = async () => {
        if(pendingSpentInt === 0) return;
        wallet.addSpendRecord(pendingSpentInt);
        setPendingSpent("");
    };

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <HomeScreenHeader pendingSpent={pendingSpentInt} />
            <div style={{margin: 16, flex: 1}}>
                <BalanceView danger={todayBalance === 0}>{todayBalance}</BalanceView>
                <p>{notice}</p>
                {todayBalance === 0 ? <>
                    <BalanceView>{newTodayBalance}</BalanceView>
                    <p>{newTodayBalance > 0 ? "New daily balance" : "This will be your last purchase"}</p>
                </> : null}
            </div>
            <div>
                <BalanceView align="right">{pendingSpent.length > 0 ? pendingSpent : ""}</BalanceView>
            </div>
            <InputKeyboard value={pendingSpent}
                           onEnterPress={onConfirm}
                           onValueChange={setPendingSpent} />
        </div>
    )
}