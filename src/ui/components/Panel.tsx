import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const panel = cva('border-2 border-gray rounded p-4', {
  variants: {
    variant: { 
      default: 'bg-white ', 
      dark: 'bg-black/30 border-line' 
    },
  },
  defaultVariants: { variant: 'default' },
});

type Props = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof panel>;

export function Panel({ variant, className, ...rest }: Props) {
  return <div className={cn(panel({ variant }), className)} {...rest} />;
}