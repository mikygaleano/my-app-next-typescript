import { Pokemons } from "@/types/typesGlobal";

const fetching = async (): Promise<Pokemons[]> =>  {

    const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1203&offset=0`);
    try {
        if (response.ok) {
            const data = await response.json();
            return  await Promise.all(
                data.results.map(async (item: any) => {
                    const pokemon = await fetchPokemonStructure(item.url);
                    return pokemon;
                })
            );
        } else {
            throw new Error('Failed to fetch pokemon data');
        };

    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
};


export async function fetchPokemonStructure(url: string): Promise<Pokemons> {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const pokemonData = await response.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                type: pokemonData.types[0]['type'].name,
                image: pokemonData.sprites.back_default,
            };
        } else {
            throw new Error('Failed to fetch pokemon data');
        }
    } catch (error) {
        console.error('Error fetching pokemon data:', error);
        throw error;
    }
};

export async function fetchPokemons(query: string, search: string, types: string): Promise<Pokemons[] | any> {
    try {
        const results: Pokemons[] = await fetching();
        let datos: Pokemons[] = [];
        switch (query) {
            case 'all':
                datos = results;
                break;
            case 'search':
                datos = results.filter((pokemon: Pokemons | any) => 
                pokemon.name.includes(search));
                break;
            case 'types':
                datos = results.filter((pokemon: Pokemons | any) => 
                pokemon.type.includes(types));
                break;
            default:
                break;
        };
        return datos;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    };
};


