import CardAllPokemons from "@/components/CardAllPokemons";
import ButtonPagination from "@/components/ButtonPagination";
import { Suspense } from "react";
import { Loading } from "./Loading";
import { fetchPokemons } from "@/datos/fetchData";
import { Pokemons } from "@/types/typesGlobal";

export default async function pokeDex ({ 
    searchParams }
    : { 
        searchParams?: {
             limit?: string;
             offset?: string   
            }
             }) {

    const { limit, offset } = searchParams;
            
    // Llama a la función fetchPokemons para obtener la lista de Pokémon
    const pokemonList: Pokemons[] = await fetchPokemons('all', 'pokachu', 'electric', `offset=${offset}&limit=${limit}`);
    

    return (
        <section className="w-full max-h-full flex flex-col gap-2 justify-center items-center">
            <h2 className="text-center">PokeDex</h2>
            <div className="w-10/12 h-full flex justify-center flex-wrap gap-2 mt-2 mb-3">
                <Suspense key={offset + limit} fallback={<Loading/>}>
                    <CardAllPokemons dataPokemons={pokemonList} />
                </Suspense>
                <div className="w-full h-[50px] flex flex-row justify-start items-center gap-5">
                    <ButtonPagination />
                </div>
            </div>
        </section>
    )

} ;