import Rectangle from "../core-game/shapes/rectangle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Circle from "../core-game/shapes/circle";
import Matter from "matter-js";

export const Pong = ({
    engine
}: {
    engine?: Matter.Engine;
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
    const topWallY = -30;
    const bottomWallY = window.innerHeight;
    const wallWidth = window.innerWidth;
    const wallHeight = 30;

    return (
        <>
            <Rectangle 
                color="blue"
                height={paddleHeight}
                width={paddleWidth}
                x={0}
                y={playerY}
                engine={engine}
                enableMatter={true}
                isStatic={false}
                id={'player'}
            />
            <Rectangle 
                x={enemyX}
                height={paddleHeight}
                width={paddleWidth}
                engine={engine}
                enableMatter={true}
                isStatic={true}
                id={'enemy'}
            />
            <Circle 
                x={ballX}
                y={ballY}
                radius={ballRadius}
                color="yellow"
                engine={engine}
                enableMatter={true}
                id={'ball'}
            />
            <Rectangle 
                x={0}
                y={topWallY}
                height={wallHeight}
                width={wallWidth}
                engine={engine}
                color="green"
                enableMatter={true}
                isStatic={true}
                id={'wallTop'}
            />
            <Rectangle 
                x={0}
                y={bottomWallY}
                height={wallHeight}
                width={wallWidth}
                engine={engine}
                color="green"
                enableMatter={true}
                isStatic={true}
                id={'wallBottom'}
            />
        </>
    );
}

export default Pong;