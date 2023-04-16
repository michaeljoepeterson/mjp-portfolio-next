import { Engine } from "matter-js";
import { Application, Container } from "pixi.js";

export interface BaseSpriteProps{
    stage?: Container;
    color?: string;
    x?: number;
    y?: number;
    app?: Application;
    engine?: Engine;
}