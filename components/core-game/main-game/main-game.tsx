import { useMemo, useEffect, useRef, useCallback } from "react";
import { Application, Container, Ticker } from 'pixi.js';
import { Engine } from "matter-js";
import { useSelector } from "react-redux";
import { selectGameShapes, selectTotalGameShapes } from "@/store/game-state/selectors/game-selectors";
import { RootState } from "@/store/store";
import { GameObject } from "@/models/game/game-object/game-object";

/**
 * main pixijs/game stage for rendering all assets
 * to be used by a game component to render the game
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

    const baseShapes = useSelector((state: RootState) => selectGameShapes(state));
    const totalShapes = useSelector((state: RootState) => selectTotalGameShapes(state));

    console.log('base shapes: ', baseShapes, totalShapes);
    const gameObjects: GameObject[] = useMemo(() => {
        return [];
    }, [baseShapes]);

    useEffect(() => {
        // logic to determine if the game integration with react has finished initializing before creating sprites/bodies
    }, [gameObjects, totalShapes]);

    const tickerRef = useRef<Ticker | null>();
    // create game physics engine
    const engine = useMemo(() => {
        try{
            const engine = Engine.create({
                gravity: {
                    x: 0,
                    y: 1,
                    scale: 2
                },
            });
            return engine;
        }
        catch(e){
            console.error(e);
            return null;
        }
    }, []);

    // todo split up into smaller hooks for easier readability

    // create game screen/canvas
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

    // update the engine when the game canvas updates
    const updateEngine = useCallback(() => {
        if(!app || !engine){
            return;
        }
        const fps = app.ticker.FPS / 1000;
        Engine.update(engine, fps);
        //console.log('updating engine', new Date().getSeconds());
    }, []);

    // sync the engine and game updates
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
        console.dir(el);
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