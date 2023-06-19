import { useGameContext } from "@/contexts/game-context";
import { GameShape } from "@/models/game/game-shapes";
import { PhysicsBodyProps } from "@/models/game/physics-body-props";
import { useEffect, useState } from "react";

export const usePhysicsBody = ({
    shape,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0
}: PhysicsBodyProps) => {
    const {physics} = useGameContext();
    const [body, setBody] = useState<any>();

    useEffect(() => {
        return () => {
            if(body){
                physics?.remove(body);
            }
        }
    }, [body]);

    useEffect(() => {
        if(!physics){
            return;
        }
        if(shape === GameShape.circle){
            const circle = physics?.createCircle({
                x,
                y
            }, radius);
            setBody(circle);
        }
        else if(shape === GameShape.rectangle){
            const rect = physics?.createBox({
                x,
                y
            }, width, height);
            setBody(rect);
        }
    }, [shape, width, height, x, y, radius]);

    return {
        body
    }
}
