import { ChatProps } from './Chat.props';
import styles from './Chat.module.css';
import cn from 'classnames';
import { UIButton } from '@components/UIButton/UIButton';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { Message } from '@components/Message/Message';
import {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { sendMessage } from '@redux/chat/thunks/sendMesasge.thunk';
import { recieveNotification } from '@redux/chat/thunks/recieveNotification.thunk';
import { deleteNotification } from '@redux/chat/thunks/deleteNotification.thunk';
import SentButtonIcon from '@assets/sentButton.svg';
import UserAvatatIcon from '@assets/userAvatar.svg';
import { resetChat } from '@redux/chat/chat.slice';
import { resetCredentials } from '@redux/credentials/credentialsSlice';
import { UITextarea } from '@components/UITextarea/UITextarea';

export const Chat = memo(({ className, ...props }: ChatProps): JSX.Element => {
  const { messages, currentChat, currentChatAvatar, currentChatUserName } =
    useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const scrollToRef = useRef<HTMLDivElement | null>(null);

  const sendHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(
      sendMessage({
        textMessage: currentMessage,
        timestamp: Math.floor(Date.now() / 1000),
      }),
    );
    setCurrentMessage('');
  };

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(event.target.value);
    event.target.style.height = '1px';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(recieveNotification());
      await dispatch(deleteNotification());
    }, 5000);
    return () => clearInterval(interval);
  });

  useLayoutEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollTo({
        top: scrollToRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className={cn(styles.chat, className)} {...props}>
      <div className={styles.header}>
        <div className={styles.contact}>
          <img
            src={currentChatAvatar !== '' ? currentChatAvatar : UserAvatatIcon}
            alt={currentChatUserName}
          />
          <span>
            {currentChatUserName !== ''
              ? currentChatUserName
              : currentChat.slice(0, -5)}
          </span>
        </div>
        <div className={styles.buttons}>
          <UIButton onClick={() => dispatch(resetChat())} aria-label="New chat">
            New
          </UIButton>
          <UIButton
            onClick={() => {
              dispatch(resetChat());
              dispatch(resetCredentials());
            }}
            aria-label="Logout"
          >
            Logout
          </UIButton>
        </div>
      </div>
      <div className={styles.body} ref={scrollToRef}>
        {messages.map((message) => (
          <div
            className={cn(styles.row, {
              [styles.incoming]: message.type === 'incoming',
              [styles.outgoing]: message.type === 'outgoing',
            })}
            key={message.idMessage}
          >
            <Message message={message} />
          </div>
        ))}
      </div>
      <form className={styles.footer} onSubmit={sendHandler}>
        <UITextarea
          className={styles.input}
          value={currentMessage}
          onChange={(e) => changeHandler(e)}
          placeholder="Enter your message..."
          rows={1}
        />
        <button type="submit" className={styles.button}>
          <img
            src={SentButtonIcon}
            alt="sent message"
            title="sent message"
            aria-label="sent message"
          />
        </button>
      </form>
    </div>
  );
});
