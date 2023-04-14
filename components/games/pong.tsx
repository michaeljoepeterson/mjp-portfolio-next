import { Container } from "pixi.js";
import Rectangle from "../core-game/shapes/rectangle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
    console.log(enemyX);
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
            </>
        </>
    );
}

export default Pong;