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
import ISubcategory from '../../../dtos/ISubcategory';


interface ModalSubcategoryEditProps {
  category: ICategory;
  subcategory: ISubcategory;
  isOpen: boolean;
  toggleModal(): void;
  editCategory(category: ICategory): void;
}

const ModalSubcategoryEdit: React.FC<ModalSubcategoryEditProps> = ({category, subcategory, isOpen, toggleModal, editCategory}) => {

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

        const response = await api.put<ISubcategory>(`/subcategories/${subcategory.id}`, {
          ...subcategory,
          ...data
        });

        category.subcategories = category.subcategories.map(sub => sub.id === subcategory.id ? response.data : sub);

        editCategory(category);

        toggleModal();

        toast("Subcategoria alterada com sucesso", {
          autoClose: 3000,
          type: "success"
        });
        
      
      } catch (err) {
      
        if(err instanceof Yup.ValidationError){
          
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;

        }
  
        const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao editar a subcategoria, tente novamente";

        toast(errorMessage, {
          autoClose: 3000,
          type: "error"
        });
  
      }
  
    },[category, subcategory, editCategory, toggleModal]);

    const handleDelete = useCallback(async ()=>{
  
      try {
  
        await api.delete(`/subcategories/${subcategory.id}`);

        category.subcategories = category.subcategories.filter(sub => sub.id !== subcategory.id);

        editCategory(category);

        toggleModal();

        toast("Subategoria deletada com sucesso", {
          autoClose: 3000,
          type: "success"
        });
      
      } catch (err) {
      
          if(err instanceof Yup.ValidationError){
              const errors = getValidationErrors(err);
  
              formRef.current?.setErrors(errors);
  
              return;
  
          }

          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao deletar subcategoria, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
  
      }
  
    },[category, subcategory.id, editCategory, toggleModal]);


    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Edite a subcategoria</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                          <Input defaultValue={subcategory.name} type="text" name="name" placeholder="Nome" />                    
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

export default ModalSubcategoryEdit;