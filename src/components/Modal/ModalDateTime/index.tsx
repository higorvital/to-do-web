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
import api from '../../../services/api';
import ITask from '../../../dtos/ITask';
import { FaRegClock } from 'react-icons/fa';
import { format } from 'date-fns';
import moment from 'moment';

interface ModalDateTimeProps {
  task: ITask;
  isOpen: boolean;
  toggleModal(): void;
  editTask(category: ITask): void;
}

const ModalDateTime: React.FC<ModalDateTimeProps> = ({task ,isOpen, toggleModal, editTask}) => {

    const formRef = useRef<FormHandles>(null);
    const [useTime, setUseTime] = useState(true);
    const [formTime, setFormTime] = useState(()=>{

      if(task.time){
        return task.time;
      }

      return `${format(new Date(),'HH:mm')}`

    });

    const handleSubmit = useCallback(async (data)=>{

        formRef.current?.setErrors({});
    
        try {
    
          const schema = Yup.object().shape({
            date: Yup.string().test((date)=>moment(date, 'yyyy-MM-dd').isValid()).required(),
            time: Yup.string().test((time)=>moment(time, 'HH:mm').isValid())
          });
    
          await schema.validate(data, {
            abortEarly: true
          });

          let taskTime;

          if(useTime){
            taskTime = {
              hour: Number(data.time.split(':')[0]),
              minute: Number(data.time.split(':')[1]),
            }
          }

          let dateTime = {
            date: {
              year: Number(data.date.split('-')[0]),
              month: Number(data.date.split('-')[1]),
              day: Number(data.date.split('-')[2])    
            },
            time: taskTime
          };

          const response = await api.put<ITask>(`/tasks/${task.id}`, {
            ...dateTime
          });

          editTask(response.data);

          toggleModal();

          toast("Data e hora alteradas com sucesso", {
            autoClose: 3000,
            type: "success"
          });
          
        
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
    
      },[toggleModal, editTask, task.id, useTime]);

      const handleUseTime = useCallback(()=>{
        
        setUseTime(!useTime);

      },[useTime]);

      const handleChangeTime = useCallback((time)=>{

        setFormTime(time);
    
      },[]);

      useEffect(()=>{

        
        if(!isOpen){

          formRef.current?.setData({
            date: task.date
          })

          if(task.time){
            setFormTime(task.time)
          }else{
            setFormTime(`${format(new Date(),'HH:mm')}`);
          }

        }

      },[isOpen, task.time, task.date])

      return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Escola uma data e hora</h4>
                </ModalHeader>
                <ModalContent>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                      <FormContent>
                        <Input type="date" name="date" placeholder="Data" defaultValue={task.date} />
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

export default ModalDateTime;