import { ClientSideSuspense } from "@/components/shared/client-side-suspense";
import { ProductList, ProductListPlaceholder } from "./_components/product-list";

export default function ProductListPage() {
  return (
    <main className="mx-auto my-16 w-full max-w-4xl px-4">
      <h1 className="mb-8 text-2xl font-bold">상품 목록</h1>
      <ClientSideSuspense fallback={<ProductListPlaceholder />}>
        <ProductList />
      </ClientSideSuspense>
    </main>
  );
}
