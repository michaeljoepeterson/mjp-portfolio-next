import { BaseGameObject } from "@/models/game/game-object-props";
import { MouseMovePayload } from "@/models/store/mouseMovePayload";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnyPtrRecord } from "dns";
const gameObjectLookup = new Map;

interface GameState{
    mouseX: number;
    mouseY: number;
    gameObjects: BaseGameObject[];
}

const initialState: GameState = {
    mouseX: 0,
    mouseY: 0,
    gameObjects: [],
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
        addGameObject: (state, action: PayloadAction<BaseGameObject>) => {
            const {payload} = action;
            if(!gameObjectLookup.has(payload.id)){
                state.gameObjects.push(action.payload);
                gameObjectLookup.set(action.payload.id, state.gameObjects.length - 1);
            }
        }
    }
});

export const {
    setMousePosition,
    addGameObject
} = gameSlice.actions;