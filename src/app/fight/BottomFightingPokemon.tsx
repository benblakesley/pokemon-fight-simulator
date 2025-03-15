'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationTypeAndDuration, BaseFightingPokemonAnimations, FightingPokemon } from "./FightingPokemon"
import { FightStates } from "@/state/reducers/fightSlice";

export const BottomFightingPokemonAnimations: Record<FightStates, AnimationTypeAndDuration> = 
{
    ...BaseFightingPokemonAnimations,
    [FightStates.fighting]: {animation: {x: [150, 140, 160, 140, 0], y: [-150, -140, -160, -140, 0], rotate: [0, 10, -10, 10, 0]}, duration: 1}
}

interface BottomFightingPokemonProps
{
    pokemon: IPokemon;
    currentState: FightStates;
    enterTime: number;
}

export function BottomFightingPokemon({pokemon, currentState, enterTime}: BottomFightingPokemonProps)
{
    const animate = BottomFightingPokemonAnimations[currentState];

    return (
        <FightingPokemon 
            pokemon={pokemon}
            currentState={currentState}
            enterTime={enterTime}
            animate={animate}
            direction="right"
            img={pokemon.sprites.back_default}
        />
    )
}