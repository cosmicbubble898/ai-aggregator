export default function Home() {
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
      {/* Placeholder — wired to Google OAuth in the next feature. */}
      <button type="button">Sign in with Google</button>
    </main>
  );
}
