import React from 'react';
import { Typography, TypographyProps, styled } from '@mui/material';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const titleVariants = cva(
  '',
  {
    variants: {
      variant: {
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        subtitle1: '',
        subtitle2: '',
        body1: '',
        body2: '',
      },
    },
    defaultVariants: {
      variant: 'h3',
    },
  }
);

const StyledTypography = styled(Typography)<{ customvariant?: string }>(
  ({ customvariant }) => ({
    color: 'hsl(var(--foreground))',
    
    ...(customvariant === 'h1' && {
      fontSize: '2.25rem',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    }),
    
    ...(customvariant === 'h2' && {
      fontSize: '1.875rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.3,
    }),
    
    ...(customvariant === 'h3' && {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.3,
    }),
    
    ...(customvariant === 'h4' && {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    }),
    
    ...(customvariant === 'h5' && {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    }),
    
    ...(customvariant === 'h6' && {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    }),
    
    ...(customvariant === 'subtitle1' && {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: 'hsl(var(--muted-foreground))',
    }),
    
    ...(customvariant === 'subtitle2' && {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: 'hsl(var(--muted-foreground))',
    }),
    
    ...(customvariant === 'body1' && {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    }),
    
    ...(customvariant === 'body2' && {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    }),
  })
);

export interface TitleProps
  extends Omit<TypographyProps, 'variant'>,
    VariantProps<typeof titleVariants> {
  className?: string;
}

const Title = React.forwardRef<HTMLElement, TitleProps>(
  ({ className, variant, children, ...props }, ref) => {
    const Component = variant || 'h3';
    
    return (
      <StyledTypography
        ref={ref}
        component={Component}
        customvariant={variant || 'h3'}
        className={cn(className)}
        {...props}
      >
        {children}
      </StyledTypography>
    );
  }
);

Title.displayName = 'Title';

export { Title, titleVariants };