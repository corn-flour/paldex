import Image from "next/image"

const Loading = () => {
    return (
        <div className="fixed left-1/2 top-1/2 flex w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8 rounded-xl border-2 border-black bg-slate-300/90 py-6">
            <Image src="/book.png" width={40} height={40} alt="" priority />
            <p className="text-lg text-slate-700">Loading...</p>
        </div>
    )
}

export default Loading
