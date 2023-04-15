import { Container } from "pixi.js";

export interface BaseSpriteProps{
    stage: Container;
    color?: string;
    x?: number;
    y?: number;
}