'use client';

import { PokeService } from "@/api/PokeService";
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

    const pokeService = PokeService.getInstance();

    useEffect(() => 
    {
        const setInitFightData = async () =>
        {
            const [pokeA, pokeB] = await Promise.all([
                pokeService.getRandomPokemon(),
                pokeService.getRandomPokemon()
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
