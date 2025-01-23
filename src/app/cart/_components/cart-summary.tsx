import { cn } from "@/lib/utils";
import {
  getPaymentPrice,
  getTotalDiscountPrice,
  getTotalProductPrice,
  useCart,
} from "@/services/cart";
import { usePageContext } from "../_context";

export const CartSummary = () => {
  const { data: cart } = useCart();

  const { selectedCoupon, selectedProductIds } = usePageContext();

  const selectedCartItems = cart.filter((cartItem) =>
    selectedProductIds.includes(cartItem.product.id),
  );

  const totalProductPrice = getTotalProductPrice(selectedCartItems);

  const totalDiscountPrice = getTotalDiscountPrice({
    cartItems: selectedCartItems,
    coupon: selectedCoupon,
  });

  const paymentPrice = getPaymentPrice({
    totalProductPrice,
    totalDiscountPrice,
  });

  return (
    <dl
      className={cn(
        "flex h-fit flex-col gap-3 rounded-lg border border-border p-4",
        "md:sticky md:top-16",
      )}
    >
      <div className="flex items-center justify-between">
        <dt className="text-sm font-medium text-sub">총 상품금액</dt>
        <dd className="font-semibold">{totalProductPrice.toLocaleString()}원</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm font-medium text-sub">총 할인 금액</dt>
        <dd className="font-semibold">
          {"- "}
          {totalDiscountPrice.toLocaleString()}원
        </dd>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <dt className="text-sm font-bold">결제금액</dt>
        <dd className="text-xl font-bold">{paymentPrice.toLocaleString()}원</dd>
      </div>
    </dl>
  );
};
