'use client';

import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";

export function DecisionInfo()
{
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'decision-info-popover' : undefined;

    const popoverText = "When a battle starts, we ask Google's Gemini who it thinks will win the battle. It often gives the correct answer with good reasoning, but sometimes it says something stupid like `charmander will easily beat squirtle because fire is super effective against water`. But this is all part of the fun.";

    return (
        <>
            <Button sx={{margin: "16px 0"}} aria-describedby={id} variant="contained" onClick={handleClick}>
                How are battles decided?
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                slotProps = {{
                    paper: {sx: {maxWidth: {md: "50%"}}
                }}}
            >
             <Typography sx={{ p: 2 }}>{popoverText}</Typography>
            </Popover>
        </>
    )
}