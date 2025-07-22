import { FC, ReactNode } from "react";
import { signOut } from "next-auth/react";
export const SignOutWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className="w-full"
      onClick={() =>
        signOut({
          redirectTo: "/",
        })
      }
    >
      {children}
    </div>
  );
};
