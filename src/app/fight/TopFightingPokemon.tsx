'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationType, AnimationTypeAndDuration, BaseFightingPokemonAnimations, FightingPokemon } from "./FightingPokemon"
import { FightStates } from "@/state/reducers/fightSlice";

export const TopFightingPokemonAnimations: Record<FightStates, AnimationTypeAndDuration> = 
{
    ...BaseFightingPokemonAnimations,
    [FightStates.fighting]: { animation: {x: [-150, -140, -160, -140, 0], y: [150, 140, 160, 140, 0], rotate: [0, 10, -10, 10, 0] }, duration: 1}
}

interface TopFightingPokemonProps
{
    pokemon: IPokemon;
    currentState: FightStates;
    enterTime: number;
    visible: boolean;
}

export function TopFightingPokemon({pokemon, currentState, enterTime, visible}: TopFightingPokemonProps)
{
    const animate = TopFightingPokemonAnimations[currentState];

    const sx = {width: 300, borderRadius: 2, alignSelf: "end"}
    return (
        <FightingPokemon 
            pokemon={pokemon}
            currentState={currentState}
            enterTime={enterTime}
            animate={animate}
            direction="left"
            img={pokemon.sprites.front_default}
            customSx={sx}
            visible={visible}
        />
    )
}