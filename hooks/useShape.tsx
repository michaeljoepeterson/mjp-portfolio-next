import { GameShape } from "@/models/game/game-shapes";
import { shapeProps } from "@/models/game/shape-props";
import { Container, Graphics } from "pixi.js";
import { useRef, useEffect, useCallback } from "react";
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

    console.log("shape hook", x, y, shape);

    const drawGraphics = useCallback((stage: Container, x: number, y: number) => {
        const graphics = new Graphics();
        graphics.beginFill(color);
        if(shape === GameShape.rectangle){
            graphics.drawRect(x, y, width, height);
        }
        else if(shape === GameShape.circle){
            graphics.drawCircle(x, y, radius);
        }
        graphics.endFill();
        //graphics.position.set(x, y);
        stage.addChild(graphics);
        return graphics;
    }, []);

    //todo move to custom hook as more shapes/sprites added
    useEffect(() => {
        if(!stage){
            return;
        }
        if(graphicsRef.current){
            graphicsRef.current.clear();
        }
        graphicsRef.current = drawGraphics(stage, x, y);
    }, [color, height, stage, width, x, y]);

    useEffect(() => {
        if(!rigidBody || !app || !enableMatter){
            return;
        }
        app.ticker.add(() => {
            if(graphicsRef.current && stage){
                graphicsRef.current.clear();
                graphicsRef.current = drawGraphics(stage, rigidBody.position.x, rigidBody.position.y);
                //graphicsRef.current.position.set(rigidBody.position.x, rigidBody.position.y)
                // debugger
                // graphicsRef.current.position.x = rigidBody.position.x;
                // graphicsRef.current.position.y = rigidBody.position.y;
            }
        });
    }, [rigidBody, app, enableMatter]);

    return graphicsRef;
}

export default useShape;