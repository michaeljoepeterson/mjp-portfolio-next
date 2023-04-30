import { useGameObject } from "@/hooks/useGameObject";
import useShape from "@/hooks/useShape";
import { CircleProps } from "@/models/game/circle-props";
import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";

export const Circle = ({
    stage,
    color = 'red',
    x = 0,
    y = 0,
    radius = 50,
    app,
    engine
}: GameObjectProps) => {
    // useShape({
    //     shape: GameShape.circle,
    //     stage,
    //     color,
    //     radius,
    //     x,
    //     y,
    //     engine,
    //     app,
    //     enableMatter: true
    // });

    useGameObject({
        shape: GameShape.circle,
        stage,
        color,
        radius,
        x,
        y,
        engine,
        app,
        enableMatter: true
    });

    return (
        <></>
    );
}

export default Circle;