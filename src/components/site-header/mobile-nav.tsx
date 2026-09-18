"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { PrimaryNav } from "./primary-nav";

export function MobileNav() {
  const t = useTranslations("shell");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // md:hidden only hides the panel; close so the focus trap does not stay active.
    const media = window.matchMedia("(min-width: 768px)");
    function onChange() {
      if (media.matches) setOpen(false);
    }

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="rounded-sm p-2 text-foreground md:hidden"
        aria-label={t("openMenu")}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100 bg-foreground/40 md:hidden" />
        <Dialog.Content className="bg-canvas border-border fixed inset-s-0 inset-y-0 z-100 flex h-full w-full max-w-sm flex-col border-e p-4 md:hidden">
          <Dialog.Title className="text-lg font-semibold">{t("mainNav")}</Dialog.Title>
          <Dialog.Description className="sr-only">{t("menuDescription")}</Dialog.Description>
          <Dialog.Close
            className="absolute inset-e-3 top-3 rounded-sm p-2"
            aria-label={t("closeMenu")}
          >
            <CloseIcon />
          </Dialog.Close>
          <nav aria-label={t("mainNav")} className="mt-8">
            <PrimaryNav className="flex flex-col gap-1" onNavigate={() => setOpen(false)} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
