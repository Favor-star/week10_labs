import { ReactNode } from "react";
import { DashboardSidebar } from "../components/featureSpecific/dashboard-sidebar";
import DashboardHeader from "../components/featureSpecific/dashboard-header";
import { Providers } from "../providers/Providers";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full h-full flex gap-0 text-white">
      <Providers>
        <DashboardSidebar />
        <div className="w-full ">
          <DashboardHeader />

          {children}
        </div>{" "}
      </Providers>
    </section>
  );
};

export default layout;
