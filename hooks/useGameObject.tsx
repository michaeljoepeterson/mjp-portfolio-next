import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";
import useShape from "./useShape";
import useRigidBody from "./useRigidBody";
import { useEffect, useRef, useState } from "react";

/**
 * game object hook that combines the matter rigid body with the pixijs shape
 * @param props 
 */
export const useGameObject = (props: GameObjectProps) => {
    const {
        stage,
        app,
        enableMatter,
        engine,
        x,
        y,
    } = props;
    const enableBodyRef = useRef(false);

    const {
        graphics,
        drawGraphics,
        updatePosition
    } = useShape(props);

    const {
        rigidBody,
        addBody
    } = useRigidBody({
       ...props,
       enable: enableBodyRef.current
    });

    useEffect(() => {
        if(!app || !enableMatter){
            return;
        }
        app.ticker.add(() => {
            if(enableMatter && !enableBodyRef.current){
                enableBodyRef.current = true;
                addBody(engine);
            }
            if(stage && graphics && rigidBody){
                console.log('update body pos');
                graphics.position.set(rigidBody.position.x, rigidBody.position.y);
            }
        });
    }, [rigidBody, app, enableMatter]);

    useEffect(() => {
        if(!stage || !drawGraphics){
            return;
        }
        console.log('draw parent');
        drawGraphics(stage);
    }, [stage]);

    useEffect(() => {
        if(!graphics){
            return;
        }
        updatePosition();
    }, [x, y]);
}
