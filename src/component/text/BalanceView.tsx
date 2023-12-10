import React from "react";

export type BalanceViewProps = {
    align?: "left"|"right",
    danger?: boolean,
}

export function BalanceView(props: React.PropsWithChildren<BalanceViewProps>) {
    return (
        <p style={{
            textAlign: props.align,
            color: props.danger ? "#e57676" : "",
            margin: "0px",
            fontSize: "3.5em",
            lineHeight: "1.2em",
        }}>
            {props.children}
        </p>
    )
}