import { Application, Container } from "pixi.js";
import { createContext, useCallback, useContext, useState } from "react";
import { System } from "detect-collisions";

export interface IGameContext{
    app?: Application;
    stage?: Container;
    physics?: System;
    updateApp: (app: Application) => void;
    updateStage: (stage: Container) => void;
    updatePhysics: (system: System) => void;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameContextProvider = ({
    children
}: {
    children: JSX.Element;
}) => {
    const [app, setApp] = useState<Application>();
    const [stage, setStage] = useState<Container>();
    const [physics, setPhysics] = useState<System>();

    const updateApp = useCallback((app: Application) => {
        setApp(app);
    }, []);

    const updateStage = useCallback((stage: Container) => {
        setStage(stage);
    }, []);

    const updatePhysics = useCallback((physics: System) => {
        setPhysics(physics);
    }, []);

    console.log('context rerender');

    return (
        <GameContext.Provider value={{
            app,
            stage,
            physics,
            updateApp,
            updateStage,
            updatePhysics
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