import {Button} from "react-bootstrap";
import React from "react";

export type ChangePendingSignButtonProps = {
    pendingSign: boolean,
    setPendingSign: (v: boolean) => void,
}

export function ChangePendingSignButton(props: ChangePendingSignButtonProps) {
    const {pendingSign, setPendingSign} = props
    return (
        <div>
            <Button style={{
                width: 48,
                margin: "0 4px",
                opacity: 0.5,
            }}
                    variant={pendingSign ? "success" : "secondary"}
                    onClick={() => setPendingSign(!pendingSign)}>
                {pendingSign ? "+" : "-"}
            </Button>
        </div>
    );
}