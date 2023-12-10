import React from "react";

export function Header(props: React.PropsWithChildren) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            padding: "0 16px",
            height: 56,
            borderBottom: "thin rgba(255,255,255,0.1) solid"
        }}>
            {props.children}
        </div>
    )
}