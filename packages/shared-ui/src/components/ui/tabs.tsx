import * as React from "react";
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'hsl(var(--primary))',
    height: '2px',
  },
  '& .MuiTabs-flexContainer': {
    borderBottom: '1px solid hsl(var(--border))',
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '12px 16px',
  fontWeight: 500,
  fontSize: '14px',
  color: 'hsl(var(--muted-foreground))',
  '&.Mui-selected': {
    color: 'hsl(var(--foreground))',
  },
  '&:hover': {
    color: 'hsl(var(--foreground))',
  },
}));

export interface SharedTabsProps {
  tabs: string[];
  value: number;
  onChange: (newIndex: number) => void;
  sx?: object;
}

const Tabs = React.forwardRef<HTMLDivElement, MuiTabsProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <StyledTabs ref={ref} {...props} />
  )
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} {...props} />
  )
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof MuiTab>>(
  ({ className, ...props }, ref) => (
    <StyledTab className={className} {...props} />
  )
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} {...props} />
  )
);
TabsContent.displayName = "TabsContent";

const SharedTabs = React.forwardRef<HTMLDivElement, SharedTabsProps>(
  ({ tabs, value, onChange, sx }, ref) => {
    return (
      <StyledTabs
        ref={ref}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        sx={sx}
      >
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab} />
        ))}
      </StyledTabs>
    );
  }
);
SharedTabs.displayName = "SharedTabs";

export { Tabs, TabsList, TabsTrigger, TabsContent, SharedTabs };