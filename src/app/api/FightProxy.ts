import { IPokemon } from "@/models/IPokemon";

export class FightProxy
{
    private static instance: FightProxy;

    private constructor(){}

    public static getInstance(): FightProxy
    {
        if (!FightProxy.instance) {
            FightProxy.instance = new FightProxy();
        }
        return FightProxy.instance;
    }

    public getFightWinnerId: (pokemonA: IPokemon, pokemonB: IPokemon) =>  Promise<number> = async (pokemonA: IPokemon, pokemonB: IPokemon) =>
    {
        const pokemonAName = pokemonA.name;
        const pokemonBName = pokemonB.name;

        const response = await fetch(`/api/fight?pokemonA=${pokemonAName}&pokemonB=${pokemonBName}`, {method: 'POST'});

        const responseJson= await response.json();

        const id = Number(responseJson.result);

        return id;
    }
}