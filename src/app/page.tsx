import { Inter } from "next/font/google"
import { z } from "zod"
import PokemonVirtualList from "./pokemon-list"

const API_ROUTE = "https://pokeapi.co/api/v2/pokedex/1/"

const OFFICIAL_ART_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

const pokedexSchema = z.object({
    pokemon_entries: z
        .object({
            entry_number: z.number(),
            pokemon_species: z.object({
                name: z.string(),
            }),
        })
        .transform(({ entry_number, pokemon_species }) => {
            const artworkURL = `${OFFICIAL_ART_URL}/${entry_number}.png`

            return {
                id: entry_number,
                name: pokemon_species.name,
                artworkURL,
            }
        })
        .array(),
})

export default async function Home() {
    const response = await fetch(API_ROUTE)

    const pokedex = pokedexSchema.parse(await response.json())

    return (
        <>
            <h1 className="pt-16 text-center text-4xl font-bold uppercase tracking-widest text-white">
                Pokédex
            </h1>

            <PokemonVirtualList data={pokedex.pokemon_entries} />
        </>
    )
}
