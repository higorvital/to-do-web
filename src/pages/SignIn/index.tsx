import React, { useCallback, useRef } from 'react';
import Input from '../../components/Input';
import {FiLock, FiMail} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background, ContentBox, AnimatedContent} from './styles';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface SignInCredentials{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const {signIn} = useAuth()

  const handleSubmit = useCallback(async (data: SignInCredentials)=>{

    formRef.current?.setErrors({});

    try {

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
      });

      await schema.validate(data, {
        abortEarly: true
      });

      const {email, password} = data;

      signIn(email, password);

    } catch (err) {

      if(err instanceof Yup.ValidationError){
        // const errors = getValidationErrors(err);

        return;
      }
    }

  },[signIn]);

  return (
      <Container>
        <Content>
          <AnimatedContent>
            <ContentBox>
              <h1>Faça seu Logon</h1>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
                <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
                <Button>
                  Entrar
                </Button>
              </Form>

              <a href="/sign-up">Não tem conta? Cadastre-se</a>
            </ContentBox>
          </AnimatedContent>
        </Content>
        <Background />
      </Container>
  );
}

export default SignIn;