import useShape from "@/hooks/useShape";
import { CircleProps } from "@/models/game/circle-props";
import { GameShape } from "@/models/game/game-shapes";
import { Graphics } from "pixi.js";
import { useRef } from "react";

export const Circle = ({
    stage,
    color = 'red',
    x = 0,
    y = 0,
    radius = 50
}: CircleProps) => {
    const circleGraphics = useRef<Graphics>();

    useShape({
        shape: GameShape.circle,
        stage,
        color,
        radius,
        x,
        y
    });

    return (
        <></>
    );
}

export default Circle;