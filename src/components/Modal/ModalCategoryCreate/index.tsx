import React, { useCallback, useRef } from 'react';
import Modal from '..';
import * as Yup from 'yup';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { toast } from 'react-toastify';

import {
    Container,
    ModalHeader,
    ModalContent,
    FormContent,
    Actions,
    CancelButton,
    CreateButton,
} from './styles';
import Input from '../../Input';
import api from '../../../services/api';
import ICategory from '../../../dtos/ICategory';


interface ModalCategoryCreateProps{
  isOpen: boolean;
  toggleModal(): void;
  addNewCategory(category: ICategory): void;
}

const ModalCategoryCreate: React.FC<ModalCategoryCreateProps> = ({isOpen, toggleModal, addNewCategory}) => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data)=>{

      formRef.current?.setErrors({});
  
      try {
  
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome da categoria é obrigatório"),
        });
  
        await schema.validate(data, {
          abortEarly: true
        });

        const response = await api.post<ICategory>('/categories', data);

        console.log(response.data);

        addNewCategory(response.data);

        toggleModal();
      
      } catch (err) {
      
          if(err instanceof Yup.ValidationError){
              const errors = getValidationErrors(err);
  
              formRef.current?.setErrors(errors);
  
              return;
  
          }
  
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao criar categoria, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
  
      }
  
    },[addNewCategory, toggleModal]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Crie uma categoria</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                          <Input type="text" name="name" placeholder="Título" />                    
                      </FormContent>
                      <Actions>
                          <CancelButton onClick={toggleModal} type="button">
                              Cancelar
                          </CancelButton>
                          <CreateButton type="submit">
                              Criar
                          </CreateButton>
                      </Actions>
                  </Form>
                </ModalContent>
            </Container>
        </Modal>
    );
}

export default ModalCategoryCreate;