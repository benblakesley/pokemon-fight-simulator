'use client';

import { PokeService } from "@/api/PokeService";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCurrentPokemon, setCurrentScore, setGameInProgress } from "@/state/reducers/progressSlice";
import { Box, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import { FightArena } from "./FightArena";

export default function FightPage()
{
    const dispatch = useAppDispatch();
    const progressState = useAppSelector(state => state.progress)
    const {currentPokemon} = progressState;
    const pokeA = currentPokemon?.pokemonA;
    const pokeB = currentPokemon?.pokemonB;

    const pokeService = PokeService.getInstance();

    const count = useRef(0);

    useEffect(() => 
    {
        const setInitFightData = async () =>
        {
            const [pokeA, pokeB] = await Promise.all([
                pokeService.getRandomPokemon(),
                pokeService.getRandomPokemon()
            ]);

            dispatch(setCurrentPokemon({pokemonA: pokeA, pokemonB: pokeB}));
            dispatch(setGameInProgress(true));
            dispatch(setCurrentScore(0));
        }


        count.current++
        setInitFightData();
    }, []);

    return(
        <Box>
            {!!pokeA && !!pokeB && <FightArena pokemonA={pokeA} pokemonB={pokeB}/>}
        </Box>
    )
}