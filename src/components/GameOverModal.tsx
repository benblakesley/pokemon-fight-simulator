'use client';

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { closeModal } from "@/state/reducers/gameOverModalSlice";
import { Box, Button, Modal, Typography } from "@mui/material";
import Link from "next/link";

export function GameOverModal()
{
    const dispatch = useAppDispatch();

    const {open} = useAppSelector(state => state.modal);

    return (
            <Modal open={open} onClose={() => dispatch(closeModal())}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    >
                    <Typography>
                        Game Over
                    </Typography>
                    <Box>
                        <Link href="/fight">
                            <Button onClick={() => dispatch(closeModal())}>
                                Play Again
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button onClick={() => dispatch(closeModal())}>
                                Home
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Modal>
    )
}