import { createContextFactory } from "@/lib/context";
import { useCart } from "@/services/cart";
import { Coupon } from "@/services/coupon";
import { ProductId } from "@/services/shared";
import { ReactNode, useState } from "react";

type PageContextValue = {
  selectedCoupon: Coupon | null;
  selectedProductIds: ProductId[];
  selectCoupon: (coupon: Coupon) => void;
  toggleSelectedProductId: (productId: ProductId) => void;
  removeSelectedProductId: (productId: ProductId) => void;
  toggleAllSelectedProductIds: () => void;
};

const [PageContext, usePageContext] = createContextFactory<PageContextValue>("PageContext");
export { usePageContext };

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: cart } = useCart();

  const cartProductIds = cart.map((cartItem) => cartItem.product.id);

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<ProductId[]>(cartProductIds);

  const selectCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const removeSelectedProductId = (productId: ProductId) => {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleSelectedProductId = (productId: ProductId) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  };

  const toggleAllSelectedProductIds = () => {
    if (selectedProductIds.length === cartProductIds.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(cartProductIds);
    }
  };

  const providerValue = {
    selectedCoupon,
    selectedProductIds,
    selectCoupon,
    removeSelectedProductId,
    toggleSelectedProductId,
    toggleAllSelectedProductIds,
  };

  return <PageContext.Provider value={providerValue}>{children}</PageContext.Provider>;
};
