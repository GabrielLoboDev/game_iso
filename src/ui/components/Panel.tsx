import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const panel = cva('border-2 p-4', {
  variants: {
    tone: { default: 'bg-panel border-line', dark: 'bg-black/30 border-line' },
  },
  defaultVariants: { tone: 'default' },
});

type Props = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof panel>;

export function Panel({ tone, className, ...rest }: Props) {
  return <div className={cn(panel({ tone }), className)} {...rest} />;
}