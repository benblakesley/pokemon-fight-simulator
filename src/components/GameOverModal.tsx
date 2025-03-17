'use client';

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { closeModal } from "@/state/reducers/gameOverModalSlice";
import { Box, Button, Modal, Typography } from "@mui/material";

export function GameOverModal()
{
    const dispatch = useAppDispatch();

    const {open} = useAppSelector(state => state.modal);
    const {lastGameTotalScore} = useAppSelector(state => state.progress)

    return (
            <Modal open={open} onClose={() => dispatch(closeModal())}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        height: 400,
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundImage: 'url(/pikachu.avif)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    >
                    <Typography sx = {{fontSize: "2.5em", fontWeight: 800}}>
                        Game Over!
                    </Typography>
                    <Typography sx = {{fontSize: "1.5em", fontWeight: 600}}>
                        You scored {lastGameTotalScore}
                    </Typography>
                    <Box>
                        <Button onClick={() => dispatch(closeModal())}
                            sx={{fontSize: "1.3em", fontWeight: 600}}>
                            Play Again
                        </Button>
                    </Box>
                </Box>
            </Modal>
    )
}