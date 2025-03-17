import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try 
    {  
        const url = new URL(request.url);
        
        const id = url.searchParams.get('id');
            
        const pokemonJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
        const pokemon = await pokemonJson.json();

        return new NextResponse(JSON.stringify({pokemon: pokemon}), { status: 200 });

    } catch
    {
        return new NextResponse("Error fetching Pokémon");
    }
  }