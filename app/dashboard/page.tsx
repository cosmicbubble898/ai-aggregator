import { auth } from "@/auth";
import { redirect } from "next/navigation";

// A protected page: only signed-in users can see it. Signed-out visitors are
// sent back to the landing page. (Placeholder — the real app lives here later.)
export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Signed in as {session.user.name ?? session.user.email}.</p>
      <p>This is a placeholder protected page — proof that sign-in works.</p>
    </main>
  );
}
