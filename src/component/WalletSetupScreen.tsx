import {Button, Form} from "react-bootstrap";
import React from "react";
import {WalletContext} from "../context/WalletContext";

export type WalletSetupScreenProps = {
    onConfirm: () => any,
}

export function WalletSetupScreen(props: WalletSetupScreenProps) {
    const {wallet} = React.useContext(WalletContext);
    const [url, setUrl] = React.useState<string>("");
    const [user, setUser] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const applyConfig = async () => {
        try {
            await wallet.configure(url, user, password);
            props.onConfirm();
        } catch(e) {
            alert("Can't connect.");
        }
    };

    return (
        <div style={{margin: 16}}>
            <Form.Label htmlFor="input_serverURL">
                WebDAV server address:
            </Form.Label>
            <Form.Control id="input_serverURL"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)} />
            <br/>
            <Form.Label htmlFor="input_serverUser">
                Username:
            </Form.Label>
            <Form.Control id="input_serverUser"
                          value={user}
                          onChange={(e) => setUser(e.target.value)} />
            <br/>
            <Form.Label htmlFor="input_serverPassword">
                Password:
            </Form.Label>
            <Form.Control id="input_serverPassword"
                          value={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)} />
            <br/>
            <Button variant="primary" onClick={applyConfig}>Apply config</Button>
        </div>
    )
}