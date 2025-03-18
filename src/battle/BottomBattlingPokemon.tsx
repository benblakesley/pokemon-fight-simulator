'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationTypeAndDuration, BaseBattlingPokemonAnimations, BattlingPokemon } from "./BattlingPokemon"
import { BattleStates } from "@/state/reducers/battleSlice";


interface BottomBattlingPokemonProps
{
    pokemon: IPokemon;
    currentState: BattleStates;
    enterTime: number;
    visible: boolean;
    size: number;
    onClick: () => void;
}

export function BottomBattlingPokemon({pokemon, currentState, enterTime, visible, size, onClick}: BottomBattlingPokemonProps)
{   
    
    const initMove = size/2;
    const BottomBattlingPokemonAnimations: Record<BattleStates, AnimationTypeAndDuration> = 
    {
        ...BaseBattlingPokemonAnimations,
        [BattleStates.battling]: {animation: {x: [initMove, initMove-10, initMove+10, initMove-10, 0], y: [-initMove, -initMove+10, -initMove-10, -initMove+10, 0], rotate: [0, 10, -10, 10, 0]}, duration: 1}
    }

    const animate = BottomBattlingPokemonAnimations[currentState];

    return (
        <BattlingPokemon 
            pokemon={pokemon}
            currentState={currentState}
            enterTime={enterTime}
            animate={animate}
            direction="right"
            img={pokemon.sprites.back_default}
            visible={visible}
            size={size}
            onClick={onClick}
        />
    )
}