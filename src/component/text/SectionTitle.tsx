import React from "react";

export function SectionTitle(props: React.PropsWithChildren) {
    return (
        <h1>
            {props.children}
        </h1>
    )
}