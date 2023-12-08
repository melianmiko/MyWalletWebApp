import {WalletContext} from "./context/WalletContext";
import React from "react";
import {HomeScreen} from "./component/HomeScreen";
import {PeriodSetupScreen} from "./component/PeriodSetupScreen";
import {DayFinishedPage} from "./component/DayFinishedPage";
import {StatisticsPage} from "./component/StatisticsPage";

export enum AppPages {
    HOME_PAGE,
    PERIOD_SETUP_PAGE,
    DAY_FINISHED_PAGE,
    STATISTICS_PAGE,
}

export function Router() {
    const ctx = React.useContext(WalletContext);
    const [page, setPage] = React.useState<AppPages>(AppPages.HOME_PAGE);

    ctx.setPage = setPage;

    switch(page) {
        case AppPages.HOME_PAGE:
            return <HomeScreen />;
        case AppPages.PERIOD_SETUP_PAGE:
            return <PeriodSetupScreen />;
        case AppPages.DAY_FINISHED_PAGE:
            return <DayFinishedPage />;
        case AppPages.STATISTICS_PAGE:
            return <StatisticsPage />;
    }
}