"use client";

import { IconButton } from "@/components/ui/icon-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDialog } from "@/hooks/use-dialog";
import { useCart, useCreateCartItem, useDeleteCartItem } from "@/services/cart";
import { ProductId } from "@/services/shared";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartItemCreatedDialog } from "./cart-item-created-dialog";

type ProductListItemProps = {
  id: ProductId;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export const ProductListItem = ({ id, name, price, rating, imageUrl }: ProductListItemProps) => {
  const { data: cart } = useCart();
  const createCartItemMutation = useCreateCartItem();
  const deleteCartItemMutation = useDeleteCartItem();

  const isProductInCart = cart.some((cartItem) => cartItem.product.id === id);

  const addedToCartDialog = useDialog();

  const createCartItem = () => {
    if (createCartItemMutation.isPending) return;

    createCartItemMutation.mutate(
      {
        body: {
          productId: id,
          quantity: 1,
        },
      },
      {
        onSuccess: () => {
          addedToCartDialog.open();
        },
        onError: () => {
          toast.error("장바구니에 상품을 담을 수 없습니다.");
        },
      },
    );
  };

  const deleteCartItem = () => {
    if (deleteCartItemMutation.isPending) return;

    const cartItem = cart.find((cartItem) => cartItem.product.id === id);

    if (!cartItem) return;

    deleteCartItemMutation.mutate(
      {
        id: cartItem.id,
      },
      {
        onError: () => {
          toast.error("장바구니에서 상품을 삭제할 수 없습니다.");
        },
      },
    );
  };

  const toggleCartItem = () => {
    if (isProductInCart) {
      deleteCartItem();
    } else {
      createCartItem();
    }
  };

  return (
    <li className="flex w-full flex-col" data-testid="product-list-item">
      <img
        src={imageUrl}
        alt="상품 이미지"
        className="aspect-square rounded-lg border object-cover"
      />
      <div className="relative flex flex-col">
        <span className="mt-1 text-sm text-sub">{name}</span>
        <span className="font-semibold text-main">{price.toLocaleString()}</span>
        <div className="flex items-center gap-0.5">
          <StarIcon size={12} className="fill-yellow-400 stroke-yellow-400" />
          <span className="text-xs font-semibold text-main">{rating}</span>
        </div>
        <IconButton
          className="absolute right-1 top-1"
          variant={isProductInCart ? "primary" : "ghost"}
          size="xsmall"
          aria-label={isProductInCart ? "장바구니에서 제거" : "장바구니에 추가"}
          onClick={toggleCartItem}
        >
          <ShoppingCartIcon size={12} />
        </IconButton>
        <CartItemCreatedDialog
          isOpen={addedToCartDialog.isOpen}
          onOpenChange={addedToCartDialog.onOpenChange}
        />
      </div>
    </li>
  );
};

const ProductListItemSkeleton = () => {
  return (
    <li className="flex flex-col">
      <Skeleton className="aspect-square" />
      <Skeleton shape="text" height={16} className="mt-1 w-3/4" />
      <Skeleton shape="text" height={20} className="mt-1 w-1/2" />
      <Skeleton shape="text" height={12} className="mt-1 w-1/4" />
    </li>
  );
};

ProductListItem.Skeleton = ProductListItemSkeleton;
