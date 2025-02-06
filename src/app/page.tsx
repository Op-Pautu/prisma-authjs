import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  if (!session) redirect("/auth/login");
  return <div>home page</div>;
}
