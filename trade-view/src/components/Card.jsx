import react from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full h-full rounded-md relative p-4 border border-slate-300 bg-slate-200">
      {children}
    </div>
  );
};

export default Card;