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
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string(),
        // password: Yup.string().when({
        //     is: true,
        //     then: Yup.string().min(6).max(16)
        // }),
        password_confirmation: Yup.string().when('password', {
            is: (val: boolean) => val,
            then: Yup.string().required().oneOf([Yup.ref('password')]).min(6).max(16),
            otherwise: Yup.string()
        }),
        old_password: Yup.string().when('password', {
            is: (val: boolean) => val,
            then: Yup.string().required(),
            otherwise: Yup.string()
        })
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