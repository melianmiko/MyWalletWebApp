import React from "react";
import {Button, ButtonProps} from "react-bootstrap";
import {WalletContext} from "../context/WalletContext";
import {AppPages} from "../Router";

export function DrawerItems() {
    const {setPage} = React.useContext(WalletContext);

    return (
        <>
            <DrawerItem onClick={() => setPage(AppPages.STATISTICS_PAGE)}>
                Statistics
            </DrawerItem>
            <DrawerItem onClick={() => setPage(AppPages.PERIOD_SETUP_PAGE)}>
                Change period or budget.
            </DrawerItem>
        </>
    )
}

export function DrawerItem(props: ButtonProps) {
    return (
        <Button {...props} variant="link" style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            marginBottom: 8,
        }}>
            {props.children}
        </Button>
    )
}