'use client';

import { IconButton, Tooltip } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useEffect, useRef, useState } from "react";

export const SoundToggleButton = () =>
{   
    const [active, setActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("https://eta.vgmtreasurechest.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/yzmctgipnq/1-15.%20Battle%20%28Vs.%20Trainer%29.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 1.0;
    }, []);
      
    const toggleSound = () => 
    {
        if (!audioRef.current) return;
    
        if (active) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }

        setActive(!active);
    };

    return (
        <Tooltip title={active ? 'Sound On' : 'Sound Off'}>
          <IconButton sx={{color: "white"}} onClick={toggleSound}>
            {active ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Tooltip>
      );
}