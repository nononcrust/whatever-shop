import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const chipVariant = cva("inline-flex font-medium justify-center items-center", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-main",
      outlined: "border border-border text-main",
      info: "bg-blue-50 text-blue-700",
      success: "bg-green-50 text-green-700",
      warning: "bg-yellow-50 text-yellow-700",
      danger: "bg-red-50 text-red-700",
    },
    size: {
      medium: "px-2 h-6 text-xs rounded-[6px]",
      large: "px-[10px] h-7 text-[13px] rounded-[8px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type ChipProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof chipVariant>;

export const Chip = ({ className, variant, size, children, ...props }: ChipProps) => {
  return (
    <span className={cn(chipVariant({ size, variant, className }))} {...props}>
      {children}
    </span>
  );
};
