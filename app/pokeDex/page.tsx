import CardAllPokemons from "@/components/CardAllPokemons";
import { Suspense } from "react";
import { Loading } from "./Loading";

export default function pokeDex () {


    return (
        <section className="w-full max-h-full flex flex-col justify-center items-center">
            <h2 className="text-center">PokeDex</h2>
            <div className="w-10/12 h-full flex justify-center flex-wrap gap-2">
                <Suspense fallback={<Loading/>}>
                    <CardAllPokemons/>
                </Suspense>
            </div>
        </section>
    )

} ;