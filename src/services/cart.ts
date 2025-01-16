import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { z } from "zod";
import { calculateCouponAppliedPrice, Coupon } from "./coupon";
import { allProducts, Product } from "./product";
import { Brand, CartItemId, ProductId, QUERY_KEY } from "./shared";

export const MAX_CART_ITEMS = 4;
export const MAX_CART_ITEM_QUANTITY = 10;

const cartApi = {
  getCart: async (): Promise<GetCartResponse> => {
    const cart = cartRepository.get();

    const cartWithProduct = cart.map((cartItem) => {
      const product = allProducts.find((product) => product.id === cartItem.productId);

      if (!product) {
        return null;
      }

      return {
        ...cartItem,
        product,
      };
    });

    return GetCartResponse.parse(cartWithProduct);
  },
  createCartItem: async (request: CreateCartItemRequest) => {
    const cart = cartRepository.get();

    const newCartItem: CartItem = {
      id: CartItemId(nanoid()),
      productId: request.body.productId,
      quantity: request.body.quantity,
    };

    const existingCartItem = cart.find((item) => item.productId === newCartItem.productId);

    if (existingCartItem) {
      throw new Error("이미 장바구니에 담긴 상품입니다.");
    }

    const newCart = [...cart, newCartItem];

    if (newCart.length > MAX_CART_ITEMS) {
      throw new Error(`장바구니에는 최대 ${MAX_CART_ITEMS}개의 상품까지 담을 수 있습니다.`);
    }

    cartRepository.set(newCart);
  },
  deleteCartItem: async (request: DeleteCartItemRequest) => {
    const cart = cartRepository.get();

    const newCart = cart.filter((item) => item.id !== request.id);

    cartRepository.set(newCart);
  },
  updateCartItem: async (request: UpdateCartItemRequest) => {
    const cart = cartRepository.get();

    const cartItem = cart.find((item) => item.id === request.id);

    if (!cartItem) {
      throw new Error("상품을 찾을 수 없습니다.");
    }

    if (request.body.quantity > MAX_CART_ITEM_QUANTITY) {
      throw new Error(`상품은 최대 ${MAX_CART_ITEM_QUANTITY}개까지 담을 수 있습니다.`);
    }

    const newCart = cart.map((item) => {
      if (item.id === request.id) {
        item.quantity = request.body.quantity;
      }

      return item;
    });

    cartRepository.set(newCart);
  },
};

const cartRepository = {
  get: () => {
    return Cart.parse(JSON.parse(localStorage.getItem("cart") ?? "[]"));
  },
  set: (cart: Cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },
};

type CreateCartItemRequest = {
  body: {
    productId: ProductId;
    quantity: number;
  };
};

type UpdateCartItemRequest = {
  id: CartItemId;
  body: {
    quantity: number;
  };
};

type DeleteCartItemRequest = {
  id: CartItemId;
};

export const useCart = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.CART.LIST],
    queryFn: cartApi.getCart,
  });
};

export const useCreateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.createCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CART.LIST],
      });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.updateCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CART.LIST],
      });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CART.LIST],
      });
    },
  });
};

export type CartItem = z.infer<typeof CartItem>;
const CartItem = z.object({
  id: Brand.CartItemId,
  productId: Brand.ProductId,
  quantity: z.number(),
});

export type CartProduct = z.infer<typeof CartProduct>;
export const CartProduct = Product;

type CartItemWithProduct = z.infer<typeof CartItemWithProduct>;
const CartItemWithProduct = CartItem.extend({
  product: CartProduct,
});

export type Cart = z.infer<typeof Cart>;
const Cart = z.array(CartItem);

export type GetCartResponse = z.infer<typeof GetCartResponse>;
const GetCartResponse = z.array(CartItemWithProduct);

/**
 * 장바구니의 총 상품금액을 계산합니다.
 */
export const getTotalProductPrice = (cart: CartItemWithProduct[]) => {
  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

/**
 * 쿠폰에 따라 총 할인금액을 계산합니다.
 */
export const getTotalDiscountPrice = ({
  cartItems,
  coupon,
}: {
  cartItems: CartItemWithProduct[];
  coupon: Coupon | null;
}): number => {
  if (coupon === null) {
    return 0;
  }

  return cartItems
    .filter((cartItem) => cartItem.product.discountEligible === true)
    .reduce((total, item) => {
      const price = calculateCouponAppliedPrice({
        price: item.product.price * item.quantity,
        coupon,
      });

      const discountPrice = item.product.price * item.quantity - price;

      return total + discountPrice;
    }, 0);
};

/**
 * 결제금액을 계산합니다.
 */
export const getPaymentPrice = ({
  totalProductPrice,
  totalDiscountPrice,
}: {
  totalProductPrice: number;
  totalDiscountPrice: number;
}) => {
  return totalProductPrice - totalDiscountPrice;
};
