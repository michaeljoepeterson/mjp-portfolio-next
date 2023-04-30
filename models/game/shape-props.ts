import { CircleProps } from "./circle-props";
import { GameShape } from "./game-shapes";
import { RectangleProps } from "./rectangle-props";

export interface ShapeProps extends RectangleProps, CircleProps{
    shape?: GameShape;
}