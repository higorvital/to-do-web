import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '..';
import * as Yup from 'yup';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { toast } from 'react-toastify';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import {
    Container,
    ModalHeader,
    ModalContent,
    FormContent,
    Actions,
    CancelButton,
    CreateButton,
    InputTimePicker,
} from './styles';
import Input from '../../Input';
import { FaRegClock } from 'react-icons/fa';
import { format } from 'date-fns';

interface ModalDateTimeTaskCreateProps {
  isOpen: boolean;
  toggleModal(): void;
  setDateTime(dateTime: DateTimeParams): void;
}

interface DateTimeParams{
  date: string;
  time?: string;
}

const ModalDateTimeTaskCreate: React.FC<ModalDateTimeTaskCreateProps> = ({isOpen, toggleModal, setDateTime}) => {

    const formRef = useRef<FormHandles>(null);
    const [useTime, setUseTime] = useState(true);
    const [formTime, setFormTime] = useState(`${format(new Date(),'HH:mm')}`);

    const handleSubmit = useCallback(async (data)=>{

        formRef.current?.setErrors({});
    
        try {
    
          setDateTime({
            date: data.date,
            time: useTime ? data.time : undefined
          });

          toggleModal();
          
        
        } catch (err) {
        
          if(err instanceof Yup.ValidationError){
            
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
  
          }
    
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao alterar data e hora, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
    
        }
    
      },[toggleModal, setDateTime, useTime]);

      const handleUseTime = useCallback(()=>{
        
        setUseTime(!useTime);

      },[useTime]);

      const handleChangeTime = useCallback((time)=>{

        setFormTime(time);
    
      },[]);

      useEffect(()=>{

        if(!isOpen){

          formRef.current?.setData({
            date: `${format(new Date(),'yyyy-MM-dd')}`
          })

          setFormTime(`${format(new Date(),'HH:mm')}`);

        }

      },[isOpen]);
      

      return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Escola uma data e hora</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                        <Input type="date" name="date" placeholder="Data" defaultValue={`${format(new Date(),'yyyy-MM-dd')}`} />
                        <Input type="hidden" name="time" value={formTime} />
                        <InputTimePicker isActive={useTime}>
                          <TimePicker value={formTime} disableClock={true} clearIcon={null} onChange={handleChangeTime} />
                          <button type="button" className="btnUseClock" onClick={handleUseTime}>
                            <FaRegClock size={16} />
                          </button>
                        </InputTimePicker>
                      </FormContent>
                      <Actions>
                          <CancelButton type="button" onClick={toggleModal}>
                              Cancelar
                          </CancelButton>
                          <CreateButton type="submit">
                              Alterar
                          </CreateButton>
                      </Actions>
                  </Form>
                </ModalContent>
            </Container>
        </Modal>
      );
}

export default ModalDateTimeTaskCreate;