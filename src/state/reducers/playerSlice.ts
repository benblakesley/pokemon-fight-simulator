import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState
{
    highScore: number;
}

const initialState: PlayerState = 
{
    highScore: 0
}

const playerSlice = createSlice({
    name: 'progress',
    initialState: initialState,
    reducers: {
        setHighScore: (state: PlayerState, action: PayloadAction<number>) => 
        {
            state.highScore = action.payload;
        }
    }
    }
)

export const {setHighScore} = playerSlice.actions;
export default playerSlice.reducer;