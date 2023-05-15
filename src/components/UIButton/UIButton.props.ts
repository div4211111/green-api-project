import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface UIButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  loading?: boolean;
}
