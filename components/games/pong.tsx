import GameStage from "../core-game/game-stage/game-stage";
import Rectangle from "../core-game/shapes/rectangle";

export const Pong = ({
    target
}: {
    target: HTMLElement
}) => {

    return (
        <>
            <GameStage target={target}>
                {
                    (stage) => (
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
                    )
                }
            </GameStage>
        </>
    );
}

export default Pong;