import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
  'relative flex h-8 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-gray transform active:translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        orange: 'font-semibold text-font-white',
        blue: 'font-semibold text-font-white',
        green: 'font-semibold text-font-white',
        gray: 'font-semibold text-font-gray',
      },
      font: {
        mono: 'font-mono',
        anton: 'font-anton',
      },
    },
    defaultVariants: { variant: 'orange', font: 'mono' },
  }
);

const buttonTopColor = cva('absolute top-0 left-0 block h-[40%] w-full', {
  variants: {
    variant: {
      orange: 'bg-light-orange',
      blue: 'bg-light-blue',
      green: 'bg-light-green',
      gray: 'bg-light-gray',
    },
  },
  defaultVariants: { variant: 'orange' },
});

const buttonBottomColor = cva('absolute bottom-0 left-0 block h-[60%] w-full', {
  variants: {
    variant: {
      orange: 'bg-orange',
      blue: 'bg-blue',
      green: 'bg-green',
      gray: 'bg-gray',
    },
  },
  defaultVariants: { variant: 'orange' },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, font, children, type = 'button', ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, font }), className)}
        {...buttonProps}
      >
        <span className={buttonTopColor({ variant })} />
        <span className={buttonBottomColor({ variant })} />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';