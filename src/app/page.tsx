'use client';

import { PokeProxy } from "@/app/api/PokeProxy";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCurrentPokemon } from "@/state/reducers/progressSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { BattleArena } from "../battle/BattleArena";

export default function BattlePage()
{
    const dispatch = useAppDispatch();
    const progressState = useAppSelector(state => state.progress)
    const {currentPokemon, currentScore} = progressState;
    const pokeA = currentPokemon?.pokemonA;
    const pokeB = currentPokemon?.pokemonB;

    const pokeProxy = PokeProxy.getInstance();

    useEffect(() => 
    {
        const setInitBattleData = async () =>
        {
            const [pokeA, pokeB] = await Promise.all([
                pokeProxy.getRandomPokemon(),
                pokeProxy.getRandomPokemon()
            ]);

            dispatch(setCurrentPokemon({pokemonA: pokeA, pokemonB: pokeB}));
        }

        if(currentScore === 0 && !currentPokemon)
        {
            setInitBattleData();
        }
    }, []);

    return(
        <Box>
            {!!pokeA && !!pokeB && <BattleArena pokemonA={pokeA} pokemonB={pokeB}/>}
        </Box>
    )
}
