import { useGameObject } from "@/hooks/useGameObject";
import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";
import { useEffect } from "react";

export const Circle = (props: GameObjectProps) => {

    const {applyForce} = useGameObject({
        ...props,
        shape: GameShape.circle
    });

    useEffect(() => {
        if(applyForce){
            applyForce(-1000, -1000);
        }
    }, [applyForce]);

    return (
        <></>
    );
}

export default Circle;