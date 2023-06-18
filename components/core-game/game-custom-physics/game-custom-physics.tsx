import { Application, Container } from "pixi.js";
import CoreGameCanvas from "../core-game-canvas/core-game-canvas";
import { useMemo } from "react";
import { System } from "detect-collisions";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
    console.log('init physics')
    const gameObjects = useSelector((state: RootState) => state.gameState.gameObjects);
    console.log(gameObjects);

    return (
        <>
            <CoreGameCanvas 
                {...props}
            />
        </>
    )
}

export default GameCustomPhysics;