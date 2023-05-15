import { UIButtonProps } from './UIButton.props';
import styles from './UIButton.module.css';
import { memo } from 'react';

export const UIButton = memo(
  ({ children, loading = false, ...props }: UIButtonProps): JSX.Element => {
    return (
      <button className={styles.button} {...props}>
        {!loading ? children : 'Loading...'}
      </button>
    );
  },
);
