import useShape from "@/hooks/useShape";
import { CircleProps } from "@/models/game/circle-props";
import { GameShape } from "@/models/game/enums/game-shapes";

export const Circle = ({
    stage,
    color = 'red',
    x = 0,
    y = 0,
    radius = 50,
    app,
    engine
}: CircleProps) => {
    useShape({
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