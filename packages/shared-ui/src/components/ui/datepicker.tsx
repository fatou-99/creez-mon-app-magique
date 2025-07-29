import * as React from "react";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { fr } from "date-fns/locale";

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

export interface DatePickerComponentProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerComponentProps>(
  ({ label, placeholder, error, helperText, ...props }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <MuiDatePicker
          {...props}
          slots={{
            textField: StyledTextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              label,
              placeholder,
              error,
              helperText,
              inputRef: ref,
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };