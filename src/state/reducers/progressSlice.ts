import { IPokemon } from '@/models/IPokemon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState
{
    currentScore: number;
    currentPokemon: {pokemonA: IPokemon, pokemonB: IPokemon} | undefined;
    selectedPokemon: IPokemon | undefined;
    lastGameTotalScore: number;
    winnerReason: string;
};

const initialState: ProgressState = 
{
    currentScore: 0,
    currentPokemon: undefined,
    selectedPokemon: undefined,
    lastGameTotalScore: 0,
    winnerReason: ""
};

const progressSlice = createSlice({
  name: 'progress',
  initialState: initialState,
  reducers: {
    setCurrentScore: (state: ProgressState, action: PayloadAction<number>) =>
    {
        state.currentScore = action.payload;
    },
    incrementCurrentScore: (state: ProgressState) =>
    {
        state.currentScore++;
    },
    setCurrentPokemon: (state: ProgressState, action: PayloadAction<{pokemonA: IPokemon, pokemonB: IPokemon}>) =>
    {
        const {pokemonA, pokemonB} = action.payload;
        state.currentPokemon =  {pokemonA: pokemonA, pokemonB: pokemonB};
    },
    setSelectedPokemon: (state: ProgressState, action: PayloadAction<IPokemon>) =>
    {
        state.selectedPokemon = action.payload;
    },
    setLastGameTotalScore: (state: ProgressState, action: PayloadAction<number>) =>
    {
        state.lastGameTotalScore = action.payload;
    },
    setWinnerReason: (state: ProgressState, action: PayloadAction<string>) =>
    {
        state.winnerReason = action.payload;
    },
  },
});

export const {setWinnerReason, setLastGameTotalScore, setCurrentScore, incrementCurrentScore, setCurrentPokemon, setSelectedPokemon} = progressSlice.actions;
export default progressSlice.reducer;