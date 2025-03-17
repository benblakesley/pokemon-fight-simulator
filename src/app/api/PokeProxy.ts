import { IPokemon } from "@/models/IPokemon";

export class PokeProxy
{
    private static instance: PokeProxy;

    private constructor(){}

    public static getInstance(): PokeProxy
    {
        if (!PokeProxy.instance) {
            PokeProxy.instance = new PokeProxy();
        }
        return PokeProxy.instance;
    }

    public getRandomPokemon: () =>  Promise<IPokemon> = async () =>
    {
        const randomNumber = Math.floor(Math.random() * 1025) + 1;

        const response = await fetch(`/api/pokemon?id=${randomNumber}`);

        const randomPoke = await response.json();

        const result = randomPoke.pokemon;

        return result;
    }

    public getPokemonById: (id: number) =>  Promise<IPokemon> = async (id: number) =>
    {
        const response = await fetch(`/api/pokemon?id=${id}`);

        const randomPoke = await response.json();

        const result = randomPoke.pokemon;

        return result;
    }
}