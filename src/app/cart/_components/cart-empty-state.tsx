import { Button } from "@/components/ui/button";
import { ROUTE } from "@/configs/route";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export const CartEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <SearchIcon size={48} className="text-gray-200" strokeWidth={3} />
      <p className="mt-4 text-center text-placeholder">장바구니가 비었습니다.</p>
      <Button className="mt-4" variant="outlined" asChild>
        <Link href={ROUTE.PRODUCT.LIST}>상품 담으러 가기</Link>
      </Button>
    </div>
  );
};
