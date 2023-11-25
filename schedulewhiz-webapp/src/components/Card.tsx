import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: string;
}

const Card = ({ children, color }: Props) => {
  console.log(color);
  return (
    <div className={`bg-${color} h-fit rounded-xl p-7 shadow-lg`}>
      {children}
    </div>
  );
};

export default Card;
