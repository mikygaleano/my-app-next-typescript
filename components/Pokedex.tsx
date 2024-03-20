'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardAllPokemons from "@/components/CardAllPokemons";
import ButtonPagination from "@/components/ButtonPagination";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { fetchPokemons } from "@/datos/fetchData";
import { Pokemons } from "@/types/typesGlobal";

export default function PokeDex (): JSX.Element {

    let search: string | null = useSearchParams().get('page');
    let page: number = Number(search);

    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [countPage, setCountPage] = useState<number>(page);
    const [calculatedTotalPages, setCalculatedTotalPages] = useState<number>(0);
    const [filterPokemons, setFilterPokemons] = useState<Pokemons[]>([]);

    useEffect(() => {
        // Calcula el nuevo valor de offset
        const newOffset = (countPage - 1) * limit;
        setOffset(newOffset);
        setLimit(prev => prev +10)

        // Actualiza la lista de pokemons filtrados según el nuevo offset y límite
        const newPokemonsPagination = filterPokemons.slice(offset, offset + limit);
        setFilterPokemons(newPokemonsPagination);

        // Calcula el número total de páginas
        const totalLengthPokemons = filterPokemons.length;
        const newTotalPages = Math.ceil(totalLengthPokemons / limit);
        setCalculatedTotalPages(newTotalPages);
    }, [page, offset, limit, filterPokemons]);

    useEffect(() => {
        const fetchData = async () => {
            // Llama a la función para obtener la lista de pokemons
            const query = 'all';
            const search = 'pikachu';
            const types = 'electric';
            const pokemons = await fetchPokemons(query, search, types);
            setFilterPokemons(pokemons);
        };

        fetchData();
    }, []);
    
    

    return (
        
        <div className="w-10/12 h-full flex justify-center flex-wrap gap-2 mt-2 mb-3">
            <Suspense key={offset} fallback={<Loading/>}>
                <CardAllPokemons dataPokemons={filterPokemons}/>
            </Suspense>
            <div className="w-full h-[50px] flex flex-row justify-start items-center gap-5">
                <ButtonPagination/>
                <div>
                    <span>Pagina: {page} de {calculatedTotalPages}</span>
                </div>
            </div>
        </div>
    )

} ;