import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  if (!session) redirect("/login");
  return (
    <div>
      <SignIn />
    </div>
  );
}
