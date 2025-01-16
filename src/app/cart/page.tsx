"use client";

import { ClientSideSuspense } from "@/components/shared/client-side-suspense";
import { Cart } from "./_components/cart";
import { PageContextProvider } from "./_context";

export default function CartPage() {
  return (
    <main className="mx-auto my-16 w-full max-w-4xl px-4">
      <h1 className="mb-8 text-2xl font-bold">장바구니</h1>
      <ClientSideSuspense fallback={null}>
        <PageContextProvider>
          <Cart />
        </PageContextProvider>
      </ClientSideSuspense>
    </main>
  );
}
