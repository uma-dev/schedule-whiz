import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: string;
}

const Card = ({ children, color }: Props) => {
  console.log(color);
  return (
    <div className={`bg-${color} flex flex-col rounded-lg p-7`}>{children}</div>
  );
};

export default Card;
