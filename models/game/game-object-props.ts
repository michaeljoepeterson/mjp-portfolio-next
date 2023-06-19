
import { Engine } from "matter-js";
import { Application, Container } from "pixi.js";
import { ShapeProps } from "./shape-props";

/**
 * core game object props for use with react components
 */
export interface GameObjectProps extends ShapeProps{
    enableMatter?: boolean;
    engine?: Engine;
    isStatic?: boolean;
}

/**
 * core game object props that contain just the base data needed
 */
export type SimpleGameObject = Omit<GameObjectProps, 'app' | 'stage' | 'engine'>;

export class BaseGameObject{
    constructor(gameObjectProps?: GameObjectProps){
        if(!gameObjectProps){
            return;
        }
        const {
            engine,
            id,
            ...props
        } = gameObjectProps;
        Object.assign(this, props);
        this.id = id ? id : this.generateId();
    }

    generateId(){
        const num1 = Math.floor(Math.random() * 1001);
        const num2 = Math.floor(Math.random() * 1001);
        const num3 = Math.floor(Math.random() * 1001);
        return `${num1}_${num2}_${num3}`;
    }
}

export interface BaseGameObject extends SimpleGameObject{}
