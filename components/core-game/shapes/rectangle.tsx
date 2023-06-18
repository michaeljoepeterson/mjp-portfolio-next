import { useGameObject } from '@/hooks/useGameObject';
import { GameObjectProps } from '@/models/game/game-object-props';
import { GameShape } from '@/models/game/game-shapes';

export const Rectangle = (props : GameObjectProps) => {
    useGameObject({
        ...props,
        shape: GameShape.rectangle,
    });
    
    return (
        <></>
    );
}

export default Rectangle;