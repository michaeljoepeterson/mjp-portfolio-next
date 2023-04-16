import { GameShape } from "@/models/game/game-shapes";
import { shapeProps } from "@/models/game/shape-props";
import { Bodies, Body, Composite } from "matter-js";
import { useEffect, useRef, useState } from "react";

export const useRigidBody = ({
    shape,
    app,
    engine,
    width = 0,
    height = 0,
    x = 0,
    y = 0,
    radius = 0,
}: shapeProps) => {
    const [rigidBodyRef, setRigidBodyRef] = useState<Body | null>(null);
    useEffect(() => {
        if(app && engine && !rigidBodyRef){
            let rigidBody;
            if(shape === GameShape.circle){
                rigidBody = Bodies.circle(x, y, radius);
            }
            if(rigidBody){
                Composite.add(engine?.world, rigidBody);
                setRigidBodyRef(rigidBody);
                console.log('circle rigid body', rigidBodyRef)
            }
        }
        return () => {
            if(rigidBodyRef && engine){
                Composite.remove(engine?.world, rigidBodyRef);
                setRigidBodyRef(null);
            }
        }
    }, [app, engine]);

    return rigidBodyRef;
}

export default useRigidBody;