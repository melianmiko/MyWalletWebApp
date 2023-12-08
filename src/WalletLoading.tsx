import {Spinner} from "react-bootstrap";

export function WalletLoading() {
    return (
        <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Spinner animation="border" role="status" />
        </div>
    )
}