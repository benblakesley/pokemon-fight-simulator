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
    visible: boolean;
    size: number;
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

export function FightingPokemon({pokemon, enterTime, animate, img, customSx, direction, visible, size}: FightingPokemonProps)
{
    const sx = customSx || { width: size};

    return (
        <Slide direction={direction} key={pokemon.name} in={visible} mountOnEnter unmountOnExit timeout={{ enter: enterTime, exit: enterTime }} >
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