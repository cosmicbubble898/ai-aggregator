import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { listProviderKeys } from "@/lib/provider-keys";
import ApiKeysForm from "./ApiKeysForm";
import styles from "./settings.module.css";

// Auth-only settings page where a user manages their BYOK provider keys.
// Loads the current connected/last-4 status server-side and hands it to the
// client form. The keys themselves never reach this component.
export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const keys = await listProviderKeys(session.user.id);

  return (
    <main className={styles.page}>
      <a href="/dashboard" className={styles.back}>
        ← Back to dashboard
      </a>
      <h1 className={styles.title}>API keys</h1>
      <p className={styles.lead}>
        Bring your own keys. Each one is checked, then encrypted before it&apos;s
        stored — it&apos;s never shown again, only its last 4 characters.
      </p>

      <ApiKeysForm
        providers={[
          {
            id: "openrouter",
            label: "OpenRouter",
            help: 'Powers chat and some image models. Keys start with "sk-or-".',
            status: keys.openrouter,
          },
          {
            id: "atlascloud",
            label: "AtlasCloud",
            help: "Powers image and video generation.",
            status: keys.atlascloud,
          },
        ]}
      />
    </main>
  );
}
