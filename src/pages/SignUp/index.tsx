import React, { useCallback, useRef } from 'react';
import Input from '../../components/Input';
import {FiLock, FiMail, FiUser} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background, ContentBox, AnimatedContent} from './styles';
import Button from '../../components/Button';
import api from '../../services/api';
import { useHistory } from 'react-router';

interface SignUpCredentials{
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpCredentials)=>{

    formRef.current?.setErrors({});

    try {

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        password_confirmation: Yup.string().required().oneOf([Yup.ref('password')])
      });

      await schema.validate(data, {
        abortEarly: true
      });

      await api.post('/users', data);

      history.push('/');

    } catch (err) {

      console.log('deu erro');

      if(err instanceof Yup.ValidationError){
        // const errors = getValidationErrors(err);

        return;
      }
    }

  },[history]);

  return (
      <Container>
        <Background />
        <Content>
          <AnimatedContent>
            <ContentBox>
              <h1>Criar sua contaa</h1>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input icon={FiUser} type="name" name="name" placeholder="Nome" />
                <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
                <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
                <Input icon={FiLock} type="password" name="password_confirmation" placeholder="Confirmação da senha" />
                <Button>
                  Cadastrar
                </Button>
              </Form>

              <a href="/">Voltar</a>
            </ContentBox>

          </AnimatedContent>
        </Content>
      </Container>
  );
}

export default SignUp;