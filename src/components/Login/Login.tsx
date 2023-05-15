import { LoginProps } from './Login.props';

import styles from './Login.module.css';
import { UIInput } from '../UIInput/UIInput';
import { UIButton } from '../UIButton/UIButton';
import { ChangeEvent, FormEvent, memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { checkCredentials } from '../../redux/credentials/credentialsSlice';
import { ICredentials } from '@redux/credentials/types/credentials.types';
import { RequestStatus } from '@shared/types/responseStatus';

export const Login = memo(({}: LoginProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.credentials);
  const [form, setForm] = useState<ICredentials>({
    idInstance: '',
    apiTokenInstance: '',
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(checkCredentials(form));
    setForm({ idInstance: '', apiTokenInstance: '' });
  };
  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={submitHandler}>
        <label className={styles.label} htmlFor="idInstance">
          Id Instance
        </label>
        <UIInput
          name="idInstance"
          type="text"
          id="idInstance"
          placeholder="Enter your Id Instance"
          onChange={(e) => changeHandler(e)}
          value={form.idInstance}
        />
        <label className={styles.label} htmlFor="apiTokenInstance">
          Api Token Instance
        </label>
        <UIInput
          name="apiTokenInstance"
          type="text"
          id="apiTokenInstance"
          placeholder="Enter your Api Token Instance"
          onChange={(e) => changeHandler(e)}
          value={form.apiTokenInstance}
        />
        <UIButton
          loading={status === RequestStatus.Loading}
          type="submit"
          aria-label="Login"
        >
          Login
        </UIButton>
      </form>
    </div>
  );
});
