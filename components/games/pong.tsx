import { Container } from "pixi.js";
import Rectangle from "../core-game/shapes/rectangle";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const Pong = ({
    target,
    stage
}: {
    target: HTMLElement;
    stage: Container;
}) => {
    const gameState = useSelector((state: RootState) => state.gameState);
    const {mouseX, mouseY} = gameState;

    console.log(mouseX, mouseY);
    return (
        <>
            <>
                <Rectangle 
                    stage={stage}
                    x={100}
                />
                <Rectangle 
                    stage={stage}
                    color="blue"
                />
            </>
        </>
    );
}

export default Pong;