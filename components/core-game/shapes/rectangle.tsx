import { useGameObject } from '@/hooks/useGameObject';
import useShape from '@/hooks/useShape';
import { GameObjectProps } from '@/models/game/game-object-props';
import { GameShape } from '@/models/game/game-shapes';
import { RectangleProps } from '@/models/game/rectangle-props';

export const Rectangle = ({
    stage,
    app,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0,
}: GameObjectProps) => {
    // useShape({
    //     shape: GameShape.rectangle,
    //     stage,
    //     color,
    //     width,
    //     height,
    //     x,
    //     y
    // });
    useGameObject({
        stage,
        color,
        width,
        height,
        x,
        y,
        app
    })
    
    return (
        <></>
    );
}

export default Rectangle;