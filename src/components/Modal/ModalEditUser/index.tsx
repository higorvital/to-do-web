import React, { useCallback, useRef } from 'react';
import Modal from '..';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import getValidationErrors from '../../../utils/getValidationErrors';
import Input from '../../Input';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import Button from '../../Button';

import { ContentBox } from './styles';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

interface User {
    id: string;
    name: string;
    email: string;
}

interface MenuEditUserProps{
    user: User;
    isOpen: boolean;
    toggleModal(): void;
}

const MenuEditUser: React.FC<MenuEditUserProps> = ({user, isOpen, toggleModal}) => {
    
    const formRef = useRef<FormHandles>(null);

    const {updateUser} = useAuth();

    const handleSubmit = useCallback(async (data)=>{

        formRef.current?.setErrors({});
    
        try {

            const schema = Yup.object().shape({
                name: Yup.string().required("Nome obrigatório"),
                email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
                password: Yup.string(),
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

            const response = await api.put('/users', data);

            updateUser(response.data);

            toast("Dados alterados com sucesso", {
                autoClose: 3000,
                type: "success"
            });
    
    
        } catch (err) {
    
            if(err instanceof Yup.ValidationError){
                
                const errors = getValidationErrors(err);
        
                formRef.current?.setErrors(errors);
        
                return;
    
            }
    
            toast(err.message, {
                autoClose: 3000,
                type: "error"
            });
        }
  
    },[updateUser]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <ContentBox>
                <h1>Edite seu perfil</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input icon={FiUser} defaultValue={user.name} type="name" name="name" placeholder="Nome" />
                    <Input icon={FiMail} defaultValue={user.email} type="email" name="email" placeholder="E-mail" />
                    <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
                    <Input icon={FiLock} type="password" name="password_confirmation" placeholder="Confirmação da senha" />
                    <Input icon={FiLock} type="password" name="old_password" placeholder="Senha antiga" />
                    <Button>
                        Alterar
                    </Button>
                </Form>
            </ContentBox>
        </Modal>
    );
}

export default MenuEditUser;