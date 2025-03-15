import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const enum FightStates {
    idle,
    fighting
}

export interface FightState
{
    fightState: FightStates;
}

const initialState: FightState = 
{
    fightState: FightStates.idle
}


const fightSlice = createSlice({
    name: 'fight',
    initialState: initialState,
    reducers: {
        setFightState: (state: FightState, action: PayloadAction<FightStates>) => 
        {
            state.fightState = action.payload;
        }
    }
    }
)

export const {setFightState} = fightSlice.actions;
export default fightSlice.reducer;