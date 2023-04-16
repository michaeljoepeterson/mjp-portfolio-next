import { GameShape } from "@/models/game/game-shapes";
import { shapeProps } from "@/models/game/shape-props";
import { Graphics } from "pixi.js";
import { useRef, useEffect } from "react";
import useRigidBody from "./useRigidBody";


export const useShape = ({
    shape = GameShape.rectangle,
    stage,
    color = 'red',
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0,
    app,
    engine,
    enableMatter
}: shapeProps) => {

    const graphicsRef = useRef<Graphics>();
    const rigidBody = useRigidBody({
        shape,
        app,
        width,
        height,
        x,
        y,
        radius,
        engine
    });

    console.log("shape hook", rigidBody);

    //todo move to custom hook as more shapes/sprites added
    useEffect(() => {
        if(!stage){
            return;
        }
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

    useEffect(() => {
        if(!rigidBody || !app || !enableMatter){
            return;
        }
        app.ticker.add(() => {
            if(graphicsRef.current){
                graphicsRef.current.position.x = rigidBody.position.x;
                graphicsRef.current.position.y = rigidBody.position.y;
            }
        });
    }, [rigidBody, app, enableMatter]);

    return graphicsRef;
}

export default useShape;