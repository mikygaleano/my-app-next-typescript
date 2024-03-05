import { fetchPokemons } from "@/datos/fetchData";
import { Pokemons } from "@/types/typesGlobal";


export default async function CardAllPokemons () {

    const currentPokemon = await fetchPokemons();

    return (
        <>
            {     
               currentPokemon.map(({id, name, type, image}: Pokemons)=> (
                    <article key={id} className="w-[300px] h-[250px] flex flex-col p-2 rounded-md shadow-md">
                        <figure className="w-full h-3/4">
                            <img className="w-full h-full object-contain" src={image} alt={name} />
                        </figure>
                        <footer className="border-t-1 grid place-content-start">
                            <span className="max-w-[80px] text-sm">{name}</span>
                            <span className="max-w-[80px] text-sm">{type}</span>
                        </footer>
                    </article>
               )) 
                
            }
        </>
    )
};