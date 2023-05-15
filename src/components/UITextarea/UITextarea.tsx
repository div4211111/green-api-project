import styles from './UITextarea.module.css';
import cn from 'classnames';
import { memo, useLayoutEffect, useRef } from 'react';
import { UITextareaProps } from './UITextarea.props';

export const UITextarea = memo(
  ({ className, ...props }: UITextareaProps): JSX.Element => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    useLayoutEffect(() => {
      const scrollTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
      textareaRef.current?.addEventListener('blur', scrollTop);
      return () => textareaRef.current?.removeEventListener('blur', scrollTop);
    }, []);

    return (
      <textarea
        className={cn(styles.textarea, className)}
        {...props}
        ref={textareaRef}
      />
    );
  },
);
