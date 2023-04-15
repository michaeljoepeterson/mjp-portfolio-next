import { Container } from "pixi.js";
import Rectangle from "../core-game/shapes/rectangle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Circle from "../core-game/shapes/circle";

export const Pong = ({
    stage
}: {
    stage: Container;
}) => {
    const gameState = useSelector((state: RootState) => state.gameState);
    const {mouseY} = gameState;
    const paddleWidth = 50;
    const paddleHeight = 150;
    const playerY = mouseY - paddleHeight / 2;
    const enemyX = window.innerWidth - 50;
    const ballX = window.innerWidth / 2;
    const ballY = window.innerHeight / 2;
    const ballRadius = 25;

    return (
        <>
            <>
                <Rectangle 
                    stage={stage}
                    color="blue"
                    height={paddleHeight}
                    width={paddleWidth}
                    x={0}
                    y={playerY}
                />
                <Rectangle 
                    stage={stage}
                    x={enemyX}
                    height={paddleHeight}
                    width={paddleWidth}
                />
                <Circle 
                    x={ballX}
                    y={ballY}
                    radius={ballRadius}
                    stage={stage}
                    color="green"
                />
            </>
        </>
    );
}

export default Pong;