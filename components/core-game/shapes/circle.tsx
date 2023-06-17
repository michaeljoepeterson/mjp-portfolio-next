import { useGameObject } from "@/hooks/useGameObject";
import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";
import { useEffect } from "react";

export const Circle = ({
    stage,
    color = 'red',
    x = 0,
    y = 0,
    radius = 50,
    app,
    engine,
    enableMatter
}: GameObjectProps) => {

    const {applyForce} = useGameObject({
        shape: GameShape.circle,
        stage,
        color,
        radius,
        x,
        y,
        engine,
        app,
        enableMatter
    });

    useEffect(() => {
        if(applyForce){
            applyForce(-1500, -1500);
        }
    }, [applyForce]);

    return (
        <></>
    );
}

export default Circle;