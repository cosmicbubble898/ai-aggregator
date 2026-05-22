import { auth, signIn, signOut } from "@/auth";

// The public landing page. If you're signed in it greets you + offers sign-out;
// otherwise it shows the "Sign in with Google" button.
export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>AI Aggregator</h1>
      <p>
        One place to use many AI models — chat, image generation and editing,
        and video — from a single interface. Bring your own API keys, and
        everything you create is saved to your own private history.
      </p>
      <p>
        Open source, built in the open as a learning project. Sign in with
        Google to get started.
      </p>

      {session?.user ? (
        <>
          <p>Signed in as {session.user.email}.</p>
          {/* Server Action: sign out, then return to this page. */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        /* Server Action: start the Google sign-in flow, land on /dashboard. */
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button type="submit">Sign in with Google</button>
        </form>
      )}
    </main>
  );
}
