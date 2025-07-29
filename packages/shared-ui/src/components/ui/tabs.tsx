import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps, styled } from '@mui/material';
import { cn } from '../../lib/utils';

const StyledTabs = styled(MuiTabs)(() => ({
  '& .MuiTabs-indicator': {
    backgroundColor: 'hsl(var(--primary))',
    height: '2px',
  },
  '& .MuiTabs-flexContainer': {
    borderBottom: '1px solid hsl(var(--border))',
  },
}));

const StyledTab = styled(MuiTab)(() => ({
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

const Tabs = React.forwardRef<
  HTMLDivElement,
  MuiTabsProps & { className?: string }
>(({ className, ...props }, ref) => (
  <StyledTabs
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof MuiTab>
>(({ className, ...props }, ref) => (
  <StyledTab
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };