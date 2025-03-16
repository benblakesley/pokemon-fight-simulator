'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationTypeAndDuration, BaseFightingPokemonAnimations, FightingPokemon } from "./FightingPokemon"
import { FightStates } from "@/state/reducers/fightSlice";

export 

interface TopFightingPokemonProps
{
    pokemon: IPokemon;
    currentState: FightStates;
    enterTime: number;
    visible: boolean;
    size: number;
}

export function TopFightingPokemon({pokemon, currentState, enterTime, visible, size}: TopFightingPokemonProps)
{
    const initMove = size/2;

    const TopFightingPokemonAnimations: Record<FightStates, AnimationTypeAndDuration> = 
    {
        ...BaseFightingPokemonAnimations,
        [FightStates.fighting]: { animation: {x: [-initMove, -initMove+10, -initMove-10, -initMove+10, 0], y: [initMove, initMove-10, initMove+10, initMove-10, 0], rotate: [0, 10, -10, 10, 0] }, duration: 1}
    }

    const animate = TopFightingPokemonAnimations[currentState];

    const sx = {width: size, borderRadius: 2, alignSelf: "end"}
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
            size={size}
        />
    )
}