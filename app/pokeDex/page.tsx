import CardAllPokemons from "@/components/CardAllPokemons";
import ButtonPagination from "@/components/ButtonPagination";
import { Suspense } from "react";
import { fetchPokemons } from "@/datos/fetchData";
import { Pokemons } from "@/types/typesGlobal";
import Loading from "@/components/Loading";

export default async function pokeDex ({ 
    searchParams }
    : { 
        searchParams?: {
            page?: number;
            offset?: number;
            limit?: number
        }
            }): Promise<JSX.Element> {

    const { page, offset, limit } = searchParams;

    

    let query = 'types';
    let search = 'pikachu';
    let types = 'electric';

    const filterPokemons: Pokemons[] = await fetchPokemons(query, search, types);
    
    let pokemonsPagination: Pokemons[] = filterPokemons.slice(offset, limit || 10);

    
    let totalLengthPokemons: number = filterPokemons.length;
    let calculatedTotalPages: number = Math.ceil(totalLengthPokemons / 10);
    
    

    return (
        <section className="w-full max-h-full flex flex-col gap-2 justify-center items-center">
            <h2 className="text-center">PokeDex</h2>
            <div className="w-10/12 h-full flex justify-center flex-wrap gap-2 mt-2 mb-3">
                <Suspense key={pokemonsPagination + page + offset + limit} fallback={<Loading/>}>
                    <CardAllPokemons dataPokemons={pokemonsPagination}/>
                </Suspense>
                <div className="w-full h-[50px] flex flex-row justify-start items-center gap-5">
                    <ButtonPagination/>
                    <div>
                        <span>Pagina: {page || 1} de {calculatedTotalPages > 0? calculatedTotalPages: 'Calculando...'}</span>
                    </div>
                </div>
            </div>
        </section>
    )

} ;