import {HomeScreenHeader} from "./HomeScreenHeader";
import React, {useEffect} from "react";
import {BalanceView} from "./text/BalanceView";
import {WalletContext} from "../context/WalletContext";
import {InputKeyboard} from "./InputKeyboard";
import {SmartNotices} from "../tools/SmartNotices";
import {AppPages} from "../Router";
import {Button} from "react-bootstrap";
import {ChangePendingSignButton} from "./home_parts/ChangePendingSignButton";
import {UndoOperationButton} from "./home_parts/UndoOperationButton";
import {useRefresh} from "../tools/useRefresh";

export function HomeScreen() {
    const {wallet, setPage} = React.useContext(WalletContext);
    const [pendingSum, setPendingSum] = React.useState<string>("");
    const [pendingSign, setPendingSign] = React.useState<boolean>(false);
    const refresh = useRefresh();

    const pendingSumInt = pendingSum !== "" ? (pendingSign ? -1 : 1) * parseFloat(pendingSum) : 0;
    const todayBalance = Math.max(0, wallet.getTodayBalance() - pendingSumInt);
    const newTodayBalance = wallet.getNewTodayBalance(pendingSumInt);
    const notice = SmartNotices.getHomePageNotice(pendingSumInt, todayBalance);

    useEffect(() => {
        if(wallet.isDayFinished())
            setPage(AppPages.DAY_FINISHED_PAGE);
    });

    const onConfirm = async () => {
        if(pendingSumInt === 0) return;
        wallet.addSpendRecord(pendingSumInt);
        setPendingSum("");
    };

    console.log(wallet.getUndoAmount())

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            maxHeight: "100vh",
            overflow: "hidden",
        }}>
            <HomeScreenHeader pendingSpent={pendingSumInt} />
            <div style={{margin: 16, flex: 1, height: 0}}>
                <BalanceView danger={todayBalance === 0}>{todayBalance}</BalanceView>
                <p>{notice}</p>
                {todayBalance === 0 ? <>
                    <BalanceView>{newTodayBalance}</BalanceView>
                    <p>{newTodayBalance > 0 ? "New daily balance" : "This will be your last purchase"}</p>
                </> : null}
            </div>
            <div style={{display: "flex", alignItems: "center", height: 68}}>
                {(pendingSum.length === 0 && wallet.getUndoAmount() !== 0) && <>
                    <UndoOperationButton afterUndo={() => refresh()}/>
                </>}
                {pendingSum.length > 0 && <>
                    <ChangePendingSignButton pendingSign={pendingSign} setPendingSign={setPendingSign} />
                    <div style={{flex: 1}}>
                        <BalanceView align="right">{pendingSum}</BalanceView>
                    </div>
                </>}
            </div>
            <InputKeyboard value={pendingSum}
                           onEnterPress={onConfirm}
                           onValueChange={setPendingSum} />
        </div>
    )
}