import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default function ServerProtectedComponenet({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("Authorization")?.value;
  if (!token) {
    redirect("/login");
  }
  return <>{children}</>;
}
