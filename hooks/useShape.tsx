import { CircleProps } from "@/models/game/circle-props";
import { GameShape } from "@/models/game/game-shapes";
import { RectangleProps } from "@/models/game/rectangle-props";
import { Graphics } from "pixi.js";
import { useRef, useEffect } from "react";

export interface shapeProps extends RectangleProps, CircleProps{}

export const useShape = ({
    shape = GameShape.rectangle,
    stage,
    color = 'red',
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0
}: {
    shape: GameShape
} & shapeProps) => {

    const graphicsRef = useRef<Graphics>();
    //todo move to custom hook as more shapes/sprites added
    useEffect(() => {
        if(graphicsRef.current){
            graphicsRef.current.clear();
        }
        const graphics = new Graphics();
        graphics.beginFill(color);
        if(shape === GameShape.rectangle){
            graphics.drawRect(x, y, width, height);
        }
        else if(shape === GameShape.circle){
            graphics.drawCircle(x, y, radius);
        }
        graphics.endFill();
        stage.addChild(graphics);
        graphicsRef.current = graphics;
    }, [color, height, stage, width, x, y]);

    return graphicsRef;
}

export default useShape;