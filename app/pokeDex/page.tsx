import CardAllPokemons from "@/components/CardAllPokemons";

export default function pokeDex (): JSX.Element {


    return (
        <section className="w-full max-h-full">
            <h2 className="text-center">PokeDex</h2>
            <div className=" w-10/12 h-full">
                <CardAllPokemons/>
            </div>
        </section>
    )

} ;