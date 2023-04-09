import Image from "next/image"
import { z } from "zod"
import { cva } from "class-variance-authority"

const POKEMON_ENTRY_API = "https://pokeapi.co/api/v2/pokemon"
const POKEMON_SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species"
const OFFICIAL_ART_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

const pokemonTypes = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
] as const

const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
] as const

const pokemonEntrySchema = z.object({
    id: z.number(),
    name: z.string(),
    types: z
        .object({
            slot: z.number(),
            type: z.object({
                name: z.enum(pokemonTypes),
                url: z.string(),
            }),
        })
        .array(),
    weight: z.number().transform((weight) => weight / 10), // convert from hectogram to kilogram
    height: z.number().transform((height) => height / 10), // convert from decimeter to meter
    stats: z
        .object({
            base_stat: z.number(),
            effort: z.number(),
            stat: z.object({
                name: z.enum(statNames),
                url: z.string(),
            }),
        })
        .array()
        .transform((stats) => {
            const obj = stats.reduce(
                (prev, cur) => {
                    return {
                        ...prev,
                        [cur.stat.name]: {
                            value: cur.base_stat,
                            ev: cur.effort,
                        },
                    }
                },
                {} as {
                    [k in (typeof statNames)[number]]: {
                        value: number
                        ev: number
                    }
                }
            )
            return obj
        }),
})

const pokemonSpeciesSchema = z
    .object({
        genera: z
            .object({
                genus: z.string(),
                language: z.object({
                    name: z.string(),
                }),
            })
            .array()
            .transform((genera) => {
                return genera.filter((item) => item.language.name === "en")[0]
                    .genus
            }),

        flavor_text_entries: z
            .object({
                flavor_text: z.string(),
                language: z.object({
                    name: z.string(),
                }),
            })
            .array(),
    })
    .transform((pokemonSpecies) => {
        const flavorText = pokemonSpecies.flavor_text_entries.filter(
            (item) => item.language.name === "en"
        )[0].flavor_text

        return {
            genera: pokemonSpecies.genera,
            flavorText: flavorText
                .replace("\f", "\n")
                .replace("\u00ad\n", "")
                .replace("\u00ad", "")
                .replace(" -\n", " - ")
                .replace("-\n", "-")
                .replace("\n", " ")
                .replace("POKéMON", "Pokémon"),
        }
    })

const PokemonInfoPage = async ({
    params,
}: {
    params: {
        id: string
    }
}) => {
    const pokemonResponse = await fetch(`${POKEMON_ENTRY_API}/${params.id}`)
    const pokemonSpeciesResponse = await fetch(
        `${POKEMON_SPECIES_API}/${params.id}`
    )

    const pokemonEntry = pokemonEntrySchema.parse(await pokemonResponse.json())
    const pokemonSpecies = pokemonSpeciesSchema.parse(
        await pokemonSpeciesResponse.json()
    )

    return (
        <>
            <div className="flex items-center gap-2 border-b-4 border-yellow-400 bg-white px-4 py-2">
                <Image src="/book.png" width={20} height={20} alt="" />
                <p className="text-xl font-semibold text-slate-900">Pokédex</p>
            </div>

            <section className="flex flex-1 items-center justify-center gap-4 bg-gradient-to-b from-blue-800 to-blue-600 px-12 py-6 text-white">
                <div className="">
                    <p className="text-lg">No. {pokemonEntry.id}</p>
                    <h1 className="mt-4 text-4xl font-semibold capitalize">
                        {pokemonEntry.name}
                    </h1>
                    <p className="mt-4 text-lg">{pokemonSpecies.genera}</p>

                    <div className="mt-2 flex gap-4">
                        {pokemonEntry.types
                            .sort((a, b) => a.slot - b.slot)
                            .map(({ type }) => (
                                <TypeDisplay key={type.name} type={type.name} />
                            ))}
                    </div>

                    <p className="mt-4 text-xl">{pokemonSpecies.flavorText}</p>
                </div>
                <div className="">
                    <Image
                        src={`${OFFICIAL_ART_URL}/${pokemonEntry.id}.png`}
                        alt=""
                        width={350}
                        height={350}
                    />
                </div>
            </section>
            <div className="h-14 border-t-4 border-yellow-400 bg-white"></div>
        </>
    )
}

type PokemonType = (typeof pokemonTypes)[number]

const typeDisplayCVA = cva(
    "rounded-full inline-flex w-32 items-center text-white px-2 uppercase",
    {
        variants: {
            type: {
                normal: "bg-gray-500",
                fighting: "bg-orange-500",
                flying: "bg-sky-500",
                poison: "bg-fuchsia-900",
                ground: "bg-amber-600",
                rock: "bg-[#92874B]",
                bug: "bg-lime-700",
                ghost: "bg-purple-900",
                steel: "bg-cyan-600",
                fire: "bg-red-500",
                water: "bg-blue-600",
                grass: "bg-green-600",
                electric: "bg-yellow-600",
                psychic: "bg-pink-600",
                ice: "bg-cyan-500",
                dragon: "bg-indigo-600",
                dark: "bg-[#50413F]",
                fairy: "bg-fuchsia-600",
            },
        },
    }
)

const TypeDisplay = ({ type }: { type: PokemonType }) => {
    return (
        <span
            className={typeDisplayCVA({
                type,
            })}
        >
            <Image src={`/types/${type}.png`} alt="" width={20} height={20} />
            <span className="flex-1 px-1 text-center">{type}</span>
        </span>
    )
}

export default PokemonInfoPage
