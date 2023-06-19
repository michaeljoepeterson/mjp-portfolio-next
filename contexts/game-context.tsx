import { Application, Container } from "pixi.js";
import { createContext, useCallback, useContext, useState } from "react";

export interface IGameContext{
    app?: Application;
    stage?: Container;
    updateApp: (app: Application) => void;
    updateStage: (stage: Container) => void;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameContextProvider = ({
    children
}: {
    children: JSX.Element;
}) => {
    const [app, setApp] = useState<Application>();
    const [stage, setStage] = useState<Container>();

    const updateApp = useCallback((app: Application) => {
        setApp(app);
    }, []);

    const updateStage = useCallback((stage: Container) => {
        setStage(stage);
    }, []);

    return (
        <GameContext.Provider value={{
            app,
            stage,
            updateApp,
            updateStage
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = (): IGameContext => {
    try{
        const context = useContext(GameContext);
        if(!context){
            throw {
                message: 'error getting context'
            };
        }
        return context;
    }
    catch(e){
        console.warn(e);
        throw e;
    }
}