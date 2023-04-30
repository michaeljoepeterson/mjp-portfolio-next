import { GameShape } from "@/models/game/game-shapes";
import { Bodies, Body, Composite, Engine } from "matter-js";
import { useCallback, useState } from "react";
import { ShapeProps } from "@/models/game/shape-props";

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
    enable = false
}: ShapeProps & {
    enable?: boolean;
}): {
    rigidBody?: Body;
    addBody: (engine: Engine) => void;
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
                rigidBody = Bodies.circle(x, y, radius);
            }
            if(rigidBody){
                Composite.add(engine?.world, rigidBody);
                setrigidBody(rigidBody);
                console.log('circle rigid body', rigidBody)
            }
        }
    }, [rigidBody]);

    // useEffect(() => {
    //     if(app && engine && !rigidBodyRef){
    //         let rigidBody;
    //         if(shape === GameShape.circle){
    //             rigidBody = Bodies.circle(x, y, radius);
    //         }
    //         if(rigidBody){
    //             Composite.add(engine?.world, rigidBody);
    //             setRigidBodyRef(rigidBody);
    //             console.log('circle rigid body', rigidBodyRef)
    //         }
    //     }
    //     return () => {
    //         if(rigidBodyRef && engine){
    //             Composite.remove(engine?.world, rigidBodyRef);
    //             setRigidBodyRef(undefined);
    //         }
    //     }
    // }, [enable]);

    return {
        rigidBody,
        addBody
    };
}

export default useRigidBody;