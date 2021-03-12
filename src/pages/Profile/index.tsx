import React, { useCallback, useRef } from 'react';
import Input from '../../components/Input';
import {FiLock, FiMail, FiUser} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, ContentBox, AnimatedContent} from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-toastify';

interface ProfileCredentials{
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  old_password?: string;
}

const Profile: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const {user} = useAuth();

  const handleSubmit = useCallback(async (data: ProfileCredentials)=>{

    formRef.current?.setErrors({});

    try {

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
        password: Yup.string(),
        // password: Yup.string().when({
        //     is: true,
        //     then: Yup.string().min(6).max(16)
        // }),
        password_confirmation: Yup.string().when('password', {
            is: (val: boolean) => val,
            then: Yup.string().required().oneOf([Yup.ref('password')], "Informe a confirmação de senha").min(6, "Senha mínima de 6 caracteres").max(16, "Senha máxima de 16 caracteres"),
            otherwise: Yup.string()
        }),
        old_password: Yup.string().when('password', {
            is: (val: boolean) => val,
            then: Yup.string().required("Informe a senha antiga"),
            otherwise: Yup.string()
        })
      });

      await schema.validate(data, {
        abortEarly: true
      });

    } catch (err) {

      toast(err.message, {
        autoClose: 3000,
        type: "error"
      });
    }

  },[]);

  return (
      <>
        <Header />
        <Container>
          <Content>
            <AnimatedContent>
              <ContentBox>
                <h1>Alterar dados</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input icon={FiUser} type="text" name="name" placeholder="Nome" defaultValue={user.name} />
                  <Input icon={FiMail} type="email" name="email" placeholder="E-mail" defaultValue={user.email} />
                  <Input icon={FiLock} type="password" name="password" placeholder="Nova senha" />
                  <Input icon={FiLock} type="password" name="password_confirmation" placeholder="Confirmação da senha" />
                  <Input icon={FiLock} type="password" name="old_password" placeholder="Senha antiga" />
                  <Button>
                    Salvar
                  </Button>
                </Form>

              </ContentBox>

            </AnimatedContent>
          </Content>
        </Container>
      </>
  );
}

export default Profile;