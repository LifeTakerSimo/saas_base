import React, { useState, ReactNode } from 'react';

type TabsContextProps = {
  activeTab?: string;
  setActiveTab?: (value: string) => void;
};

type TabsProps = {
  children: ReactNode;
  defaultValue: string;
};

type TabsListProps = {
  children: ReactNode;
};

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  onClick: (value: string) => void;
  isActive: boolean;
};

type TabsContentProps = {
  value: string;
  activeTab: string;
  children: ReactNode;
};

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab } as TabsContextProps);
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex items-center justify-center border-b border-gray-800">
      <div className="flex space-x-2">{children}</div>
    </div>
  );
}

export function TabsTrigger({ value, children, onClick, isActive }: TabsTriggerProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        flex items-center px-6 py-3 text-sm font-medium
        border-b-2 transition-all duration-200
        hover:text-white relative
        ${isActive 
          ? 'text-white border-purple-500' 
          : 'text-gray-400 border-transparent hover:border-gray-700'
        }
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }: TabsContentProps) {
  return activeTab === value ? <div>{children}</div> : null;
} 