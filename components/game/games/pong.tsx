import GameStage from "../game-stage/game-stage";

export const Pong = ({
    target
}: {
    target: HTMLElement
}) => {

    return (
        <>
            <GameStage target={target}/>
        </>
    );
}

export default Pong;