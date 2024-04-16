import ServerProtectedComponenet from "@/components/serverProtected";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <ServerProtectedComponenet>{children}</ServerProtectedComponenet>;
}
