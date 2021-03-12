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

interface Category{
    name: string;
}

interface CategoryModalProps{
    isOpen: boolean;
    toggleModal(open: boolean): void;
    createCategory(category: Category): void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({isOpen, toggleModal, createCategory}) => {

    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(async (data: Category)=>{

        formRef.current?.setErrors({});

        try {
    
          const schema = Yup.object().shape({
            name: Yup.string().required()
          });
    
          await schema.validate(data, {
            abortEarly: true
          });

          createCategory(data);

          toggleModal(false);
    
        } catch (err) {
    
          toast(err.message, {
            autoClose: 3000,
            type: "error"
          });

        }
    
      },[toggleModal, createCategory]);



  return (
      <Modal isOpen={isOpen} toggleModal={toggleModal} >

        <h1>Nova categoria</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Nome" />
            <Button>
                Criar
            </Button>
        </Form>
        
      </Modal>
  );
}

export default CategoryModal;