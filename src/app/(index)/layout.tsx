import { ReactNode } from "react"
import SearchInput from "./search-input"

const IndexLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <h1 className="pt-16 text-center text-4xl font-bold uppercase tracking-widest text-white">
                Pokédex
            </h1>
            <SearchInput />
            {children}
        </>
    )
}

export default IndexLayout
