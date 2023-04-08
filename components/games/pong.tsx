import { Container } from "pixi.js";
import Rectangle from "../core-game/shapes/rectangle";

export const Pong = ({
    target,
    stage
}: {
    target: HTMLElement;
    stage: Container;
}) => {

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