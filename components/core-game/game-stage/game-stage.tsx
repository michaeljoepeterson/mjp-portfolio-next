import { useMemo, useEffect } from "react";
import { Application, Container } from 'pixi.js';

/**
 * main pixijs/game stage for rendering all assets
 * to be used by a game component to render the game
 * @returns
 */
export const GameStage = ({
    target,
    children
}: {
    target: HTMLElement;
    children: (stage: Container) => any;
}) => {

    const app = useMemo(() => {
        //catch issue with ssr
        try{
            return new Application({
                resizeTo: window,
            });
        }
        catch(e){
            console.error(e);
            return null
        }
    }, [target]);

    useEffect(() => {
        if(app?.view){
            const el = app.view as any;
            el.classList.add("fixed");
            el.classList.add("top-0")
        }
    }, [app]);

    useEffect(() => {
        if(!app || !app?.view){
            return
        }

        const el = app.view as any;
        console.dir(el);
        target.appendChild(el);
    }, [app, target]);

    return (
        <>
            {app?.stage && children(app?.stage)}
        </>
    )
}

export default GameStage