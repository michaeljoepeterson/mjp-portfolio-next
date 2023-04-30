import { GameObjectProps } from "@/models/game/game-object-props";
import { GameShape } from "@/models/game/game-shapes";
import useShape from "./useShape";
import useRigidBody from "./useRigidBody";
import { useEffect, useState } from "react";

/**
 * game object hook that combines the matter rigid body with the pixijs shape
 * @param props 
 */
export const useGameObject = (props: GameObjectProps) => {
    const {
        stage,
        app,
        enableMatter,
        x,
        y,
        shape = GameShape.rectangle
    } = props;
    const [enableBody, setEnableBody] = useState<boolean>(false);

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
       enable: enableBody
    });

    useEffect(() => {
        // if(!rigidBody || !app || !enableMatter){
        //     return;
        // }
        // app.ticker.add(() => {
        //     if(rigidBody && enableMatter && enableMatter){
        //         setEnableBody(true);
        //     }
        //     if(stage && graphics){
        //         graphics.position.set(rigidBody.position.x, rigidBody.position.y);
        //     }
        // });
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
