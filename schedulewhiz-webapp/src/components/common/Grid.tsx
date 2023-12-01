import { ReactNode } from "react";
import AccountMenu from "./AccountMenu";

interface Props {
    children : ReactNode[];
}

const Grid = ( {children}: Props ) => {
    return (
    <div className="grid grid-cols-11 gap-16 p-10 h-screen">
      <div className="col-span-2 w-full h-full">
        {children[0]} 
      </div>
      <div className="col-span-6 w-full h-full">
        {children[1]}
      </div>
      <div className="flex flex-col col-start-9 col-span-3 w-full h-full gap-16">
        <AccountMenu />
        {children[2]}
      </div>
    </div>

    );
}

export default Grid;
