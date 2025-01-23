"use client";

import { ROUTE } from "@/configs/route";
import { useCart } from "@/services/cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { IconButton } from "../ui/icon-button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[48px] items-center justify-between border-b border-border bg-white px-3">
      <Link className="font-extrabold tracking-tighter text-primary" href={ROUTE.HOME}>
        WHATEVER
      </Link>
      <CartIconButton />
    </header>
  );
};

const CartIconButton = () => {
  const { data: cart } = useCart();

  return (
    <div className="relative">
      <IconButton size="xsmall" variant="outlined" aria-label="장바구니" asChild>
        <Link href={ROUTE.CART}>
          <ShoppingCartIcon size={14} />
        </Link>
      </IconButton>
      {cart.length > 0 && (
        <Badge
          size="small"
          variant="primary"
          className="absolute -top-1.5 left-full -translate-x-2.5"
        >
          {cart.length}
        </Badge>
      )}
    </div>
  );
};
