import { Games } from "@/models/game/enums/games.enum";
import { BaseGameObjectProps } from "@/models/game/game-object/base-game-object-props";
import { MouseMovePayload } from "@/models/store/mouseMovePayload";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState{
    mouseX: number;
    mouseY: number;
    gameShapes: BaseGameObjectProps[];
    registeredShapesLookup: Map<string, BaseGameObjectProps>;
    totalShapes: number;
    game: Games;
}

const initialState: GameState = {
    mouseX: 0,
    mouseY: 0,
    gameShapes: [],
    registeredShapesLookup: new Map(),
    totalShapes: 0,
    game: Games.pong
};

/**
 * slice to manage the state of the game for managing the objects, selected game, etc.
 */
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
        registerGameShape: (state, action: PayloadAction<BaseGameObjectProps>) => {
            if(!state.registeredShapesLookup.has(action.payload.id)){
                state.gameShapes.push(action.payload);
            }
        },
        removeGameShape: (state, action: PayloadAction<BaseGameObjectProps>) => {
            if(state.registeredShapesLookup.has(action.payload.id)){
                const {id} = action.payload;
                state.gameShapes = state.gameShapes.filter(shape => shape.id !== id);
                state.registeredShapesLookup.delete(id);
            }
        },
        resetGameShapes: (state) => {
            state.gameShapes = [];
            state.registeredShapesLookup = new Map();
        },
        setGame: (state, action: PayloadAction<Games>) => {
            state.game = action.payload;
            state.gameShapes = [];
            state.registeredShapesLookup = new Map();
            state.totalShapes = 0;
        }
    }
});

export const {
    setMousePosition, 
    registerGameShape, 
    removeGameShape, 
    resetGameShapes, 
    setGame
} = gameSlice.actions;