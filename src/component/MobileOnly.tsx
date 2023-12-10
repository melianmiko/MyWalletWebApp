import {PropsWithChildren} from "react";

export function MobileOnly(props: PropsWithChildren) {
    return (
        <div style={{
            maxWidth: 600,
        }}>
            {props.children}
        </div>
    )
}