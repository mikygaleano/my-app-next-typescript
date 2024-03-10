import { Pokemons } from "@/types/typesGlobal";



export async function fetchPokemonData(url: string): Promise<Pokemons> {
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

export async function fetchPokemons(query: string, search: string, types: string, page: string | undefined): Promise<Pokemons[]> {

    let response: Response; 
    let pokemonsData: Pokemons[];

        switch (query) {
            case 'all':
                response = await fetch(`https://pokeapi.co/api/v2/pokemon?${page}`);
                try {
                    if (response.ok) {
                        const data = await response.json();
                        pokemonsData = await Promise.all(
                            data.results.map(async (item: any) => {
                                const pokemon = await fetchPokemonData(item.url);
                                return pokemon;
                            })
                        );
                        return pokemonsData;
                    } else {
                        throw new Error('Failed to fetch pokemon data');
                    }

                } catch (error) {
                    console.error('Error fetching pokemons:', error);
                    throw error;
                }
            case 'search':
                response = await fetch(`https://pokeapi.co/api/v2/pokemon?${page}`);
                try {
                    if (response.ok) {
                        const data = await response.json();
                        pokemonsData = await Promise.all(
                            data.results.map(async (item: any) => {
                                const pokemon = await fetchPokemonData(item.url);
                                return pokemon;
                            })
                        );
                        return pokemonsData.filter(pokemon=> pokemon.name.includes(search));
                    } else {
                        throw new Error('Failed to fetch pokemon data');
                    }

                } catch (error) {
                    console.error('Error fetching pokemons:', error);
                    throw error;
                }
                case 'types':
                    response = await fetch(`https://pokeapi.co/api/v2/pokemon?${page}`);
                    try {
                        if (response.ok) {
                            const data = await response.json();
                            pokemonsData = await Promise.all(
                                data.results.map(async (item: any) => {
                                    const pokemon = await fetchPokemonData(item.url);
                                    return pokemon;
                                })
                            );
                            return pokemonsData.filter(pokemon=> pokemon.type.includes(types));
                        } else {
                            throw new Error('Failed to fetch pokemon data');
                        }
    
                    } catch (error) {
                        console.error('Error fetching pokemons:', error);
                        throw error;
                    }
             default:
                return [];
        };

};

export function pokemonsPagination (listPokemons: Pokemons[], offset, limit): Pokemons[] {
    
    let pagination = listPokemons.slice(offset, limit);

    return pagination
}