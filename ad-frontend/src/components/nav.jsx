export function Nav(){
    return(
        <nav className="p-4 bg-[#1E1D1D] shadow-md z-10">
            <div className="container flex items-center justify-between md:justify-end h-full text-gray-200">
                <h2 className="ml-[4rem] md:ml-6 text-lg font-bold text-gray-200 capitalize md:hidden">
                    Digital Academy
                </h2>
                <div className="rounded-full w-[32px] h-[32px]">
                    <img 
                        src="/profile-pic.png"
                        alt=""
                        className="object-cover rounded-full shadow-md"
                    />
                </div>
            </div>
        </nav>
    )
}