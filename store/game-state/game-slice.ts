import { MouseMovePayload } from "@/models/store/mouseMovePayload";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState{
    mouseX: number;
    mouseY: number;
}

const initialState: GameState = {
    mouseX: 0,
    mouseY: 0,
};

export const gameSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        setMousePosition: (state, action: PayloadAction<MouseMovePayload>) => {
            const {x, y} = action.payload;
            if(x || x === 0){
                state.mouseX = x;
            }
            if(y || y === 0){
                state.mouseY = y
            }
        },
    }
});

export const {
    setMousePosition,
} = gameSlice.actions;