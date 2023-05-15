import styles from './Message.module.css';
import cn from 'classnames';
import { IMessageProps } from './Message.props';
import SentIcon from '@assets/sent.svg';
import DeliveredIcon from '@assets/delivered.svg';
import ReadIcon from '@assets/read.svg';
import { memo } from 'react';

export const Message = memo(
  ({ message, className, ...props }: IMessageProps): JSX.Element => {
    return (
      <div
        className={cn(styles.message, className, {
          [styles.incoming]: message.type === 'incoming',
          [styles.outgoing]: message.type === 'outgoing',
        })}
        {...props}
      >
        <p className={cn(styles.text)}>{message.textMessage}</p>
        <sub className={cn(styles.info)}>
          {message.timestamp && (
            <span className={cn(styles.time)}>
              {Intl.DateTimeFormat('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              }).format(new Date(message.timestamp! * 1000))}
            </span>
          )}
          {message.type === 'outgoing' && (
            <span className={cn(styles.status)}>
              {message.statusMessage === 'sent' && (
                <img src={SentIcon} alt="sent message" />
              )}
              {message.statusMessage === 'delivered' && (
                <img src={DeliveredIcon} alt="delivered message" />
              )}
              {message.statusMessage === 'read' && (
                <img src={ReadIcon} alt="read message" />
              )}
            </span>
          )}
        </sub>
      </div>
    );
  },
);
