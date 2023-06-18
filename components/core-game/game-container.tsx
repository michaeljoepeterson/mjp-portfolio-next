import { Games } from "@/models/game/games.enum";
import Pong from "../games/pong";
import MainGame from "./main-game/main-game";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMousePosition } from "@/store/game-state/game-slice";
import GameCustomPhysics from "./game-custom-physics/game-custom-physics";

/**
 * main game container that hooks up the main game stage and renders the correct selected game
 * also updates the global game state
 * @returns 
 */
export const GameContainer = ({
    selectedGame = Games.pong,
    target,
    useMatter
}: {
    selectedGame?: Games;
    target: HTMLElement;
    // temp remove when convert done
    useMatter?: boolean;
}) => {

    const dispatch = useDispatch();

    const handleMouseMove = useCallback((e: MouseEvent) => {
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
            {
                useMatter && (
                    <MainGame target={target}>
                        {
                            ({stage, app, engine}) => {
                                return (
                                    <>
                                        { selectedGame === Games.pong && 
                                            (
                                                <Pong 
                                                    stage={stage}
                                                    app={app}
                                                    engine={engine} 
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        }
                    </MainGame>
                )
            }
            {
                !useMatter && (
                    <GameCustomPhysics target={target}>
                        {
                            ({stage, app}) => {
                                return (
                                    <>
                                        { selectedGame === Games.pong && 
                                            (
                                                <Pong 
                                                    stage={stage}
                                                    app={app}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        }
                    </GameCustomPhysics>
                )
            }
        </div>
    )
}

export default GameContainer;