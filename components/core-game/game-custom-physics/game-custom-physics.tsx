import { Application, Container } from "pixi.js";
import CoreGameCanvas from "../core-game-canvas/core-game-canvas";
import { useEffect, useMemo } from "react";
import { System } from "detect-collisions";
import { useGameContext } from "@/contexts/game-context";

export const GameCustomPhysics = ({
    ...props
}: {
    target: HTMLElement;
    children: (props: {
        stage: Container;
        app: Application;
    }) => any;
}) => {
    const {updatePhysics} = useGameContext();
    const system = useMemo(() => {
        return new System()
    }, []);

    useEffect(() => {
        if(system){
            updatePhysics(system);
        }
        return () => {
            console.log('clean up physics');
        }
    }, [system]);

    return (
        <>
            <CoreGameCanvas 
                {...props}
            />
        </>
    )
}

export default GameCustomPhysics;