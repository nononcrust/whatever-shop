import { Order } from "@/lib/order";
import { getPaginatedItems } from "@/lib/pagination";
import { sleep } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Brand, ProductId, QUERY_KEY } from "./shared";

export const productApi = {
  getProducts: async ({ params }: GetProductsRequest): Promise<GetProductsResponse> => {
    await sleep(500);

    const productsSortedByRatingDESC = allProducts.toSorted(byRatingDESC);

    return GetProductsResponse.parse({
      data: getPaginatedItems(productsSortedByRatingDESC, params.page, params.limit),
      total: allProducts.length,
    });
  },
};

const byRatingDESC = Order.mapInput(
  Order.reverse(Order.number),
  (product: Product) => product.rating,
);

type GetProductsRequest = {
  params: {
    page: number;
    limit: number;
  };
};

export const useProducts = (request: GetProductsRequest) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.PRODUCT.LIST, request],
    queryFn: () => productApi.getProducts(request),
  });
};

export type Product = z.infer<typeof Product>;
export const Product = z.object({
  id: Brand.ProductId,
  name: z.string(),
  price: z.number(),
  rating: z.number(),
  imageUrl: z.string(),
  discountEligible: z.boolean(),
});

type GetProductsResponse = z.infer<typeof GetProductsResponse>;
const GetProductsResponse = z.object({
  data: z.array(Product),
  total: z.number(),
});

export const allProducts: Product[] = [
  {
    id: ProductId("1"),
    name: "드림 텀블러",
    price: 15000,
    rating: 4.8,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("2"),
    name: "프리미엄 백팩",
    price: 55000,
    rating: 4.9,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("3"),
    name: "무선 이어폰",
    price: 89000,
    rating: 4.7,
    imageUrl: "/product.png",
    discountEligible: false,
  },
  {
    id: ProductId("4"),
    name: "에코 머그컵",
    price: 12000,
    rating: 4.6,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("5"),
    name: "고급 노트북 파우치",
    price: 32000,
    rating: 4.8,
    imageUrl: "/product.png",
    discountEligible: false,
  },
  {
    id: ProductId("6"),
    name: "스마트 워치",
    price: 135000,
    rating: 4.9,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("7"),
    name: "여행용 캐리어",
    price: 85000,
    rating: 4.7,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("8"),
    name: "무선 충전 패드",
    price: 22000,
    rating: 4.6,
    imageUrl: "/product.png",
    discountEligible: false,
  },
  {
    id: ProductId("9"),
    name: "스테인리스 물병",
    price: 19000,
    rating: 4.7,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("10"),
    name: "컴팩트 블루투스 스피커",
    price: 45000,
    rating: 4.8,
    imageUrl: "/product.png",
    discountEligible: false,
  },
  {
    id: ProductId("11"),
    name: "클래식 백팩",
    price: 60000,
    rating: 4.9,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("12"),
    name: "프리미엄 노트",
    price: 8000,
    rating: 4.5,
    imageUrl: "/product.png",
    discountEligible: true,
  },
  {
    id: ProductId("13"),
    name: "USB-C 허브",
    price: 30000,
    rating: 4.8,
    imageUrl: "/product.png",
    discountEligible: true,
  },
];
