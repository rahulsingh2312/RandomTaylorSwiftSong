import ts from "../../background/ts_1989.svg"
export default function Background() {
    return (
        <div className="flex justify-center items-center rounded-xl border-2 border-[#2f6e8b] h-full w-full p-8"
             style={{
                 fill: 'linear-gradient(92deg, rgba(255, 255, 255, 0.25) -43.85%, rgba(217, 217, 217, 0.10) 55.97%)',
                 strokeWidth: '1px',
                 stroke: 'rgba(255, 255, 255, 0.60)',
                 backdropFilter: 'blur(16px)',
             }}>
            <div className="flex flex-col items-center justify-center gap-6">
                <div>
                    <div className="text-2xl sm:text-4xl font-bold text-[#00344B]/90 text-center">TAYLOR'S VERSION</div>
                </div>
                {/*use api to fetch the album images*/}
                <img src={ts} alt="description"
                     height={190}
                     width={190}
                />
                <button className="bg-gradient-to-r from-[#1f5175] to-[#00344B]/80 border-2 border-[#2f6e8b]
                 text-[#DFE6E8] font-semibold rounded-md px-2 sm:px-4 sm:py-2 py-1 text-sm sm:text-xl hover:bg-[#00344B] hover:scale-110">
                    Get a Random Song
                </button>
            </div>

        </div>
    )
}
