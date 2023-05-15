import { UIInputProps } from './UIInput.props';
import styles from './UIInput.module.css';
import cn from 'classnames';
import { memo, useLayoutEffect, useRef } from 'react';

export const UIInput = memo(
  ({ className, ...props }: UIInputProps): JSX.Element => {
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
      <input
        className={cn(styles.input, className)}
        {...props}
        ref={inputRef}
      />
    );
  },
);
