import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const inputVariants = cva(
  'w-full h-[2rem] border-2 border-gray rounded px-2 py-2 text-font-black outline-none focus:border-orange shadow-[inset_0_2px_6px_rgb(0,0,0))]',
  {
    variants: {
      variant: {
        default: 'bg-white',
        danger: 'bg-red-500/30 border-red-400',
      },
      font: {
        mono: 'font-mono',
      },
    },
    defaultVariants: { variant: 'default', font: 'mono' },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, font, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, font }), className)}
      {...props}
    />
  )
);

Input.displayName = 'Input';