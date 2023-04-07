import { Games } from "@/models/game/games.enum"
import { useMemo, useEffect } from "react";
import { Application, Sprite, Assets } from 'pixi.js';

/**
 * main pixijs/game stage for rendering all assets
 * to be used by a game component to render the game
 * @returns
 */
export const GameStage = ({
    target
}: {
    target: HTMLElement
}) => {

    const app = useMemo(() => {
        //catch issue with ssr
        try{
            return new Application({});
        }
        catch(e){
            console.error(e);
            return null
        }
    }, []);

    useEffect(() => {
        if(!app || !app?.view){
            return
        }

        const el = app.view as any
        target.appendChild(el);
    }, [app, target]);

    return (
        <>
        </>
    )
}

export default GameStage