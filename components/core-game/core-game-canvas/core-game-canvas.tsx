import { useGameContext } from "@/contexts/game-context";
import { Application, Container } from "pixi.js";
import { useMemo, useEffect } from "react";

export const CoreGameCanvas = ({
    target,
    children
}: {
    target: HTMLElement;
    children: (props: {
        stage: Container;
        app: Application;
    }) => any;
}) => {
    const context = useGameContext();
    const {updateApp, updateStage} = context
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

    useEffect(() => {
        if(app){
            updateApp(app);
            updateStage(app.stage);
        }
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
            {app?.stage && children({
                    stage: app.stage,
                    app
                })
            }
        </>
    )
}

export default CoreGameCanvas;