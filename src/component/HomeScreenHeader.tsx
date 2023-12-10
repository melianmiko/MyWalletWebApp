import React from "react";
import {WalletContext} from "../context/WalletContext";
import {Button, Offcanvas} from "react-bootstrap";
import {DrawerItems} from "./DrawerItems";

export type HomeScreenHeaderProps = {
    pendingSpent: number,
}

export function HomeScreenHeader(props: HomeScreenHeaderProps) {
    const {wallet} = React.useContext(WalletContext);
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    const balance = Math.max(0, wallet.getBalance() - props.pendingSpent);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 16px",
            height: 56,
            borderBottom: "thin rgba(255,255,255,0.1) solid"
        }}>
            <div style={{flex: 1}}>
                Left days: {wallet.getDaysCount()}, money: {balance}
            </div>
            <Button size="sm" variant="secondary" onClick={() => setMenuOpen(true)}>
                Menu
            </Button>
            <Offcanvas placement="end" show={menuOpen} onHide={() => setMenuOpen(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>I want...</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DrawerItems />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}