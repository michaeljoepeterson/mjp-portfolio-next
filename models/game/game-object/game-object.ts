import { Body } from "matter-js";
import { Graphics } from "pixi.js";

/**
 *  base game object used to combine all pieces needed to render a object
 */
export interface GameObject{
    /**
     *  graphics for the game object
     */
    sprite: Graphics;
    /**
     *  rigid body for game object physics
     */
    rigidBody?: Body;
    /**
     * update method called on each frame
     */
    update?: () => void;
}