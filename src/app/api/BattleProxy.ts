import { IPokemon } from "@/models/IPokemon";

interface BattleWinner
{
    id: number,
    reason: string
}

export class BattleProxy
{
    private static instance: BattleProxy;

    private constructor(){}

    public static getInstance(): BattleProxy
    {
        if (!BattleProxy.instance) {
            BattleProxy.instance = new BattleProxy();
        }
        return BattleProxy.instance;
    }

    public getBattleWinner: (pokemonA: IPokemon, pokemonB: IPokemon) => Promise<BattleWinner> = async (pokemonA: IPokemon, pokemonB: IPokemon) =>
    {
        const pokemonAName = pokemonA.name;
        const pokemonBName = pokemonB.name;

        const response = await fetch(`/api/battle?pokemonA=${pokemonAName}&pokemonB=${pokemonBName}`, {method: 'POST'});

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