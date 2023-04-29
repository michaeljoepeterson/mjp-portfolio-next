import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectGameState = (state: RootState) => state.gameState;

export const selectGameShapes = createSelector(
    [selectGameState],
    (gameState) => {
        return gameState.gameShapes;
    }
);

export const selectTotalGameShapes = createSelector(
    [selectGameState],
    (gameState) => {
        return gameState.totalShapes;
    }
)