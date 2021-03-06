import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';

import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/user';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();

  async function handleUserCreate(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok)
      dispatch(
        userLogin({ username: username.value, passowrd: password.value }),
      );
  }

  return (
    <section className="animeLeft">
      <Head title="Crie a sua conta" description="Criar conta no site Dogs." />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleUserCreate}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
