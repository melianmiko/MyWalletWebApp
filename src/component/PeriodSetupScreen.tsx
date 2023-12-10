import {SectionTitle} from "./text/SectionTitle";
import {Button, CloseButton, Form} from "react-bootstrap";
import React from "react";
import {WalletContext} from "../context/WalletContext";
import {DateString} from "../tools/DateString";
import {AppPages} from "../Router";
import {Header} from "./Header";

export function PeriodSetupScreen() {
    const {wallet, setPage} = React.useContext(WalletContext);

    const [balance, setBalance] = React.useState<number>(wallet.getBalance());
    const [date, setDate] = React.useState<Date>(wallet.getFinishDate());

    const setPeriod = () => {
        wallet.setupPeriod(date, balance);
        setPage(AppPages.HOME_PAGE);
    }

    return (
        <>
            {!wallet.isPeriodFinished() && <Header>
                <CloseButton onClick={() => setPage(AppPages.HOME_PAGE)} />
            </Header>}

            <div style={{margin: 16}}>
                <SectionTitle>Set up period</SectionTitle>
                <br />
                <Form.Label htmlFor="inputBalance">Balance:</Form.Label>
                <Form.Control id="inputBalance"
                              type="number"
                              value={balance}
                              onChange={(e) => setBalance(parseFloat(e.target.value))} />
                <br />
                <Form.Label htmlFor="inputDate">Finish date:</Form.Label>
                <Form.Control id="inputDate"
                              type="date"
                              value={DateString.toDayString(date)}
                              onChange={(e) => setDate(DateString.fromDayString(e.target.value))} />
                <br />
                <Button variant="primary" onClick={setPeriod}>Set period</Button>
            </div>
        </>
    )
}
