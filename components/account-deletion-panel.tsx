"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { CheckCircle2, ExternalLink, Loader2, LogOut, Trash2 } from "lucide-react";
import { getBrowserEnvironment, tryOpenInNativeBrowser } from "@/lib/in-app-browser";

// Self-service deletion: the user signs in with the same Google account used in the
// Android app, and the page calls the app's own deletion endpoint (delete-account-auth),
// which removes exactly what in-app deletion removes.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

type Phase = "loading" | "signed-out" | "signed-in" | "deleting" | "deleted" | "error";

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export function AccountDeletionPanel({ supportMailto }: { supportMailto: string }) {
  const supabase = useMemo<SupabaseClient | null>(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true },
    });
  }, []);
  const [phase, setPhase] = useState<Phase>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [hadAppAccount, setHadAppAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const inAppBrowser = useSyncExternalStore(
    subscribeNever,
    () => getBrowserEnvironment(navigator.userAgent, navigator.platform, navigator.maxTouchPoints).browser !== null,
    () => false,
  );

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setPhase(data.session ? "signed-in" : "signed-out");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setPhase((current) =>
        current === "deleting" || current === "deleted" ? current : next ? "signed-in" : "signed-out",
      );
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function signIn() {
    if (!supabase) return;
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/account-deletion`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setErrorMessage("Google sign-in could not start. Please try again.");
      setPhase("error");
    }
  }

  async function signOut() {
    await supabase?.auth.signOut({ scope: "local" });
    setConfirmed(false);
  }

  async function deleteAccount() {
    if (!supabase || !session) return;
    setPhase("deleting");
    setErrorMessage("");
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/delete-account-auth`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
        body: "{}",
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || body?.deleted !== true) throw new Error(String(response.status));
      setHadAppAccount(body.hadAppAccount !== false);
      // The Auth user no longer exists; drop the local session only.
      await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
      setPhase("deleted");
    } catch {
      setErrorMessage("We couldn't delete your account right now. Please try again in a few minutes.");
      setPhase("error");
    }
  }

  const email = session?.user?.email ?? "";

  if (!supabase) {
    return <EmailFallback supportMailto={supportMailto} prominent />;
  }

  return (
    <div className="mt-6 space-y-5">
      {phase === "loading" ? (
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : null}

      {phase === "signed-out" || (phase === "error" && !session) ? (
        <div className="space-y-4">
          {inAppBrowser ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-foreground">
              Google sign-in does not work inside this app&apos;s browser. Open this page in Chrome or
              Safari to continue.
              <button
                type="button"
                onClick={() =>
                  tryOpenInNativeBrowser(
                    getBrowserEnvironment(navigator.userAgent, navigator.platform, navigator.maxTouchPoints),
                    window.location.href,
                  )
                }
                className={`mt-3 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-4 py-2 font-semibold ${focusStyles}`}
              >
                Open in browser <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
          <button
            type="button"
            onClick={signIn}
            className={`inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-50 sm:w-auto ${focusStyles}`}
          >
            <GoogleMark />
            Sign in with Google to continue
          </button>
          <p className="text-sm leading-6 text-muted">
            Use the same Google account you signed in with in the Sketch Steps app. Nothing is deleted
            until you confirm on the next step.
          </p>
        </div>
      ) : null}

      {(phase === "signed-in" || (phase === "error" && session)) && session ? (
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted sm:text-base">
            Signed in as <strong className="font-semibold text-foreground">{email}</strong>.{" "}
            <button
              type="button"
              onClick={signOut}
              className={`inline-flex items-center gap-1 rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 ${focusStyles}`}
            >
              Use another account <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </p>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-foreground">
            Deleting your account does not cancel a Google Play subscription. If you have one, cancel it
            first in Google Play → Payments &amp; subscriptions → Subscriptions.
          </div>
          <label className="flex items-start gap-3 text-sm leading-6 text-foreground">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[#e23744]"
            />
            I understand that my Sketch Steps account, coins and saved results will be permanently
            deleted and cannot be restored.
          </label>
          <button
            type="button"
            onClick={deleteAccount}
            disabled={!confirmed}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-accent transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[#d92f3e] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${focusStyles}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Permanently delete my account
          </button>
        </div>
      ) : null}

      {phase === "deleting" ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Deleting your account…
        </p>
      ) : null}

      {phase === "deleted" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-foreground sm:text-base">
          <p className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            Your account has been deleted.
          </p>
          <p className="mt-2 text-muted">
            {hadAppAccount
              ? "Your Sketch Steps account and its server data have been removed. You can close this page."
              : "We found no Sketch Steps app data for this Google account; its sign-in record has been removed. You can close this page."}
          </p>
        </div>
      ) : null}

      {errorMessage ? (
        <p role="alert" className="text-sm font-semibold text-accent">
          {errorMessage}
        </p>
      ) : null}

      <EmailFallback supportMailto={supportMailto} />
    </div>
  );
}

function subscribeNever() {
  return () => undefined;
}

function EmailFallback({ supportMailto, prominent = false }: { supportMailto: string; prominent?: boolean }) {
  return (
    <p className={`text-sm leading-6 text-muted ${prominent ? "mt-6" : "border-t border-[#f2d9dc] pt-4"}`}>
      Can&apos;t sign in to that Google account anymore?{" "}
      <a
        href={supportMailto}
        className={`rounded-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 ${focusStyles}`}
      >
        Email us from the account&apos;s email address
      </a>{" "}
      and we&apos;ll process your request.
    </p>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}
