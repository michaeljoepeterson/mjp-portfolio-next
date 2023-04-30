import { Application, Container } from "pixi.js";
import Rectangle from "../core-game/shapes/rectangle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Circle from "../core-game/shapes/circle";
import Matter from "matter-js";

export const Pong = ({
    stage,
    app,
    engine
}: {
    stage: Container;
    app: Application;
    engine: Matter.Engine;
}) => {
    const gameState = useSelector((state: RootState) => state.gameState);
    const {mouseY} = gameState;
    const paddleWidth = 20;
    const paddleHeight = 200;
    const playerY = mouseY - paddleHeight / 2;
    const enemyX = window.innerWidth - 50;
    const ballX = window.innerWidth / 2;
    const ballY = window.innerHeight / 2;
    const ballRadius = 25;

    return (
        <>
            <Rectangle 
                stage={stage}
                color="blue"
                height={paddleHeight}
                width={paddleWidth}
                x={0}
                y={playerY}
                app={app}
                engine={engine}
            />
            <Rectangle 
                stage={stage}
                x={enemyX}
                height={paddleHeight}
                width={paddleWidth}
                app={app}
                engine={engine}
            />
            <Circle 
                x={ballX}
                y={ballY}
                radius={ballRadius}
                stage={stage}
                color="yellow"
                engine={engine}
                app={app}
            />
        </>
    );
}

export default Pong;