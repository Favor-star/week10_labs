import { FC } from "react";
export const DashboardSummaryCard: FC<{
  info: number;
  label: string;
  icon: React.ElementType;
  color: string;
}> = ({ info, label, icon: Icon, color }) => {
  return (
    <div className=" w-full flex flex-row justify-between p-5 rounded-xl bg-secondary border border-secondary-l">
      <p className="flex flex-col">
        <span className="text-secondary-xl text-base">{label}</span>
        <span className="text-white text-xl font-bold">{info}</span>
      </p>
      <div
        className={`aspect-square p-3 w-fit h-fit rounded-lg `}
        style={{ backgroundColor: `${color}4D` }}
      >
        <Icon className={`text-${color}`} size={24} color={color} />
      </div>
    </div>
  );
};
