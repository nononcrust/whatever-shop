"use client";

import { cn } from "@/lib/utils";
import { Coupon, CouponType, useCoupons } from "@/services/coupon";
import { usePageContext } from "../_context";

export const Coupons = () => {
  const { data: coupons } = useCoupons();

  return (
    <div className="mt-16 flex flex-col">
      <h2 className="mb-8 text-2xl font-bold">쿠폰</h2>
      <ul className="flex flex-col gap-4">
        {coupons.map((coupon) => (
          <CouponListItem key={coupon.id} coupon={coupon} />
        ))}
      </ul>
    </div>
  );
};

const COUPON_TYPE_LABEL: Record<CouponType, string> = {
  [CouponType.AMOUNT]: "금액 할인",
  [CouponType.RATE]: "비율 할인",
};

type CouponListItemProps = {
  coupon: Coupon;
};

const CouponListItem = ({ coupon }: CouponListItemProps) => {
  const { selectedCoupon, selectCoupon } = usePageContext();

  const isSelected = selectedCoupon && selectedCoupon.id === coupon.id;

  return (
    <li>
      <button
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-border px-4 py-3",
          isSelected && "border-primary",
        )}
        onClick={() => selectCoupon(coupon)}
      >
        <div className="flex flex-col">
          <p className="font-semibold">{coupon.title}</p>
          <p className="text-start text-[13px] text-sub">{COUPON_TYPE_LABEL[coupon.type]}</p>
        </div>
      </button>
    </li>
  );
};
