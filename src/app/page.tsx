import { ROUTE } from "@/configs/route";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(ROUTE.PRODUCT.LIST);
}
