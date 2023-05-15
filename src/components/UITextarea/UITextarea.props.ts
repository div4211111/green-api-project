import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export interface UITextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}
