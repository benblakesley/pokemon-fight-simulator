export async function GET(request: Request) {
    try 
    {  
        const url = new URL(request.url);
        
        const id = url.searchParams.get('id');
            
        const pokemonJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
        const pokemon = await pokemonJson.json();

        return new Response(JSON.stringify({pokemon: pokemon}), { status: 200 });

    } catch (error) 
    {
        return new Response("Error fetching Pokémon", { status: 500 });
    }
  }