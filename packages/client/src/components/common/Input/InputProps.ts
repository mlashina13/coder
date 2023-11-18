import { TextFieldProps, TextFieldVariants } from '@mui/material';

export type InputProps<Variant extends TextFieldVariants = TextFieldVariants> = {
  variant?: Variant;
} & Omit<TextFieldProps, 'variant'>;
