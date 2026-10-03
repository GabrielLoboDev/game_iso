import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../lib/cn';

const orderPlaceVariants = cva (
    '',
    {
        variants: {
            variant: {
                default: ''
            }
        }
    }
)



export interface DivProps extends HTMLAttributes<HTMLDivElement>,VariantProps<typeof orderPlaceVariants> {numberPlace: number, label: string}

export const OrderPlace = forwardRef<HTMLDivElement, DivProps>(
    ({className, variant, children, numberPlace, label, ...props}, ref) => {
        return (
            <div
                ref={ref}
                className={cn(orderPlaceVariants({ variant }), className)}
                {...props}
            >
                <div className="h-[4.5rem] border-1 border-border-gray rounded bg-white flex flex-row gap-2">
                    <div className="bg-[#C7B19D] w-[25%] flex justify-center items-center">
                        <span className="h-[80%] w-[80%] bg-white rounded-full text-blue flex justify-center items-center font-anton text-[40px]">{numberPlace}</span>
                    </div>

                    <div className="flex flex-col border border-red w-[75%] gap-1 pt-1">
                        <hr className="text-font-red w-[98%]"/>
                        <span className="text-font-black font-mono text-[10px]">{label}</span>
                        <hr className="text-font-red w-[98%]"/>
                        
                        <div className="flex flex-row justify-center items-center gap-1 pt-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

OrderPlace.displayName = 'OrderPlace'