import { Application, Container } from "pixi.js";
import CoreGameCanvas from "../core-game-canvas/core-game-canvas";
import { useMemo } from "react";
import { System } from "detect-collisions";

export const GameCustomPhysics = ({
    ...props
}: {
    target: HTMLElement;
    children: (props: {
        stage: Container;
        app: Application;
    }) => any;
}) => {
    const system = useMemo(() => {
        return new System()
    }, []);

    return (
        <>
            <CoreGameCanvas 
                {...props}
            />
        </>
    )
}

export default GameCustomPhysics;