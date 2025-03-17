'use client';

import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";

interface WinnerInfoProps
{
    popoverText: string;
}

export function WinnerInfo({popoverText}: WinnerInfoProps)
{
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                How was the previous fight decided?
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
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
             <Typography sx={{ p: 2 }}>{!!popoverText ?  popoverText : 'No Previous Fight'}</Typography>
            </Popover>
        </>
    )
}