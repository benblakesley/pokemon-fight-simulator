'use client';

import { IPokemon } from "@/models/IPokemon";
import { AnimationTypeAndDuration, BaseBattlingPokemonAnimations, BattlingPokemon } from "./BattlingPokemon"
import { BattleStates } from "@/state/reducers/battleSlice";

export 

interface TopBattlingPokemonProps
{
    pokemon: IPokemon;
    currentState: BattleStates;
    enterTime: number;
    visible: boolean;
    size: number;
    onClick: () => void;
}

export function TopBattlingPokemon({pokemon, currentState, enterTime, visible, size, onClick}: TopBattlingPokemonProps)
{
    const initMove = size/2;

    const TopBattlingPokemonAnimations: Record<BattleStates, AnimationTypeAndDuration> = 
    {
        ...BaseBattlingPokemonAnimations,
        [BattleStates.battling]: { animation: {x: [-initMove, -initMove+10, -initMove-10, -initMove+10, 0], y: [initMove, initMove-10, initMove+10, initMove-10, 0], rotate: [0, 10, -10, 10, 0] }, duration: 1}
    }

    const animate = TopBattlingPokemonAnimations[currentState];

    const sx = {width: size, borderRadius: 2, alignSelf: "end"}
    return (
        <BattlingPokemon 
            pokemon={pokemon}
            currentState={currentState}
            enterTime={enterTime}
            animate={animate}
            direction="left"
            img={pokemon.sprites.front_default}
            customSx={sx}
            visible={visible}
            size={size}
            onClick={onClick}
        />
    )
}