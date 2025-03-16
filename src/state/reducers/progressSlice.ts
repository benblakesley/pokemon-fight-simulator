import { IPokemon } from '@/models/IPokemon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState
{
    isGameInProgress: boolean;
    currentScore: number;
    currentPokemon: {pokemonA: IPokemon, pokemonB: IPokemon} | undefined;
    selectedPokemon: IPokemon | undefined;
};

const initialState: ProgressState = 
{
    isGameInProgress: false,
    currentScore: 0,
    currentPokemon: undefined,
    selectedPokemon: undefined
};

const progressSlice = createSlice({
  name: 'progress',
  initialState: initialState,
  reducers: {
    setGameInProgress: (state: ProgressState, action: PayloadAction<boolean>) =>
    {
        state.isGameInProgress = action.payload;
    },
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
    }
  },
});

export const {setGameInProgress, setCurrentScore, incrementCurrentScore, setCurrentPokemon, setSelectedPokemon} = progressSlice.actions;
export default progressSlice.reducer;