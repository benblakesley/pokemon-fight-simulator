import { IPokemon } from "@/models/IPokemon";

interface FightWinner
{
    id: number,
    reason: string
}

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

    public getFightWinner: (pokemonA: IPokemon, pokemonB: IPokemon) => Promise<FightWinner> = async (pokemonA: IPokemon, pokemonB: IPokemon) =>
    {
        const pokemonAName = pokemonA.name;
        const pokemonBName = pokemonB.name;

        const response = await fetch(`/api/fight?pokemonA=${pokemonAName}&pokemonB=${pokemonBName}`, {method: 'POST'});

        const responseJson = await response.json();

        let innerString = responseJson.result;

        const firstBrace = innerString.indexOf('{');
        const lastBrace = innerString.lastIndexOf('}');

        innerString = innerString.substring(firstBrace, lastBrace + 1);

        //Regex for formatting
        innerString = innerString.replace(/\n$/, '');
        innerString = innerString.replace(/(\w+):/g, '"$1":');

        const innerObject = JSON.parse(innerString);

        return {
            id: innerObject.id,
            reason: innerObject.reason
        };
    }
}