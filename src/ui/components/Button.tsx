import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../lib/cn';

const buttonVariants = cva (
    "relative flex h-8 w-24 items-center justify-center overflow-hidden rounded-md coursor-pointer border-2 border-gray cursor-pointer  transform active:translate-y-0.5 active:scale-[0.98]",
    {
        variants: {
            variant: {
                orange: "font-semibold text-font-white",
                blue: "font-semibold text-font-white",
                green: "font-semibold text-font-white",
                gray: "font-semibold text-font-gray"
            },

            font: {
                mono: "font-mono",
                anton: "font-anton"
            }
        }
    }
)

const buttonTopColor = cva (
    "absolute top-0 left-0 h-[40%] w-full",
    {
        variants: {
            variant: {
                orange: "bg-light-orange",
                blue: "bg-light-blue",
                green: "bg-light-green",
                gray: "bg-light-gray"
            }
        }
    }
)

const buttonBottomColor = cva (
    "absolute bottom-0 left-0 h-[60%] w-full",
    {
        variants: {
            variant: {
                orange: "bg-orange",
                blue: "bg-blue",
                green: "bg-green",
                gray: "bg-gray"
            }
        }
    }
)

export interface DivProps extends HTMLAttributes<HTMLDivElement>,VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLDivElement, DivProps>(
    ({className, variant, font, children, ...props}, ref) => {
        return (
            <div
                ref={ref}
                className={cn(buttonVariants({variant, font}), className)}
                {...props}
            >
                <div className={buttonTopColor({variant})} />

                <div className={buttonBottomColor({variant})} />

                <span className="relative z-10">
                    {children}
                </span>
            </div>
        )
    }
)

Button.displayName = 'Button'