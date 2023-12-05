"use client";

import { ErrorPage } from "@/components/pages/error-page";
import { useUserStore } from "@/stores/user.store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();

  if (user?.role !== "admin" && user?.role !== "spso") {
    return (
      <ErrorPage
        title="Unauthorized"
        message="You are not authorized to access this page."
      />
    );
  }

  return children;
}
