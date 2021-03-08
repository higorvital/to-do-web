import React, { useCallback, useRef } from 'react';
import Input from '../../components/Input';
import {FiLock, FiMail} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background, ContentBox, AnimatedContent} from './styles';
import Button from '../../components/Button';

interface SignUpCredentials{
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpCredentials)=>{

    formRef.current?.setErrors({});

    try {

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        password_confirmation: Yup.string().required().oneOf([Yup.ref('password')])
      });

      await schema.validate(data, {
        abortEarly: true
      });

    } catch (err) {

      console.log('deu erro');

      if(err instanceof Yup.ValidationError){
        // const errors = getValidationErrors(err);

        return;
      }
    }

  },[]);

  return (
      <Container>
        <Background />
        <Content>
          <AnimatedContent>
            <ContentBox>
              <h1>Criar sua conta</h1>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
                <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
                <Input icon={FiLock} type="password" name="password_confirmation" placeholder="Senha" />
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