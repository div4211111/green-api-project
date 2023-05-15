import { ChatContainerProps } from './ChatContainer.props';
import styles from './ChatContainer.module.css';
import { Chat } from '@components/Chat/Chat';
import { PhoneForm } from '@components/PhoneForm/PhoneForm';
import { useAppSelector } from '@hooks/redux.hook';
import { memo } from 'react';

export const ChatContainer = memo(({}: ChatContainerProps): JSX.Element => {
  const { currentChat } = useAppSelector((state) => state.chat);
  return (
    <div className={styles.chatContainer}>
      {currentChat && <Chat />}
      {!currentChat && <PhoneForm className={styles.phoneForm} />}
    </div>
  );
});
