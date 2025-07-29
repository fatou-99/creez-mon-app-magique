import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        outline: '',
        secondary: '',
        ghost: '',
        link: '',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const StyledButton = styled(MuiButton)<{ customvariant?: string; customsize?: string }>(
  ({ theme, customvariant, customsize }) => ({
    // Base styles
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '14px',
    textTransform: 'none',
    transition: 'all 0.2s',
    gap: '8px',
    
    // Variant styles
    ...(customvariant === 'default' && {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--primary) / 0.9)',
      },
    }),
    
    ...(customvariant === 'destructive' && {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--destructive) / 0.9)',
      },
    }),
    
    ...(customvariant === 'outline' && {
      backgroundColor: 'transparent',
      color: 'hsl(var(--foreground))',
      border: '1px solid hsl(var(--border))',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
      },
    }),
    
    ...(customvariant === 'secondary' && {
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--secondary-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--secondary) / 0.8)',
      },
    }),
    
    ...(customvariant === 'ghost' && {
      backgroundColor: 'transparent',
      color: 'hsl(var(--foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
      },
    }),
    
    ...(customvariant === 'link' && {
      backgroundColor: 'transparent',
      color: 'hsl(var(--primary))',
      textDecoration: 'underline',
      textDecorationOffset: '4px',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
    
    // Size styles
    ...(customsize === 'default' && {
      height: '40px',
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }),
    
    ...(customsize === 'sm' && {
      height: '36px',
      borderRadius: '6px',
      paddingLeft: '12px',
      paddingRight: '12px',
    }),
    
    ...(customsize === 'lg' && {
      height: '44px',
      borderRadius: '6px',
      paddingLeft: '32px',
      paddingRight: '32px',
    }),
    
    ...(customsize === 'icon' && {
      height: '40px',
      width: '40px',
      padding: 0,
    }),
  })
);

export interface ButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        customvariant={variant || 'default'}
        customsize={size || 'default'}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };