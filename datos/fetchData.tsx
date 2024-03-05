import { Pokemons } from "@/types/typesGlobal";
import { promises } from "dns";
import { resolve } from "path";


export async function fetchPokemonData(url: string): Promise<Pokemons> {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const pokemonData = await response.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                type: pokemonData.types[0]['type'].name,
                image: pokemonData.sprites.other['official-artwork'].front_default,
            };
        } else {
            throw new Error('Failed to fetch pokemon data');
        }
    } catch (error) {
        console.error('Error fetching pokemon data:', error);
        throw error;
    }
}

export async function fetchPokemons(): Promise<Pokemons[]> {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10300&offset=0');
        if (response.ok) {
            const data = await response.json();
            const pokemonsData: Pokemons[] = await Promise.all(
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
}