import React from "react";
import {WalletContext} from "../context/WalletContext";
import {CloseButton} from "react-bootstrap";
import {AppPages} from "../Router";
import {SectionTitle} from "./text/SectionTitle";
import {Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Header} from "./Header";

export function StatisticsPage() {
    const {wallet, setPage} = React.useContext(WalletContext);

    return (
        <>
            <Header>
                <CloseButton onClick={() => setPage(AppPages.HOME_PAGE)} />
            </Header>

            <div style={{margin: 16}}>
                <SectionTitle>
                    Daily spent.
                </SectionTitle>
                <br/>
                <LineChart width={window.innerWidth - 32} height={250} data={wallet.getDailySpentData()}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line dataKey="sum" stroke="#8884d8" />
                </LineChart>
                <br/>
                <br/>

                <SectionTitle>
                    Monthly spent.
                </SectionTitle>
                <br/>
                <LineChart width={window.innerWidth - 32} height={250} data={wallet.getMonthlySpentHistory()}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line dataKey="sum" stroke="#8884d8" />
                </LineChart>
            </div>
        </>
    )
}