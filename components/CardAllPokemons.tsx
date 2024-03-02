'use client'
import { useEffect, useState } from "react"





export default function CardAllPokemons (): JSX.Element {

    interface TypePokemons {
        name: string
    }

    const [ pokemonsData, setPokemonsData ] = useState<Array<TypePokemons>>([]);

    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon');
                if (response.ok) {
                    const data: [] = await response.json();
                    setPokemonsData(data.results.map((item: any) => ({ name: item.name })));
                } else {
                    throw new Error('Failed to fetch data');
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            {
                pokemonsData &&
                pokemonsData.map((items, index)=> (
                    <article key={index}>
                        <figure>
                        </figure>
                        <footer>
                            <span>{items.name}</span>
                        </footer>
                    </article>
                ))
            }
        </div>
    )
};