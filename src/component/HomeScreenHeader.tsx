import React from "react";
import {WalletContext} from "../context/WalletContext";
import {Button, CloseButton, Offcanvas} from "react-bootstrap";
import {DrawerItems} from "./DrawerItems";
import {Header} from "./Header";

export type HomeScreenHeaderProps = {
    pendingSpent: number,
}

export function HomeScreenHeader(props: HomeScreenHeaderProps) {
    const {wallet} = React.useContext(WalletContext);
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    const balance = Math.max(0, wallet.getBalance() - props.pendingSpent);

    return (
        <Header>
            <div style={{flex: 1}}>
                Left days: {wallet.getDaysCount()}, money: {balance}
            </div>
            <Button size="sm" variant="secondary" onClick={() => setMenuOpen(true)}>
                Menu
            </Button>
            <Offcanvas placement="end"
                       show={menuOpen}
                       onHide={() => setMenuOpen(false)}>
                <Header>
                    <div style={{flex: 1}}>
                        MyWallet
                    </div>
                    <CloseButton onClick={() => setMenuOpen(false)} />
                </Header>
                <Offcanvas.Body>
                    <DrawerItems />
                </Offcanvas.Body>
            </Offcanvas>
        </Header>
    )
}