import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef} from 'react';
import * as Yup from 'yup';

import Button from '../Button';
import Input from '../Input';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import Modal from '../Modal';
import { toast } from 'react-toastify';

interface SubcategoryForm{
    name: string;
}

interface Subcategory{
  id: string;
  name: string;
  category_id: string;
  
}

interface Category{
  id: string;
  name: string;
}

interface SubcategoryModalProps{
    category: Category;
    subcategory: Subcategory | null;
    isOpen: boolean;
    toggleModal(open: boolean): void;
    createSubcategory(subcategory: Omit<Subcategory, 'id'>): void;
    updateSubcategory(subcategory: Subcategory): void;
}

const SubcategoryModal: React.FC<SubcategoryModalProps> = ({isOpen, toggleModal, createSubcategory, updateSubcategory, category, subcategory}) => {

    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(async (data: SubcategoryForm)=>{

        formRef.current?.setErrors({});

        try {
    
          const schema = Yup.object().shape({
            name: Yup.string().required()
          });
    
          await schema.validate(data, {
            abortEarly: true
          });

          if(subcategory){
            updateSubcategory({...subcategory, ...data});

          }else{

            createSubcategory({...data, category_id: category.id});
          }


          toggleModal(false);
    
        } catch (err) {
    
          toast(err.message, {
            autoClose: 3000,
            type: "error"
          });

        }
    
      },[toggleModal, createSubcategory, subcategory, updateSubcategory, category]);



  return (
      <Modal isOpen={isOpen} toggleModal={toggleModal} >

        <h1>Nova subcategoria - {category.name}</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input defaultValue={subcategory?.name} type="text" name="name" placeholder="Nome" />
            <Button>
                Criar
            </Button>
        </Form>
        
      </Modal>
  );
}

export default SubcategoryModal;