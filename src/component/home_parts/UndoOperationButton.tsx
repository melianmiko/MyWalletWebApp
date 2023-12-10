import {Button} from "react-bootstrap";
import React from "react";
import {WalletContext} from "../../context/WalletContext";

export type UndoOperationButtonProps = {
    afterUndo: () => any,
}

export function UndoOperationButton(props: UndoOperationButtonProps) {
    const {wallet} = React.useContext(WalletContext);
    const s = wallet.getUndoAmount();

    const onClick = () => {
        wallet.undoLastOperation();
        props.afterUndo();
    };

    return (
        <div>
            <Button style={{
                margin: "0 4px",
                opacity: 0.5,
            }}
                    variant="secondary-2"
                    onClick={onClick}>
                Undo {-1 * s}
            </Button>
        </div>
    );
}