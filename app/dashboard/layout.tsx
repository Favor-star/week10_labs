import { ReactNode } from "react";
import { DashboardSidebar } from "../components/featureSpecific/dashboard-sidebar";
import DashboardHeader from "../components/featureSpecific/dashboard-header";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full h-full flex gap-0 text-white">
      <DashboardSidebar />
      <div className="w-full ">
        <DashboardHeader />
        {children}
      </div>
    </section>
  );
};

export default layout;
