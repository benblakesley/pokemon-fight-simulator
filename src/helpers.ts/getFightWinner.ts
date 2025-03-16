import { IPokemon } from "@/models/IPokemon";

export function getFightWinner(pokemonA: IPokemon, pokemonB: IPokemon): IPokemon
{
    return Math.random() < 0.5 ? pokemonA : pokemonB;
}