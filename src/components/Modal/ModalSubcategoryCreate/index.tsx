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
import ISubcategory from '../../../dtos/ISubcategory';

 
interface ModalSubcategoryCreateProps {
  category: ICategory;
  isOpen: boolean;
  toggleModal(): void;
  editCategory(category: ICategory): void;
}

const ModalSubcategoryCreate: React.FC<ModalSubcategoryCreateProps> = ({category ,isOpen, toggleModal, editCategory}) => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data)=>{

        formRef.current?.setErrors({});
    
        try {
    
          const schema = Yup.object().shape({
            name: Yup.string().required("Nome da subcategoria é obrigatório"),
          });
    
          await schema.validate(data, {
            abortEarly: true
          });

          const response = await api.post<ISubcategory>('/subcategories', {
            ...data,
            category_id: category.id
          })

          category.subcategories.push(response.data);

          editCategory(category);

          toggleModal();

          toast("Subcategoria criada com sucesso", {
            autoClose: 3000,
            type: "success"
          });
          
        
        } catch (err) {
        
          if(err instanceof Yup.ValidationError){
            
              const errors = getValidationErrors(err);
  
              formRef.current?.setErrors(errors);
  
              return;
  
          }
    
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao criar subcategoria, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
    
        }
    
      },[category, editCategory, toggleModal]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Crie uma subcategoria</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                          <Input type="text" name="name" placeholder="Título" />                    
                      </FormContent>
                      <Actions>
                          <CancelButton type="button">
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

export default ModalSubcategoryCreate;