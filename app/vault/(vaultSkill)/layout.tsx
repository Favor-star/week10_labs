import React from "react";
import { VaultNavbar } from "@/app/components/featureSpecific/vault-navbar";

const layout = ({ children }: { children: string }) => {
  return (
    <section className="w-full h-full  mx-auto text-white mb-10">
      <VaultNavbar />
      <div className="w-full border-b border-secondary-l bg-secondary py-3">
        <div className="max-w-screen-xl mx-auto w-full px-4">
          Skills {">"} ReactjsDevelopment
        </div>
      </div>
      <div className="w-full max-w-screen-xl px-4 mx-auto">{children}</div>
    </section>
  );
};

export default layout;
