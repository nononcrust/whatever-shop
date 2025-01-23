import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Brand, CouponId, QUERY_KEY } from "./shared";

export enum CouponType {
  /**
   * 비율 할인 쿠폰
   */
  RATE = "RATE",
  /**
   * 정액 할인 쿠폰
   */
  AMOUNT = "AMOUNT",
}

const CouponBase = z.object({
  type: z.nativeEnum(CouponType),
  id: Brand.CouponId,
  title: z.string(),
});

const RateCoupon = CouponBase.extend({
  type: z.literal(CouponType.RATE),
  rate: z.number(),
});

const AmountCoupon = CouponBase.extend({
  type: z.literal(CouponType.AMOUNT),
  amount: z.number(),
});

export type Coupon = z.infer<typeof Coupon>;
const Coupon = z.discriminatedUnion("type", [RateCoupon, AmountCoupon]);

export const couponApi = {
  getCoupons: async (): Promise<Coupon[]> => {
    return allCoupons;
  },
};

export const useCoupons = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.COUPON.LIST],
    queryFn: couponApi.getCoupons,
  });
};

const allCoupons: Coupon[] = [
  {
    type: CouponType.RATE,
    id: CouponId("1"),
    title: "10% 할인 쿠폰",
    rate: 0.1,
  },
  {
    type: CouponType.AMOUNT,
    id: CouponId("2"),
    title: "5000원 할인 쿠폰",
    amount: 5000,
  },
  {
    type: CouponType.AMOUNT,
    id: CouponId("3"),
    title: "200000원 할인 쿠폰",
    amount: 200000,
  },
];

/**
 * 상품 가격에 쿠폰을 적용한 가격을 계산합니다.
 */
export const calculateCouponAppliedPrice = ({
  price,
  coupon,
}: {
  price: number;
  coupon: Coupon;
}) => {
  switch (coupon.type) {
    case CouponType.RATE:
      return Math.floor(price - price * coupon.rate);
    case CouponType.AMOUNT:
      return Math.max(price - coupon.amount, 0);
    default:
      coupon satisfies never;
      return price;
  }
};
