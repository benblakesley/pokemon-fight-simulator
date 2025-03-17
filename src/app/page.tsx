'use client';

import { PokeProxy } from "@/app/api/PokeProxy";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCurrentPokemon } from "@/state/reducers/progressSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { FightArena } from "../fight/FightArena";

export default function FightPage()
{
    const dispatch = useAppDispatch();
    const progressState = useAppSelector(state => state.progress)
    const {currentPokemon, currentScore} = progressState;
    const pokeA = currentPokemon?.pokemonA;
    const pokeB = currentPokemon?.pokemonB;

    const pokeProxy = PokeProxy.getInstance();

    useEffect(() => 
    {
        const setInitFightData = async () =>
        {
            const [pokeA, pokeB] = await Promise.all([
                pokeProxy.getRandomPokemon(),
                pokeProxy.getRandomPokemon()
            ]);

            dispatch(setCurrentPokemon({pokemonA: pokeA, pokemonB: pokeB}));
        }

        if(currentScore === 0)
        {
            setInitFightData();
        }
    }, []);

    return(
        <Box>
            {!!pokeA && !!pokeB && <FightArena pokemonA={pokeA} pokemonB={pokeB}/>}
        </Box>
    )
}
