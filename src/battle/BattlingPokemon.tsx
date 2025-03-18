'use client';

import { IPokemon } from "@/models/IPokemon";
import { BattleStates } from "@/state/reducers/battleSlice";
import { Box, Slide, SxProps, Theme } from "@mui/material";
import { AnimationControls, motion, TargetAndTransition, VariantLabels } from "framer-motion";

interface BattlingPokemonProps
{
    pokemon: IPokemon;
    currentState: BattleStates;
    enterTime: number;
    animate?: AnimationTypeAndDuration
    img: string;
    direction: "left" | "right";
    customSx?: SxProps<Theme>;
    visible: boolean;
    size: number;
    onClick: () => void;
}

export const BaseBattlingPokemonAnimations: Omit<Record<BattleStates, AnimationTypeAndDuration>, BattleStates.battling> = 
{
    [BattleStates.idle]: {animation: {}, duration: 0},
}

export type AnimationType = boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;

export interface AnimationTypeAndDuration
{
    animation: AnimationType,
    duration: number;
}

export function BattlingPokemon({pokemon, enterTime, animate, img, customSx, direction, visible, size, onClick}: BattlingPokemonProps)
{
    const sx = customSx || { width: size};

    return (
        <Slide direction={direction} key={pokemon.name} in={visible} mountOnEnter unmountOnExit timeout={{ enter: enterTime, exit: enterTime }} >
            <Box
                component={motion.img}
                src={img}
                sx= {{...sx, cursor: "pointer"}}
                animate={animate?.animation}
                transition={{duration: animate?.duration}}
                onClick={onClick}
            />
        </Slide>
    )
}