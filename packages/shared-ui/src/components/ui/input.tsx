import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '40px',
    fontSize: '0.875rem',
    borderRadius: '6px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'hsl(var(--border))',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'hsl(var(--ring))',
        borderWidth: '2px',
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'hsl(var(--input))',
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    color: 'hsl(var(--foreground))',
    '&::placeholder': {
      color: 'hsl(var(--muted-foreground))',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'hsl(var(--muted-foreground))',
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: 'hsl(var(--ring))',
    },
  },
}));

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outlined', ...props }, ref) => {
    return (
      <StyledTextField
        ref={ref}
        variant={variant}
        fullWidth
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };