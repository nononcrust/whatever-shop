"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const ProductListPageQuery = {
  page: z
    .string()
    .refine((value) => !isNaN(Number(value)))
    .transform(Number)
    .catch(1),
};

export const useProductListPageQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = ProductListPageQuery.page.parse(searchParams.get("page"));

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const setPage = (page: number) => {
    router.push(pathname + "?" + createQueryString("page", String(page)));
  };

  return { page, setPage };
};
