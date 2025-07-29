import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextarea = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    minHeight: '80px',
    fontSize: '0.875rem',
    borderRadius: '6px',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    alignItems: 'flex-start',
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

export interface TextareaProps extends Omit<TextFieldProps, 'variant' | 'multiline'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'outlined', rows = 3, ...props }, ref) => {
    return (
      <StyledTextarea
        ref={ref}
        variant={variant}
        multiline
        rows={rows}
        fullWidth
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };