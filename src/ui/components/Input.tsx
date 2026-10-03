import { cn } from '../../lib/cn';

export function Input({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn('w-full bg-black/30 border-2 border-line px-3 py-2 outline-none focus:border-accent', className)}
      {...rest}
    />
  );
}