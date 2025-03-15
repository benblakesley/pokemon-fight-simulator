import { IPokemon } from "@/models/IPokemon";

export class PokeService
{
    private static instance: PokeService;

    private constructor(){}

    public static getInstance(): PokeService
    {
        if (!PokeService.instance) {
            PokeService.instance = new PokeService();
        }
        return PokeService.instance;
    }

    public getRandomPokemon:  () =>  Promise<IPokemon> = async () =>
    {
        const randomNumber = Math.floor(Math.random() * 151) + 1;

        const randomPokeJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);

        const randomPoke = await randomPokeJson.json() as IPokemon;

        return randomPoke;
    }

    public getPokemonById: (id: number) =>  Promise<IPokemon> = async (id: number) =>
    {
        const randomPokeJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const pokemon = await randomPokeJson.json() as IPokemon;

        return pokemon;
    }
}