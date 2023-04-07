import { Games } from "@/models/game/games.enum";
import Pong from "../games/pong";

export const GameContainer = ({
    selectedGame = Games.pong,
    target
}: {
    selectedGame?: Games;
    target: HTMLElement
}) => {

    console.log(target);
    return (
        <div>
            Game container
            { selectedGame === Games.pong && (<Pong target={target}/>)}
        </div>
    )
}

export default GameContainer;