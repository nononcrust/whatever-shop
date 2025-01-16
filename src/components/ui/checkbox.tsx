"use client";

import { cn } from "@/lib/utils";
import * as CheckboxPrimitives from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon, MinusIcon } from "lucide-react";
import { ComponentPropsWithRef, ComponentRef, forwardRef } from "react";

type CheckboxProps = ComponentPropsWithRef<typeof CheckboxPrimitives.Root> &
  VariantProps<typeof checkboxVariants>;

const checkboxVariants = cva("", {
  variants: {
    size: {
      small: "size-4 [&>span]:size-2",
      medium: "size-5 [&>span]:size-3",
      large: "size-6 [&>span]:size-4 rounded-md",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

export const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitives.Root>, CheckboxProps>(
  ({ className, checked, ["aria-invalid"]: ariaInvalid, size, ...props }, ref) => {
    return (
      <CheckboxPrimitives.Root
        ref={ref}
        className={cn(
          "peer inline-flex size-4 shrink-0 items-center justify-center rounded border border-border shadow-sm outline-none",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
          "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white",
          "disabled:pointer-events-none disabled:opacity-50",
          checkboxVariants({ size }),
          ariaInvalid &&
            "border-error focus-visible:ring-ring-error data-[state=checked]:border-error data-[state=checked]:bg-error",
          className,
        )}
        checked={checked}
        aria-invalid={ariaInvalid}
        {...props}
      >
        <CheckboxPrimitives.Indicator className="flex items-center justify-center">
          {checked === "indeterminate" ? (
            <MinusIcon strokeWidth={3} />
          ) : (
            <CheckIcon strokeWidth={3} />
          )}
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitives.Root.displayName;
