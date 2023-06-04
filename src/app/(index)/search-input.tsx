const SearchInput = () => {
    return (
        <form>
            <label className="mx-auto my-4">
                <span className="sr-only">Search</span>
                <input
                    type="text"
                    name="name"
                    placeholder="Search.."
                    className="rounded-full bg-white px-4 py-2"
                />
            </label>
        </form>
    )
}

export default SearchInput
