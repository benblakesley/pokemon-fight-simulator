'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationTypeAndDuration, BaseFightingPokemonAnimations, FightingPokemon } from "./FightingPokemon"
import { FightStates } from "@/state/reducers/fightSlice";


interface BottomFightingPokemonProps
{
    pokemon: IPokemon;
    currentState: FightStates;
    enterTime: number;
    visible: boolean;
    size: number;
}

export function BottomFightingPokemon({pokemon, currentState, enterTime, visible, size}: BottomFightingPokemonProps)
{   
    
    const initMove = size/2;
    const BottomFightingPokemonAnimations: Record<FightStates, AnimationTypeAndDuration> = 
    {
        ...BaseFightingPokemonAnimations,
        [FightStates.fighting]: {animation: {x: [initMove, initMove-10, initMove+10, initMove-10, 0], y: [-initMove, -initMove+10, -initMove-10, -initMove+10, 0], rotate: [0, 10, -10, 10, 0]}, duration: 1}
    }

    const animate = BottomFightingPokemonAnimations[currentState];

    return (
        <FightingPokemon 
            pokemon={pokemon}
            currentState={currentState}
            enterTime={enterTime}
            animate={animate}
            direction="right"
            img={pokemon.sprites.back_default}
            visible={visible}
            size={size}
        />
    )
}