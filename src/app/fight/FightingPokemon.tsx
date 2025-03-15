'use client';

import { IPokemon } from "@/models/IPokemon";
import { FightStates } from "@/state/reducers/fightSlice";
import { Box, Slide, SxProps, Theme } from "@mui/material";
import { AnimationControls, motion, TargetAndTransition, VariantLabels } from "framer-motion";

interface FightingPokemonProps
{
    pokemon: IPokemon;
    currentState: FightStates;
    enterTime: number;
    animate?: AnimationTypeAndDuration
    img: string;
    direction: "left" | "right";
    customSx?: SxProps<Theme>;
}

export const BaseFightingPokemonAnimations: Omit<Record<FightStates, AnimationTypeAndDuration>, FightStates.fighting> = 
{
    [FightStates.idle]: {animation: {}, duration: 0},
}

export type AnimationType = boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined;

export interface AnimationTypeAndDuration
{
    animation: AnimationType,
    duration: number;
}

export function FightingPokemon({enterTime, animate, img, customSx, direction}: FightingPokemonProps)
{
    const sx = customSx || { width: 300};
    
    return (
        <Slide direction={direction} in mountOnEnter unmountOnExit timeout={enterTime}>
            <Box
                component={motion.img}
                src={img}
                sx= {sx}
                animate={animate?.animation}
                transition={{duration: animate?.duration}}
            />
        </Slide>
    )
}