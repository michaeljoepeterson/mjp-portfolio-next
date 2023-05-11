import { useGameObject } from "@/hooks/useGameObject";
import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";

export const Circle = ({
    stage,
    color = 'red',
    x = 0,
    y = 0,
    radius = 50,
    app,
    engine,
    enableMatter
}: GameObjectProps) => {

    useGameObject({
        shape: GameShape.circle,
        stage,
        color,
        radius,
        x,
        y,
        engine,
        app,
        enableMatter
    });

    return (
        <></>
    );
}

export default Circle;