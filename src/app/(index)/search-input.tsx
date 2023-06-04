"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { useDebouncedCallback } from "use-debounce"

const SearchInput = () => {
    const router = useRouter()
    const [_, startTransition] = useTransition()
    const pathname = usePathname()

    const updateQueryParams = useDebouncedCallback((v: string) => {
        const params = new URLSearchParams(window.location.search)
        if (v) {
            params.set("name", v)
        } else {
            params.delete("name")
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`)
        })
    }, 300)

    return (
        <form>
            <label className="mx-auto my-4">
                <span className="sr-only">Search</span>
                <input
                    type="text"
                    name="name"
                    placeholder="Search.."
                    className="rounded-full bg-white px-4 py-2"
                    onChange={(e) => updateQueryParams(e.target.value)}
                />
            </label>
        </form>
    )
}

export default SearchInput
