const Navbar = () => {
    return (
        <div className="flex flex-col gap-12 bg-[#0C0B0B] rounded-lg text-slate-400 h-full p-8"> 
            <h1 className="flex flex-col text-3xl text-slate-50">Schedule  
                <span className="text-yellow-300"> Whiz</span>
            </h1>
            <ul className="flex flex-col justify-between gap-12 text-base">
                <li>Dashboard</li>
                <li>My Team</li>
                <li>Settings</li>
            </ul>

            <span>Logout</span>
        </div>
    );
}

export default Navbar;
