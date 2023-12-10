import React from "react";

export function useRefresh() {
    const [t, setT] = React.useState<number>(0);
    return () => setT(Math.random());
}
