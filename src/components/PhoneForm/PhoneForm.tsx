import { PhoneFormProps } from './PhoneForm.props';
import styles from './PhoneForm.module.css';
import cn from 'classnames';
import { UIPhoneInput } from '@components/UIPhoneInput/UIPhoneInput';
import { FormEvent, memo, useState } from 'react';
import { useAppDispatch } from '@hooks/redux.hook';
import { setCurrentChat } from '@redux/chat/chat.slice';
import { getContactInfo } from '@redux/chat/thunks/getContactInfo.thunk';
import { UIButton } from '@components/UIButton/UIButton';

export const PhoneForm = memo(
  ({ className, ...props }: PhoneFormProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const submitHandler = async (event: FormEvent) => {
      event.preventDefault();
      dispatch(setCurrentChat(phoneNumber + '@c.us'));
      await dispatch(getContactInfo(phoneNumber + '@c.us'));
    };
    return (
      <form
        className={cn(styles.phoneForm, className)}
        onSubmit={submitHandler}
        {...props}
      >
        <UIPhoneInput
          country={'ru'}
          onChange={setPhoneNumber}
          value={phoneNumber}
        />
        <UIButton type="submit" aria-label="Create chat">
          Create chat
        </UIButton>
      </form>
    );
  },
);
