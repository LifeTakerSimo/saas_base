import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { cn } from "../../client/cn";
import React from "react";

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  containerClassName?: string;
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, icon, containerClassName, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--purple-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cn(
          "p-[1px] rounded-xl transition duration-300 group/input relative",
          containerClassName
        )}
      >
        <div className="relative h-full">
          <input
            ref={ref}
            className={cn(
              `w-full h-full
               bg-purple-500/5
               border border-purple-500/30 
               rounded-xl
               text-gray-100 placeholder-gray-400
               shadow-[0_0_15px_rgba(139,92,246,0.1)]
               group-hover/input:shadow-[0_0_30px_rgba(139,92,246,0.2)]
               focus:shadow-[0_0_30px_rgba(139,92,246,0.3)]
               focus:outline-none focus:ring-2 focus:ring-purple-500/20
               transition duration-300`,
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                          group-hover/input:text-purple-400 transition-colors">
              {icon}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

export { EnhancedInput }; 