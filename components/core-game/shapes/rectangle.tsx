import { Container, Graphics } from 'pixi.js';

export const Rectangle = ({
    stage,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0
}: {
    stage: Container<any>;
    color?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
}) => {
    const graphics = new Graphics();
    graphics.beginFill(color);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();
    stage.addChild(graphics);
    
    return (
        <></>
    );
}

export default Rectangle;