import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const buttonVariants = cva(
  cn(
    "inline-flex justify-center items-center gap-2 font-semibold outline-none border border-transparent rounded-[8px] whitespace-nowrap text-foreground transition-colors",
    "disabled:opacity-50 disabled:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-secondary text-main hover:bg-secondary-dark",
        outlined: "border-border text-main hover:bg-background-hover",
        ghost: "hover:bg-background-hover",
        error: "bg-error text-white hover:bg-error-dark",
      },
      size: {
        small: "px-[10px] h-8 text-xs",
        medium: "px-[12px] h-9 text-sm",
        large: "px-[14px] h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

export const Button = ({
  className,
  variant,
  size,
  children,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={cn(buttonVariants({ size, variant, className }))} {...props}>
      {children}
    </Component>
  );
};
