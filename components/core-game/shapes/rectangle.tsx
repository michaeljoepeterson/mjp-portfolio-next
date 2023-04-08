import { Container, Graphics } from 'pixi.js';
import { useEffect } from 'react';

export const Rectangle = ({
    stage,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0
}: {
    stage: Container;
    color?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}) => {
    //todo move to custom hook as more shapes/sprites added
    useEffect(() => {
        const graphics = new Graphics();
        graphics.beginFill(color);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
        stage.addChild(graphics);
    }, [color, height, stage, width, x, y]);
    
    return (
        <></>
    );
}

export default Rectangle;