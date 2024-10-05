"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@utils/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
	<SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
		<SliderPrimitive.Track className="relative w-full h-2 overflow-hidden rounded-full grow bg-secondary">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block w-5 h-5 transition-colors bg-white border-2 border-gray-300 rounded-full cursor-pointer border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-white dark:bg-neutral-900 focus-within:border-primary focus:border-primary dark:focus:border-primary dark:focus-within:border-primary" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
