import { z } from "zod";

export const Brand = {
  ProductId: z.string().brand("ProductId"),
  CartItemId: z.string().brand("CartItemId"),
  CouponId: z.string().brand("CouponId"),
};

export type ProductId = z.infer<typeof Brand.ProductId>;
export const ProductId = (id: string) => Brand.ProductId.parse(id);

export type CartItemId = z.infer<typeof Brand.CartItemId>;
export const CartItemId = (id: string) => Brand.CartItemId.parse(id);

export type CouponId = z.infer<typeof Brand.CouponId>;
export const CouponId = (id: string) => Brand.CouponId.parse(id);

export const QUERY_KEY = {
  PRODUCT: {
    LIST: "product-list",
  },
  CART: {
    LIST: "cart-list",
  },
  COUPON: {
    LIST: "coupon-list",
  },
};
