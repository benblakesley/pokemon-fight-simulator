'use client';

import { IPokemon } from "@/models/IPokemon";
import { Box, Button, Container, Fade, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TopFightingPokemon } from "./TopFightingPokemon";
import { BottomFightingPokemon } from "./BottomFightingPokemon";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { FightStates, setFightState } from "@/state/reducers/fightSlice";
import { setCurrentPokemon, setCurrentScore, setSelectedPokemon } from "@/state/reducers/progressSlice";
import { getFightWinner } from "../helpers.ts/getFightWinner";
import { PokeService } from "@/api/PokeService";
import { setHighScore } from "@/state/reducers/playerSlice";

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
            if(won && currentScore >= highScore)
            {
                dispatch(setHighScore(currentScore + 1));
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
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: 600
            }}>
                <TopFightingPokemon pokemon={pokemonB} enterTime={enterTime} currentState={fightState}/>
                <BottomFightingPokemon pokemon={pokemonA} enterTime={enterTime} currentState={fightState}/>
            </Box>
            <Fade in={showButtons && fightState === FightStates.idle} mountOnEnter unmountOnExit timeout={300}>
                <Box>
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
        </Container>
    )
}