import { Loading } from "@/app/pokeDex/Loading";
import { Pokemons } from "@/types/typesGlobal";
import { Suspense } from "react";
import ButtonPagination from "./ButtonPagination";

type Props = {
    dataPokemons: Pokemons[] | [];
}

export default function CardAllPokemons ({ dataPokemons }: Props) {

        
           
    return (
        <>
            {   
                dataPokemons &&  
                dataPokemons.map(({id, name, type, image}: Pokemons)=> (
                        <article key={id}className="w-[300px] h-[250px] flex flex-col p-2 rounded-md shadow-md">
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