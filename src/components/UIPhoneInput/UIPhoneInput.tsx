import { UIPhoneInputProps } from './UIPhoneInput.props';
import PhoneInput from 'react-phone-input-2';
import styles from './UIPhoneInput.module.css';
import 'react-phone-input-2/lib/style.css';
import cn from 'classnames';
import { memo, useLayoutEffect, useRef } from 'react';

export const UIPhoneInput = memo(
  ({ ...props }: UIPhoneInputProps): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useLayoutEffect(() => {
      const scrollTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
      inputRef.current?.addEventListener('blur', scrollTop);
      return () => inputRef.current?.removeEventListener('blur', scrollTop);
    }, []);

    return (
      <PhoneInput
        inputClass={cn(styles.input)}
        buttonClass={cn(styles.button)}
        {...props}
        inputProps={{
          ref: inputRef,
        }}
      />
    );
  },
);
