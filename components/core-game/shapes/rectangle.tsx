import { useGameObject } from '@/hooks/useGameObject';
import { GameObjectProps } from '@/models/game/game-object-props';

export const Rectangle = ({
    stage,
    app,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0,
    engine
}: GameObjectProps) => {
    useGameObject({
        stage,
        color,
        width,
        height,
        x,
        y,
        app,
        engine
    });
    
    return (
        <></>
    );
}

export default Rectangle;