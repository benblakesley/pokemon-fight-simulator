'use client';

import { IPokemon } from "@/models/IPokemon";
import { Box, Fade, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { TopBattlingPokemon } from "./TopBattlingPokemon";
import { BottomBattlingPokemon } from "./BottomBattlingPokemon";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { BattleStates, setBattleState } from "@/state/reducers/battleSlice";
import { setCurrentPokemon, setCurrentScore, setLastGameTotalScore, setSelectedPokemon, setWinnerReason } from "@/state/reducers/progressSlice";
import { PokeProxy } from "@/app/api/PokeProxy";
import { setHighScore } from "@/state/reducers/playerSlice";
import { openModal } from "@/state/reducers/gameOverModalSlice";
import { BattleProxy } from "@/app/api/BattleProxy";
import { WinnerInfo } from "@/components/WinnerInfo";
import { DecisionInfo } from "@/components/DecisionInfo";

interface BattleArenaProps
{
    pokemonA: IPokemon;
    pokemonB: IPokemon;
}

export function BattleArena({pokemonA, pokemonB}: BattleArenaProps)
{
    const {battleState} = useAppSelector(state => state.battle)
    const dispatch = useAppDispatch();
    const progressState = useAppSelector(state => state.progress);
    const {currentScore, winnerReason} = progressState;
    const {highScore} = useAppSelector(state => state.player);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const pokeProxy = PokeProxy.getInstance();

    const [showBattlingPokemon, setshowBattlingPokemon] = useState<boolean>(true)
    
    const enterTime = 1500;

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowButtons(true);
        }, enterTime);
    
        return () => clearTimeout(timer);
    }, []);

    const changeBattleState = (state: BattleStates) =>
    {
        dispatch(setBattleState(state));
    };

    useEffect(() => {
        if (battleState === BattleStates.battling) 
        {
          const timeoutId = setTimeout(async () => {
            changeBattleState(BattleStates.idle);

            const handleWinner = async () => 
            {
                const {id, reason} = await BattleProxy.getInstance().getBattleWinner(pokemonA, pokemonB);

                const winner = await PokeProxy.getInstance().getPokemonById(id);
                const won = progressState.selectedPokemon?.name === winner.name;

                if(won && currentScore >= highScore)
                {
                    dispatch(setHighScore(currentScore + 1));
                }
        
                if(!won)
                {
                    dispatch(setLastGameTotalScore(currentScore))
                    dispatch(openModal())
                }

                dispatch(setWinnerReason(reason));
                dispatch(setCurrentScore( won ? currentScore + 1 : 0))
            }

            const setBattleData = async () =>
            {
                const [pokeA, pokeB] = await Promise.all([
                    pokeProxy.getRandomPokemon(),
                    pokeProxy.getRandomPokemon()
                ]);
    
                dispatch(setCurrentPokemon({pokemonA: pokeA, pokemonB: pokeB}));
            }

            await handleWinner();

            await setBattleData();

            setshowBattlingPokemon(false);
            setshowBattlingPokemon(true);
            
          }, 2500);

          return () => clearTimeout(timeoutId);
        }
      }, [battleState]);

    const onPokemonSelected = (pokemonSelected: IPokemon) =>
    {
        dispatch(setSelectedPokemon(pokemonSelected));

        changeBattleState(BattleStates.battling);
    }

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const BattleArenaSize = isSmallScreen ? 300 : 500;

    return(
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "32px"
          }}
          >
            <Fade in={showButtons && battleState === BattleStates.idle} timeout={300}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography sx={{color: "#FFFFFF", fontWeight: 800, fontSize: "2em"}}>
                        PICK YOUR WINNER!
                    </Typography>
                    <DecisionInfo/>
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
                width: BattleArenaSize,
                height: BattleArenaSize
            }}>
                <TopBattlingPokemon onClick={() => onPokemonSelected(pokemonB)} pokemon={pokemonB} enterTime={enterTime} currentState={battleState} visible={showBattlingPokemon} size={BattleArenaSize/2}/>
                <BottomBattlingPokemon onClick={() => onPokemonSelected(pokemonA)} pokemon={pokemonA} enterTime={enterTime} currentState={battleState} visible={showBattlingPokemon} size={BattleArenaSize/2}/>
            </Box>
            <Fade in={showButtons && battleState === BattleStates.idle} timeout={300}>
                <Box>
                    <WinnerInfo popoverText={winnerReason}/>
                </Box>
            </Fade>
        </Box>
    )
}