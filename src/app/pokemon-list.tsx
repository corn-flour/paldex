"use client"

import { VirtuosoGrid } from "react-virtuoso"
import Link from "next/link"
import Image from "next/image"

// Virtualized list to render list of Pokemon entries
// use react-virtuoso underneath
const PokemonVirtualList = ({
    data,
}: {
    data: {
        id: number
        name: string
        artworkURL: string
    }[]
}) => {
    return (
        <VirtuosoGrid
            useWindowScroll
            className="bg-shelf mx-auto mt-8 box-content h-screen w-[90%] max-w-6xl px-1 pb-32"
            overscan={400}
            data={data}
            initialItemCount={12}
            listClassName="flex flex-wrap justify-center gap-x-8 gap-y-16 sm:gap-y-40"
            itemClassName="group relative transition-all hover:-translate-y-4 focus:!-translate-y-4 focus:outline-none"
            itemContent={(index) => <PokemonCard {...data[index]} />}
        />
    )
}

const PokemonCard = ({
    artworkURL,
    id,
    name,
}: {
    artworkURL: string
    id: number
    name: string
}) => {
    return (
        <Link href={`/pokemon/${id}`}>
            <div
                className="relative flex h-36 w-[7.5rem] flex-col items-center justify-end overflow-hidden bg-purple-900 group-hover:outline group-focus:outline sm:h-72 sm:w-60"
                style={{
                    boxShadow: "12px 0 12px -8px #000000dd",
                }}
            >
                <div className="absolute top-1/2 aspect-square w-[85%] -translate-y-1/2 sm:w-[95%]">
                    <Image
                        src="/pokeball.png"
                        fill
                        alt=""
                        priority
                        className="object-contain"
                        style={{
                            filter: "invert(14%) sepia(76%) saturate(4613%) hue-rotate(271deg) brightness(79%) contrast(91%)",
                        }}
                        sizes="285px"
                    />
                </div>
                <div className="relative h-[70%] w-full sm:h-4/5">
                    <Image
                        src={artworkURL}
                        fill
                        priority
                        alt={name}
                        className="object-contain sm:object-cover"
                        sizes="300px"
                    />
                </div>
                <div className="absolute -right-1 bottom-2 left-2 top-2 rounded-bl-3xl border-2 border-[#B6E12A] border-r-transparent bg-gradient-to-b from-black/40 to-transparent p-1 text-[#B6E12A] sm:-right-2 sm:bottom-5 sm:left-4 sm:top-5 sm:p-2">
                    <p className="font-mono text-sm font-bold capitalize sm:text-2xl sm:tracking-wider">
                        {name}
                    </p>
                    <p className="font-mono font-bold sm:text-xl">{id}</p>
                </div>
            </div>
            <TriangleCaret className="absolute -top-16 left-1/2 -translate-x-1/2 scale-x-[60%] scale-y-[50%] opacity-0 transition-all group-hover:-top-8 group-hover:opacity-100 group-focus:-top-8 group-focus:opacity-100" />
        </Link>
    )
}

const TriangleCaret = ({ className }: { className?: string }) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            className={className}
        >
            <defs>
                <linearGradient id="fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: "#E7F426",
                            stopOpacity: 1,
                        }}
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: "#31A9A5",
                            stopOpacity: 1,
                        }}
                    />
                </linearGradient>
            </defs>

            <path
                d="M 0 0 L 64 0 L 32 64 z"
                stroke="colourname"
                fill="url(#fill)"
            />
        </svg>
    )
}

export default PokemonVirtualList
