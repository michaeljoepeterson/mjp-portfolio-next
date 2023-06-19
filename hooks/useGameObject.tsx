import { GameObjectProps } from "@/models/game/game-object-props";
import useShape from "./useShape";
import useRigidBody from "./useRigidBody";
import { useEffect, useRef } from "react";
import { useGameContext } from "@/contexts/game-context";
import { usePhysicsBody } from "./usePhysicsBody";

/**
 * game object hook that combines the matter rigid body with the pixijs shape
 * @param props 
 */
export const useGameObject = (props: GameObjectProps) => {
    const {app, stage, physics}  = useGameContext();
    const {
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
        applyForce
    } = useRigidBody({
       ...props,
       isStatic
    });

    usePhysicsBody(props);

    // sync sprite with rigid body
    useEffect(() => {
        if(!app || !enableMatter || !engine){
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
        updatePosition();
    }, [x, y]);
    
    return {
        applyForce: hasEnabledBodyRef.current ? applyForce : undefined
    };
}
