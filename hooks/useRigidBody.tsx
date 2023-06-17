import { GameShape } from "@/models/game/game-shapes";
import { Bodies, Body, Composite, Engine } from "matter-js";
import { useCallback, useEffect, useState } from "react";
import { ShapeProps } from "@/models/game/shape-props";
import { RigidBodyProps } from "@/models/game/rigid-body-props";

/**
 * hook to attach rigid body to the matter world
 * @param param0 
 * @returns 
 */
export const useRigidBody = ({
    shape,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0,
    isStatic
}: RigidBodyProps): {
    rigidBody?: Body;
    addBody: (engine: Engine) => void;
    applyForce?: (x?:number, y?: number) => void;
} => {
    const [rigidBody, setrigidBody] = useState<Body | undefined>(undefined);
    const addBody = useCallback((engine: Engine) => {
        if(rigidBody){
            Composite.remove(engine?.world, rigidBody);
            setrigidBody(undefined);
        }
        if(!rigidBody){
            let rigidBody;
            if(shape === GameShape.circle){
                rigidBody = Bodies.circle(x, y, radius, {
                    isStatic,
                });
            }
            else if(shape === GameShape.rectangle){
                console.log(x, y, width, height);
                rigidBody = Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
                    isStatic,
                    inertia: 0,
                });
            }
            if(rigidBody){
                Composite.add(engine?.world, rigidBody);
                setrigidBody(rigidBody);
                console.log('attached rigid body', rigidBody)
            }
        }
    }, [rigidBody]);

    useEffect(() => {
        if(rigidBody){
            rigidBody.position.x = x;
            rigidBody.position.y = y;
        }
    }, [x, y]);

    const applyForce = useCallback((x: number = 0, y: number = 0) => {
        if(!rigidBody){
            return;
        }
        Body.applyForce(rigidBody, {x: rigidBody.position.x, y: rigidBody.position.y}, {x, y});
    }, [rigidBody]);

    return {
        rigidBody,
        addBody,
        applyForce: rigidBody ? applyForce : undefined
    };
}

export default useRigidBody;