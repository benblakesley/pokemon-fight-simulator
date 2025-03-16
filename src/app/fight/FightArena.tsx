'use client';

import { IPokemon } from "@/models/IPokemon";
import { Box, Button, Fade, Typography } from "@mui/material";
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
            height: '100vh',  // Set the height to 100vh or any specific value
            width: '100%',    // Ensure it covers the entire width
          }}
          >
            <Fade in={showButtons && fightState === FightStates.idle} timeout={300}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography>
                        PICK YOUR WINNER!
                    </Typography>
                    <Box>
                        <Button onClick={() => onPokemonSelected(pokemonB)}>
                            {pokemonB.name}
                        </Button>
                        <Button onClick={() => onPokemonSelected(pokemonA)}>
                            {pokemonA.name}
                        </Button>
                    </Box>
                    <Typography>
                        Current Score: {progressState.currentScore}
                    </Typography>
                    <Typography>
                        High Score: {highScore}
                    </Typography>
                </Box>
            </Fade>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: 600,
                height: 600
            }}>
                <TopFightingPokemon pokemon={pokemonB} enterTime={enterTime} currentState={fightState} visible={showFightingPokemon}/>
                <BottomFightingPokemon pokemon={pokemonA} enterTime={enterTime} currentState={fightState} visible={showFightingPokemon}/>
            </Box>
        </Box>
    )
}