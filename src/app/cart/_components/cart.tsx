"use client";

import { useCart } from "@/services/cart";
import { CartEmptyState } from "./cart-empty-state";
import { CartListItem } from "./cart-list-item";
import { CartSummary } from "./cart-summary";
import { Coupons } from "./coupons";

export const Cart = () => {
  const { data: cart } = useCart();

  if (cart.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-8">
      <div className="col-span-2 flex flex-col">
        <CartList />
        <Coupons />
      </div>
      <div className="col-span-1">
        <CartSummary />
      </div>
    </div>
  );
};

const CartList = () => {
  const { data: cart } = useCart();

  return (
    <ul className="flex flex-col gap-8">
      {cart.map((cartItem) => (
        <CartListItem key={cartItem.id} {...cartItem} />
      ))}
    </ul>
  );
};
