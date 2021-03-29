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
import { toast } from 'react-toastify';
import getValidationErrors from '../../utils/getValidationErrors';

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
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
        password: Yup.string().required("Senha obrigatória"),
        password_confirmation: Yup.string().required("Senha de senha obrigatória").oneOf([Yup.ref('password')],"Senha e confimação não batem")
      });

      await schema.validate(data, {
        abortEarly: true
      });

      await api.post('/users', data);

      history.push('/');

    } catch (err) {

      if(err instanceof Yup.ValidationError){
        
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;

      }

      const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro na autenticação, tente novamente";

      toast(errorMessage, {
        autoClose: 3000,
        type: "error"
      });

    }

  },[history]);

  return (
      <Container>
        <Background />
        <Content>
          <AnimatedContent>
            <ContentBox>
              <h1>Criar sua conta</h1>

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