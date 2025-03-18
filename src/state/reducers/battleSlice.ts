import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const enum BattleStates {
    idle,
    battling
}

export interface BattleState
{
    battleState: BattleStates;
}

const initialState: BattleState = 
{
    battleState: BattleStates.idle
}


const battleSlice = createSlice({
    name: 'battle',
    initialState: initialState,
    reducers: {
        setBattleState: (state: BattleState, action: PayloadAction<BattleStates>) => 
        {
            state.battleState = action.payload;
        }
    }
    }
)

export const {setBattleState} = battleSlice.actions;
export default battleSlice.reducer;