import { Games } from "@/models/game/games.enum";
import Pong from "../games/pong";
import MainGame from "./main-game/main-game";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMousePosition } from "@/store/game-state/game-slice";

/**
 * main game container that hooks up the main game stage and renders the correct selected game
 * also updates the global game state
 * @param param0 
 * @returns 
 */
export const GameContainer = ({
    selectedGame = Games.pong,
    target
}: {
    selectedGame?: Games;
    target: HTMLElement
}) => {

    const dispatch = useDispatch();

    const handleMouseMove = useCallback((e: MouseEvent) => {
        console.log(e);
        const {clientX, clientY} = e;
        dispatch(setMousePosition({
            x: clientX,
            y: clientY
        }));
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);

        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

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