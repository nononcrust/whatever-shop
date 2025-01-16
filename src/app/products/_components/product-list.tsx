"use client";

import { Pagination } from "@/components/ui/pagination";
import { ROUTE } from "@/configs/route";
import { getTotalPages } from "@/lib/pagination";
import { useProducts } from "@/services/product";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useProductListPageQuery } from "../_hooks/use-product-list-page-query";
import { ProductListItem } from "./product-list-item";

const ITEMS_PER_PAGE = 6;

export const ProductList = () => {
  const { page, setPage } = useProductListPageQuery();

  const { data: products } = useProducts({
    params: {
      page: page,
      limit: ITEMS_PER_PAGE,
    },
  });

  const totalPages = getTotalPages(products.total, ITEMS_PER_PAGE);

  if (page > totalPages) {
    redirect(ROUTE.PRODUCT.LIST);
  }

  return (
    <>
      <ProductGrid>
        {products.data.map((product) => (
          <ProductListItem
            key={product.id}
            id={product.id}
            name={product.name}
            rating={product.rating}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </ProductGrid>
      <div className="mt-8 flex justify-center">
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </div>
    </>
  );
};

const ProductGrid = ({ children }: { children: ReactNode }) => {
  return <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">{children}</ul>;
};

export const ProductListPlaceholder = () => {
  return (
    <ProductGrid>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <ProductListItem.Skeleton key={index} />
      ))}
    </ProductGrid>
  );
};
