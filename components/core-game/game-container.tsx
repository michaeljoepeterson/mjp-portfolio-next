import { Games } from "@/models/game/games.enum";
import Pong from "../games/pong";
import MainGame from "./main-game/mina-game";

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
            <MainGame target={target}>
                {
                    (stage) => {
                        return (
                            <>
                                { selectedGame === Games.pong && (<Pong stage={stage} target={target}/>)}
                            </>
                        )
                    }
                }
            </MainGame>
        </div>
    )
}

export default GameContainer;