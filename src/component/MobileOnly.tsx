import {PropsWithChildren} from "react";

export function MobileOnly(props: PropsWithChildren) {
    return (
        <div style={{background: "#191c1f"}}>
            <div style={{
                maxWidth: 600,
                margin: "auto",
                background: "var(--bs-body-bg)",
                boxShadow: "0px 0px 16px 16px rgba(0,0,0,0.1)"
            }}>
                {props.children}
            </div>
        </div>
    )
}