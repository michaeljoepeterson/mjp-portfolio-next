import { useMemo, useEffect, useRef, useCallback } from "react";
import { Application, Container, Ticker } from 'pixi.js';
import { Engine } from "matter-js";

/**
 * main pixijs/game stage for rendering all assets
 * to be used by a game component to render the game
 * connexts pixijs with matterjs
 * @returns
 */
export const MainGame = ({
    target,
    children
}: {
    target: HTMLElement;
    children: (props: {
        stage: Container;
        app: Application;
        engine: Engine;
    }) => any;
}) => {

    const tickerRef = useRef<Ticker | null>();

    const engine = useMemo(() => {
        try{
            const engine = Engine.create({
                gravity: {
                    x: 0,
                    y: 0,
                    scale: 0
                },
            });
            return engine;
        }
        catch(e){
            console.error(e);
            return null;
        }
    }, []);

    const app = useMemo(() => {
        //catch issue with ssr
        try{
            const a = new Application({
                resizeTo: window,
            });
            a.ticker.minFPS = 40;
            a.ticker.maxFPS = 60;
            return a;
        }
        catch(e){
            console.error(e);
            return null
        }
    }, []);

    const updateEngine = useCallback(() => {
        if(!app || !engine){
            return;
        }
        const fps = app.ticker.FPS / 1000;
        Engine.update(engine, fps);
    }, []);

    useEffect(() => {
        if(app && engine && !tickerRef.current){
            console.log('add ticker');
            tickerRef.current = app.ticker.add(updateEngine);

        }
        return () => {
            if(app && tickerRef.current){
                console.log('remove ticker')
                app.ticker.remove(updateEngine);
                tickerRef.current = null;
            }
        }
    }, [app, engine]);

    useEffect(() => {
        return () => {
            console.log('cleanup app', app);
        }
    }, [app]);

    useEffect(() => {
        if(app?.view){
            const el = app.view as any;
            el.classList.add("fixed");
            el.classList.add("top-0");
        }
    }, [app]);

    useEffect(() => {
        if(!app || !app?.view){
            return
        }

        const el = app.view as any;
        target.appendChild(el);
    }, [app, target]);

    return (
        <>
            {app?.stage && engine && children({
                    stage: app.stage,
                    app,
                    engine
                })
            }
        </>
    )
}

export default MainGame