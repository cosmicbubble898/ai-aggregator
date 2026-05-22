"use client";

import { useActionState } from "react";
import {
  saveKeyAction,
  removeKeyAction,
  type KeyActionState,
} from "@/app/actions/keys";
import styles from "./settings.module.css";

type ProviderInfo = {
  id: "openrouter" | "atlascloud";
  label: string;
  help: string;
  status: { connected: boolean; hint?: string };
};

const INITIAL: KeyActionState = {};

function ProviderCard({ info }: { info: ProviderInfo }) {
  const [saveState, saveAction, saving] = useActionState(saveKeyAction, INITIAL);
  const [removeState, removeAction, removing] = useActionState(
    removeKeyAction,
    INITIAL,
  );

  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>{info.label}</h2>
        {info.status.connected ? (
          <span className={styles.connected}>
            Connected ••••{info.status.hint}
          </span>
        ) : (
          <span className={styles.disconnected}>Not connected</span>
        )}
      </div>

      <p className={styles.help}>{info.help}</p>

      <form action={saveAction} className={styles.form}>
        <input type="hidden" name="provider" value={info.id} />
        <input
          className={styles.input}
          type="password"
          name="key"
          autoComplete="off"
          aria-label={`${info.label} API key`}
          placeholder={
            info.status.connected
              ? "Paste a new key to replace it"
              : "Paste your key"
          }
        />
        <button className={styles.save} type="submit" disabled={saving}>
          {saving ? "Checking…" : "Save"}
        </button>
      </form>

      {info.status.connected && (
        <form action={removeAction} className={styles.removeForm}>
          <input type="hidden" name="provider" value={info.id} />
          <button className={styles.remove} type="submit" disabled={removing}>
            {removing ? "Removing…" : "Remove key"}
          </button>
        </form>
      )}

      {(saveState.error ?? saveState.success) && (
        <p className={saveState.error ? styles.error : styles.success}>
          {saveState.error ?? saveState.success}
        </p>
      )}
      {removeState.error && <p className={styles.error}>{removeState.error}</p>}
    </article>
  );
}

export default function ApiKeysForm({
  providers,
}: {
  providers: ProviderInfo[];
}) {
  return (
    <div className={styles.cards}>
      {providers.map((info) => (
        <ProviderCard key={info.id} info={info} />
      ))}
    </div>
  );
}
