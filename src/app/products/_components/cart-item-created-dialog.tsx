import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ROUTE } from "@/configs/route";
import Link from "next/link";

type CartItemCreatedDialog = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const CartItemCreatedDialog = ({ isOpen, onOpenChange }: CartItemCreatedDialog) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-[320px]">
        <Dialog.Header>
          <Dialog.Title>장바구니에 담았습니다.</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer className="mt-6">
          <Dialog.Close asChild>
            <Button className="w-full" size="large" variant="outlined">
              쇼핑 계속하기
            </Button>
          </Dialog.Close>
          <Button className="w-full" size="large" variant="primary" asChild>
            <Link href={ROUTE.CART}>장바구니 가기</Link>
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
