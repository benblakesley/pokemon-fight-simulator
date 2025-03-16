'use client';

import { IPokemon } from "@/models/IPokemon";
import { Box, Fade, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { TopFightingPokemon } from "./TopFightingPokemon";
import { BottomFightingPokemon } from "./BottomFightingPokemon";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { FightStates, setFightState } from "@/state/reducers/fightSlice";
import { setCurrentPokemon, setCurrentScore, setSelectedPokemon } from "@/state/reducers/progressSlice";
import { getFightWinner } from "../helpers.ts/getFightWinner";
import { PokeService } from "@/api/PokeService";
import { setHighScore } from "@/state/reducers/playerSlice";
import { openModal } from "@/state/reducers/gameOverModalSlice";
import { PokemonSelectButton } from "@/components/PokemonSelectButton";

interface FightArenaProps
{
    pokemonA: IPokemon;
    pokemonB: IPokemon;
}

export function FightArena({pokemonA, pokemonB}: FightArenaProps)
{
    const {fightState} = useAppSelector(state => state.fight)
    const dispatch = useAppDispatch();
    const progressState = useAppSelector(state => state.progress);
    const {currentScore} = progressState;
    const {highScore} = useAppSelector(state => state.player);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const pokeService = PokeService.getInstance();

    const [showFightingPokemon, setShowFightingPokemon] = useState<boolean>(true)
    
    const enterTime = 1500;

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowButtons(true);
        }, enterTime);
    
        return () => clearTimeout(timer);
    }, []);

    const changeFightState = (state: FightStates) =>
    {
        dispatch(setFightState(state));
    };

    useEffect(() => {
        if (fightState === FightStates.fighting) 
        {
          const timeoutId = setTimeout(() => {
            changeFightState(FightStates.idle);

            const winner = getFightWinner(pokemonA, pokemonB)
            const won = progressState.selectedPokemon?.name === winner.name;

            const setFightData = async () =>
            {
                const [pokeA, pokeB] = await Promise.all([
                    pokeService.getRandomPokemon(),
                    pokeService.getRandomPokemon()
                ]);
    
                dispatch(setCurrentPokemon({pokemonA: pokeA, pokemonB: pokeB}));
            }

            setFightData();

            setShowFightingPokemon(false);
            setShowFightingPokemon(true);
            
            if(won && currentScore >= highScore)
            {
                dispatch(setHighScore(currentScore + 1));
            }

            if(!won)
            {
                dispatch(openModal())
            }
            dispatch(setCurrentScore( won ? currentScore + 1 : 0))
          }, 2500);

          return () => clearTimeout(timeoutId);
        }
      }, [fightState]);

    const onPokemonSelected = (pokemonSelected: IPokemon) =>
    {
        dispatch(setSelectedPokemon(pokemonSelected));

        changeFightState(FightStates.fighting);
    }

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fightArenaSize = isSmallScreen ? 400 : 600;

    return(
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: 'url(/fightArena.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100%',
          }}
          >
            <Fade in={showButtons && fightState === FightStates.idle} timeout={300}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography sx={{color: "#FFFFFF", fontWeight: 800, fontSize: "2em"}}>
                        PICK YOUR WINNER!
                    </Typography>
                    <Box>
                        <PokemonSelectButton onClick={() => onPokemonSelected(pokemonA)} pokemon={pokemonA}/>
                        <PokemonSelectButton onClick={() => onPokemonSelected(pokemonB)} pokemon={pokemonB}/>
                    </Box>
                    <Typography sx={{color: "#FFFFFF", fontWeight: 600, fontSize: "1.5em"}}>
                        Current Score: {progressState.currentScore}
                    </Typography>
                    <Typography sx={{color: "#FFFFFF", fontWeight: 500, fontSize: "1.2em"}}>
                        High Score: {highScore}
                    </Typography>
                </Box>
            </Fade>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: fightArenaSize,
                height: fightArenaSize
            }}>
                <TopFightingPokemon pokemon={pokemonB} enterTime={enterTime} currentState={fightState} visible={showFightingPokemon} size={fightArenaSize/2}/>
                <BottomFightingPokemon pokemon={pokemonA} enterTime={enterTime} currentState={fightState} visible={showFightingPokemon} size={fightArenaSize/2}/>
            </Box>
        </Box>
    )
}