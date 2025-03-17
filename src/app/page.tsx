'use client';

import { useAppSelector } from "@/state/hooks";
import { Box } from "@mui/material";
import { FightArena } from "../fight/FightArena";

export default function FightPage()
{
    const progressState = useAppSelector(state => state.progress)
    const {currentPokemon} = progressState;
    const pokeA = currentPokemon?.pokemonA;
    const pokeB = currentPokemon?.pokemonB;

    return(
        <Box>
            {!!pokeA && !!pokeB && <FightArena pokemonA={pokeA} pokemonB={pokeB}/>}
        </Box>
    )
}
