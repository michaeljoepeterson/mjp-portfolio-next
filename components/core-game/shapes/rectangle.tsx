import { useGameObject } from '@/hooks/useGameObject';
import { GameObjectProps } from '@/models/game/game-object-props';
import { GameShape } from '@/models/game/game-shapes';

export const Rectangle = ({
    stage,
    app,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0,
    engine,
    enableMatter,
    isStatic
}: GameObjectProps) => {
    useGameObject({
        stage,
        color,
        width,
        height,
        x,
        y,
        app,
        engine,
        enableMatter,
        shape: GameShape.rectangle,
        isStatic
    });
    
    return (
        <></>
    );
}

export default Rectangle;