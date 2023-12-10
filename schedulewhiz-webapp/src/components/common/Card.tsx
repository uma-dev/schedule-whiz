import { ReactNode} from "react";

interface Props {
  children: ReactNode;
  color?: string;
}

const Card = ({ children, color }: Props ) => {
   
  return (
    <div className={`bg-${color} h-fit rounded-xl p-7 shadow-lg min-w-max text-base`}>
      {children}
    </div>
  );
};

export default Card;
