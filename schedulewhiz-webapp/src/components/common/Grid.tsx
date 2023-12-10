import { ReactNode } from "react";
import AccountMenu from "./AccountMenu";

interface Props {
  children: ReactNode[];
}

const Grid = ({ children }: Props) => {
  return (
    <div className="flex flex-row justify-center gap-16 px-16 py-6 h-screen">
      <div className="flex h-full max-w-max">{children[0]}</div>
      <div className="w-full max-w-3xl min-w-max h-full">{children[1]}</div>
      <div className="flex flex-col w-full max-w-max h-full gap-36">
        <AccountMenu />
        {children[2]}
      </div>
    </div>
  );
};

export default Grid;
