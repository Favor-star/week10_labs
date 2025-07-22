import { ReactNode } from "react";
import { DashboardSidebar } from "@/app/components/featureSpecific/dashboard-sidebar";
import DashboardHeader from "@/app/components/featureSpecific/dashboard-header";
import { Providers } from "@/app/providers/Providers";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full h-full flex gap-0 text-white">
      <Providers>
        <DashboardSidebar />
        <div className="w-full ">
          <DashboardHeader />

          {children}
        </div>
      </Providers>
    </section>
  );
};

export default layout;
