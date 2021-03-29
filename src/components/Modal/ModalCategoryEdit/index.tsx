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
    DeleteButton,
    SaveButton,
} from './styles';
import Input from '../../Input';
import api from '../../../services/api';
import ICategory from '../../../dtos/ICategory';


interface ModalCategoryEditProps {
  category: ICategory;
  isOpen: boolean;
  toggleModal(): void;
  editCategory(category: ICategory): void;
  deleteCategory(category: ICategory): void;
}

const ModalCategoryEdit: React.FC<ModalCategoryEditProps> = ({category, isOpen, toggleModal, editCategory, deleteCategory}) => {

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

        const response = await api.put<ICategory>(`/categories/${category.id}`, data);

        editCategory(response.data);

        toggleModal();

        toast("Categoria alterada com sucesso", {
          autoClose: 3000,
          type: "success"
        });
      
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
  
    },[category.id, editCategory, toggleModal]);

    const handleDelete = useCallback(async ()=>{
  
      try {
  
        await api.delete(`/categories/${category.id}`);

        deleteCategory(category);

        toggleModal();

        toast("Categoria deletada com sucesso", {
          autoClose: 3000,
          type: "success"
        });
      
      } catch (err) {
      
          if(err instanceof Yup.ValidationError){
              const errors = getValidationErrors(err);
  
              formRef.current?.setErrors(errors);
  
              return;
  
          }

          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao deletar categoria, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
  
      }
  
    },[category, deleteCategory, toggleModal]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Edite a categoria</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                          <Input defaultValue={category.name} type="text" name="name" placeholder="Nome" />                    
                      </FormContent>
                      <Actions>
                          <DeleteButton type="button" onClick={handleDelete}>
                              Deletar
                          </DeleteButton>
                          <SaveButton type="submit">
                              Salvar
                          </SaveButton>
                      </Actions>
                  </Form>
                </ModalContent>
            </Container>
        </Modal>
    );
}

export default ModalCategoryEdit;