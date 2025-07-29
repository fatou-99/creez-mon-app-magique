import React from 'react';
import { Chip, ChipProps, styled } from '@mui/material';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        destructive: '',
        outline: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const StyledChip = styled(Chip)<{ customvariant?: string }>(
  ({ customvariant }) => ({
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    height: '22px',
    padding: '0 10px',
    
    ...(customvariant === 'default' && {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--primary) / 0.8)',
      },
    }),
    
    ...(customvariant === 'secondary' && {
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--secondary-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--secondary) / 0.8)',
      },
    }),
    
    ...(customvariant === 'destructive' && {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--destructive) / 0.8)',
      },
    }),
    
    ...(customvariant === 'outline' && {
      backgroundColor: 'transparent',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
    }),
  })
);

export interface BadgeProps
  extends Omit<ChipProps, 'variant'>,
    VariantProps<typeof badgeVariants> {
  className?: string;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <StyledChip
      className={cn(className)}
      customvariant={variant || 'default'}
      {...props}
    />
  );
}

export { Badge, badgeVariants };