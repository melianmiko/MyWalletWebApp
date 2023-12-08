import React from "react";
import {Button} from "react-bootstrap";

export type InputKeyboardProps = {
    rowHeight: number,
    value: string,
    onValueChange: (v: string) => any,
    onEnterPress: () => any,
};

function InputButton(props: InputKeyboardProps & {liter: string|number, row: string|number, col: string|number}) {
    const ref = React.createRef<HTMLButtonElement>();

    const onClick = () => {
        if(ref.current) ref.current.blur();

        if(props.value === "" && props.liter === 0) return;
        if(props.value === "" && props.liter === ".") {
            props.onValueChange("0.");
        } else {
            props.onValueChange(props.value + String(props.liter));
        }
    }

    return (
        <Button style={{
                    gridColumn: props.col,
                    gridRow: props.row,
                    fontSize: 48,
                    fontWeight: 300
                }}
                onClick={onClick}
                ref={ref}
                variant="secondary">
            {props.liter}
        </Button>
    );
}

function EnterButton(props: InputKeyboardProps) {
    return (
        <Button style={{
                    fontSize: 36,
                    fontWeight: 300,
                    gridRow: "2 / 5",
                    gridColumn: 4,
                }}
                onClick={() => props.onEnterPress()}
                variant="secondary-2">
            GO
        </Button>
    )
}

function BackspaceButton(props: InputKeyboardProps) {
    const onClick = () => {
        props.onValueChange(props.value.substring(0, props.value.length - 1));
    }

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        props.onValueChange("");
    }

    return (
        <Button style={{
            fontSize: 48,
            fontWeight: 300,
            gridRow: 1,
            gridColumn: 4,
        }}
                onClick={onClick}
                onContextMenu={onContextMenu}
                variant="secondary-2">
            DEL
        </Button>
    );
}

export function InputKeyboard(userProps: Partial<InputKeyboardProps>) {
    const props: InputKeyboardProps = {
        rowHeight: 80,
        value: "",
        onValueChange: console.log,
        onEnterPress: console.log,
        ...userProps,
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: `minmax(${props.rowHeight}px, auto)`,
            gap: 4
        }}>
            <InputButton row={1} col={1} liter={7} {...props} />
            <InputButton row={1} col={2} liter={8} {...props} />
            <InputButton row={1} col={3} liter={9} {...props} />
            <InputButton row={2} col={1} liter={4} {...props} />
            <InputButton row={2} col={2} liter={5} {...props} />
            <InputButton row={2} col={3} liter={6} {...props} />
            <InputButton row={3} col={1} liter={1} {...props} />
            <InputButton row={3} col={2} liter={2} {...props} />
            <InputButton row={3} col={3} liter={3} {...props} />
            <InputButton row={3} col={2} liter={2} {...props} />
            <InputButton row={3} col={3} liter={3} {...props} />

            <InputButton row={4} col={"1 / 3"} liter={0} {...props} />
            <InputButton row={4} col={3} liter={"."} {...props} />
            <EnterButton {...props} />
            <BackspaceButton {...props} />
        </div>
    )
}