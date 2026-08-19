const FinancialCard = ({
  icon,
  label,
  value,
  addictionalContent,
  borderColor = "",
  bgColor = "bg-white",
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl p-5 lg:-mx-2 lg:p-2 shadow-sm border hover:shadow-md border-gray-100 transition-all ${borderColor}`}
    >
      <div className="text-sm font-medium text-gray-400 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
      {addictionalContent}
    </div>
  );
};

export default FinancialCard;
