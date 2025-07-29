import * as React from "react";
import { 
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps as MuiSelectProps,
  SelectChangeEvent
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: 'hsl(var(--muted-foreground))',
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: 'hsl(var(--ring))',
    },
  },
  '& .MuiSelect-select': {
    height: '40px',
    padding: '8px 12px',
    fontSize: '0.875rem',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'hsl(var(--input))',
    borderRadius: '6px',
  },
  '& .MuiSelect-root': {
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
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.875rem',
  color: 'hsl(var(--foreground))',
  backgroundColor: 'hsl(var(--background))',
  '&:hover': {
    backgroundColor: 'hsl(var(--accent))',
  },
  '&.Mui-selected': {
    backgroundColor: 'hsl(var(--accent))',
    '&:hover': {
      backgroundColor: 'hsl(var(--accent))',
    },
  },
}));

export interface SelectProps extends Omit<MuiSelectProps, 'variant'> {
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  options?: { value: string | number; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, variant = 'outlined', options = [], placeholder, children, ...props }, ref) => {
    return (
      <StyledFormControl fullWidth variant={variant}>
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          displayEmpty={!!placeholder}
          {...props}
        >
          {placeholder && (
            <StyledMenuItem value="" disabled>
              {placeholder}
            </StyledMenuItem>
          )}
          {options.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          ))}
          {children}
        </MuiSelect>
      </StyledFormControl>
    );
  }
);

Select.displayName = "Select";

export { Select, StyledMenuItem as SelectItem };