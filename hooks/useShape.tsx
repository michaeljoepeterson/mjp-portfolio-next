import { GameShape } from "@/models/game/game-shapes";
import { Container, Graphics } from "pixi.js";
import { useRef, useCallback, useState, useDebugValue } from "react";
import { ShapeProps } from "@/models/game/shape-props";

/**
 *  hook to draw shapes to canvas
 */
export const useShape = ({
    shape = GameShape.rectangle,
    color = 'red',
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0,
}: ShapeProps): {
    graphics?: Graphics;
    /**
     * draw the graphics with the passed props to the stage
     * @param stage
     * @returns
     */
    drawGraphics: (stage: Container) => void;
    /**
     * update teh position based off the passed props
     * @returns
     */
    updatePosition: () => void;
} => {

    const graphicsRef = useRef<Graphics>();
    // todo move outside of shape to shape component and only register rigid body if it should be registered and pass rigid body to shape as optional
    // const rigidBody = useRigidBody({
    //     shape,
    //     app,
    //     width,
    //     height,
    //     x,
    //     y,
    //     radius,
    //     engine
    // });

    //console.log("shape hook", x, y, shape);

    const drawGraphics = useCallback((stage: Container) => {
        if(graphicsRef.current){
            stage.removeChild(graphicsRef.current);
        }
        console.log('draw graphics');
        const curretnGraphics = new Graphics();
        curretnGraphics.beginFill(color);
        if(shape === GameShape.rectangle){
            curretnGraphics.drawRect(0, 0, width, height);
        }
        else if(shape === GameShape.circle){
            curretnGraphics.drawCircle(0, 0, radius);
        }
        curretnGraphics.position.set(x, y);
        curretnGraphics.endFill();
        stage.addChild(curretnGraphics);
        graphicsRef.current = curretnGraphics
        return curretnGraphics;
    }, [graphicsRef.current, x, y, radius, width, height]);

    const updatePosition = useCallback(() => {
        if(!graphicsRef.current){
            return;
        }
        console.log('update pos', x, y);
        graphicsRef.current.position.set(x, y);
    }, [graphicsRef.current, x, y]);

    //todo move to custom hook as more shapes/sprites added
    // useEffect(() => {
    //     if(!stage){
    //         return;
    //     }
    //     if(graphicsRef.current){
    //         graphicsRef.current.clear();
    //     }
    //     graphicsRef.current = drawGraphics(stage, x, y);
    // }, [color, height, stage, width, x, y]);

    // useEffect(() => {
    //     if(!rigidBody || !app || !enableMatter){
    //         return;
    //     }
    //     app.ticker.add(() => {
    //         if(stage && graphicsRef.current){
    //             graphicsRef.current.position.set(rigidBody.position.x, rigidBody.position.y);
    //         }
    //     });
    // }, [rigidBody, app, enableMatter]);

    return {
        graphics: graphicsRef.current,
        drawGraphics,
        updatePosition
    };
}

export default useShape;