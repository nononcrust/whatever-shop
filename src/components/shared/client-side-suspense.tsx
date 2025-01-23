"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";

type ClientSideSuspenseProps = {
  fallback: ReactNode;
  children: ReactNode;
};

export const ClientSideSuspense = ({ fallback, children }: ClientSideSuspenseProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Suspense fallback={fallback}>{mounted ? children : fallback}</Suspense>;
};
