import { GameObjectProps } from "@/models/game/game-object-props";
import useShape from "./useShape";
import useRigidBody from "./useRigidBody";
import { useEffect, useRef } from "react";

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
        isStatic
    } = props;
    const hasEnabledBodyRef = useRef(false);

    const {
        graphics,
        drawGraphics,
        updatePosition
    } = useShape(props);

    const {
        rigidBody,
        addBody,
        applyForce,
        updatePosition: updateBodyPosition
    } = useRigidBody({
       ...props,
       isStatic
    });

    // sync sprite with rigid body
    useEffect(() => {
        if(!app || !enableMatter){
            return;
        }
        app.ticker.add(() => {
            if(enableMatter && !hasEnabledBodyRef.current){
                hasEnabledBodyRef.current = true;
                addBody(engine);
            }
            if(stage && graphics && rigidBody && !isStatic){
                if(graphics.position.x !== rigidBody.position.x || graphics.position.y !== rigidBody.position.y){
                    updatePosition(rigidBody.position.x, rigidBody.position.y);
                }
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
        updatePosition(x, y);
        if(enableMatter && updateBodyPosition){
            console.log(x, y, props.color);
            updateBodyPosition(x, y);
        }
    }, [x, y, enableMatter, updateBodyPosition]);
    
    return {
        applyForce: hasEnabledBodyRef.current ? applyForce : undefined
    };
}
