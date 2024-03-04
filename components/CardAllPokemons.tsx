'use client'

import { useEffect, useState } from "react";

export default function CardAllPokemons (): JSX.Element {

    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

    interface Pokemon {
        id: number;
        name: string;
        types: string;
        image: string;
    }

    class ConstructPokemons {
        constructor({
            id,
            name,
            types,
            image
        }: Pokemon) {
            this.id = id;
            this.name = name;
            this.types = types;
            this.image = image;
        }
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                // Obtener datos del Local Storage
                const localStorageData = localStorage.getItem('datosCacheados');
                
                if (localStorageData) {
                    // Si hay datos en el Local Storage, establecerlos como el estado inicial
                    setPokemons(JSON.parse(localStorageData));
                } else {
                    // Si no hay datos en el Local Storage, realizar la solicitud a la API
                    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10300&offset=0');
                    if (response.ok) {
                        const data = await response.json();
                        const pokemonsData: Pokemon[] = await Promise.all(data.results.map(async (item: any) => {
                            const response = await fetch(item.url);
                            if (response.ok) {
                                const pokemonData = await response.json();
                                return new ConstructPokemons({
                                    id: pokemonData.id,
                                    name: pokemonData.name,
                                    types: pokemonData.types[0]['type'].name,
                                    image: pokemonData.sprites.other["official-artwork"].front_default
                                });
                            }
                            throw new Error('Failed to fetch pokemon data');
                        }));
                        setPokemons(pokemonsData);

                        // Guardar en el Local Storage
                        localStorage.setItem('datosCacheados', JSON.stringify(pokemonsData));
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            {
                pokemons && pokemons.map(pokemon => (
                    <article key={pokemon.id}>
                        <figure>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </figure>
                        <footer>
                            <span>{pokemon.name}</span>
                            <span>{pokemon.types}</span>
                        </footer>
                    </article>
                ))
            }
        </div>
    )
};