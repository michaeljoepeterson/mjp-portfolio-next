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
    updatePosition: (x?: number, y?:number) => void;
} => {

    const graphicsRef = useRef<Graphics>();

    //console.log("shape hook", x, y, shape);

    /**
     * use to initially draw the graphics/sprite when ready
     */
    const drawGraphics = useCallback((stage: Container) => {
        if(graphicsRef.current){
            stage.removeChild(graphicsRef.current);
        }
        console.log('draw graphics');
        const currentGraphics = new Graphics();
        currentGraphics.beginFill(color);
        if(shape === GameShape.rectangle){
            currentGraphics.drawRect(0, 0, width, height);
        }
        else if(shape === GameShape.circle){
            currentGraphics.drawCircle(0, 0, radius);
        }
        currentGraphics.position.set(x, y);
        currentGraphics.endFill();
        stage.addChild(currentGraphics);
        graphicsRef.current = currentGraphics;
        return currentGraphics;
    }, [graphicsRef.current, x, y, radius, width, height]);

    /**
     * use to update the position of the graphics/sprite
     */
    const updatePosition = useCallback((posX: number = x, posY: number = y) => {
        if(!graphicsRef.current){
            return;
        }
        graphicsRef.current.position.set(posX, posY);
    }, [graphicsRef.current, x, y]);

    return {
        graphics: graphicsRef.current,
        drawGraphics,
        updatePosition
    };
}

export default useShape;