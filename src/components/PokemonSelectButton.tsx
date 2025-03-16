import { IPokemon } from "@/models/IPokemon";
import { Button } from "@mui/material";

interface PokemonSelectButtonProps
{
    onClick: () => void;
    pokemon: IPokemon
}

export function PokemonSelectButton({onClick, pokemon}: PokemonSelectButtonProps)
{
    return (
        <Button onClick={onClick} sx={{color: "#FFFF00", fontSize: "1.2em", fontWeight: 600}}>
                {pokemon.name}
        </Button>
    )
}