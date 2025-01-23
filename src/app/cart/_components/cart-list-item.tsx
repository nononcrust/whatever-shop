import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import {
  CartProduct,
  MAX_CART_ITEM_QUANTITY,
  useDeleteCartItem,
  useUpdateCartItem,
} from "@/services/cart";
import { calculateCouponAppliedPrice } from "@/services/coupon";
import { CartItemId } from "@/services/shared";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { usePageContext } from "../_context";

type CartListItemProps = {
  id: CartItemId;
  quantity: number;
  product: CartProduct;
};

export const CartListItem = ({ id, quantity, product }: CartListItemProps) => {
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const { selectedCoupon, selectedProductIds, toggleSelectedProductId, removeSelectedProductId } =
    usePageContext();

  const isProductSelected = selectedProductIds.some(
    (selectedProductId) => selectedProductId === product.id,
  );

  const onMinusButtonClick = () => {
    updateCartItem({
      id: id,
      body: {
        quantity: quantity - 1,
      },
    });
  };

  const onPlusButtonClick = () => {
    updateCartItem({
      id: id,
      body: {
        quantity: quantity + 1,
      },
    });
  };

  const onDeleteButtonClick = () => {
    deleteCartItem(
      { id },
      {
        onSuccess: () => {
          removeSelectedProductId(product.id);
        },
      },
    );
  };

  const productSubtotal = product.price * quantity;

  const hasCouponApplied = product.discountEligible && selectedCoupon !== null;

  const couponAppliedSubtotal = selectedCoupon
    ? calculateCouponAppliedPrice({
        price: productSubtotal,
        coupon: selectedCoupon,
      })
    : product.price;

  return (
    <li className="relative w-full">
      <div className="flex">
        <div className="mr-2">
          <Checkbox
            size="large"
            checked={isProductSelected}
            onCheckedChange={() => toggleSelectedProductId(product.id)}
          />
        </div>
        <img
          src={product.imageUrl}
          alt="상품 이미지"
          className="mr-4 size-24 rounded-lg border object-cover"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center">
            <span className="mr-2 font-semibold">{product.name}</span>
            {product.discountEligible ? (
              <Chip variant="info">할인 적용</Chip>
            ) : (
              <Chip variant="danger">할인 미적용</Chip>
            )}
          </div>
          <div className="mt-2 flex">
            <IconButton
              className="rounded-r-none"
              size="xsmall"
              variant="outlined"
              aria-label="개수 줄이기"
              disabled={quantity === 1}
              onClick={onMinusButtonClick}
            >
              <MinusIcon size={12} />
            </IconButton>
            <div className="flex w-7 items-center justify-center border-y text-sm font-medium">
              {quantity}
            </div>
            <IconButton
              className="rounded-l-none"
              size="xsmall"
              variant="outlined"
              aria-label="개수 늘리기"
              disabled={quantity === MAX_CART_ITEM_QUANTITY}
              onClick={onPlusButtonClick}
            >
              <PlusIcon size={12} />
            </IconButton>
          </div>
          <div className="flex justify-end">
            <span className={cn("mr-2 font-semibold", hasCouponApplied && "line-through")}>
              {productSubtotal.toLocaleString()}원
            </span>
            {hasCouponApplied && (
              <span className="mr-2 font-semibold">{couponAppliedSubtotal.toLocaleString()}원</span>
            )}
          </div>
        </div>
        <div className="absolute right-0 top-0">
          <IconButton aria-label="삭제" size="xsmall" variant="ghost" onClick={onDeleteButtonClick}>
            <XIcon size={16} />
          </IconButton>
        </div>
      </div>
    </li>
  );
};
