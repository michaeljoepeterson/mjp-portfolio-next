
import { Engine } from "matter-js";
import { Application, Container } from "pixi.js";
import { ShapeProps } from "./shape-props";

export interface GameObjectProps extends ShapeProps{
    enableMatter?: boolean;
    app: Application;
    stage: Container;
    engine: Engine;
}