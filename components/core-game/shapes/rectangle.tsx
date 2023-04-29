import useShape from '@/hooks/useShape';
import { GameShape } from '@/models/game/enums/game-shapes';
import { RectangleProps } from '@/models/game/rectangle-props';

export const Rectangle = ({
    stage,
    color = 'red',
    width = 50,
    height = 50,
    x = 0,
    y = 0,
}: RectangleProps) => {
    useShape({
        shape: GameShape.rectangle,
        stage,
        color,
        width,
        height,
        x,
        y
    });
    
    return (
        <></>
    );
}

export default Rectangle;