import { ShapeProps } from "./shape-props";

export interface RigidBodyProps extends ShapeProps{
    isStatic?: boolean;
}