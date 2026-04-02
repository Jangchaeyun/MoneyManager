import { UtensilsCrossed } from "lucide-react";
import React from "react";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyle = () => {
    type === "소득" ? "bg-pink-50 text-pink-800" : "bg-red-50 text-red-800";
  };
  return (
    <div className="group relative flex items-center justify-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <UtensilsCrossed className="text-pink-500" />
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
