import { Search } from "lucide-react";
import { EnhancedInput } from "../../components/ui/enhanced-input";

export function SearchInput(props: React.ComponentProps<typeof EnhancedInput>) {
  return (
    <EnhancedInput
      icon={<Search className="w-5 h-5" />}
      containerClassName={`backdrop-blur-sm h-full ${props.containerClassName}`}
      className={`pl-4 pr-12 text-base h-full ${props.className}`}
      {...props}
    />
  );
} 