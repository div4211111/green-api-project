import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface UIInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
