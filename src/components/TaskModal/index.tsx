import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment'

import Button from '../Button';
import Input from '../Input';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import { Container, AnimatedContent, Content, InputTimePicker } from './styles';
import { FaRegClock } from 'react-icons/fa';
import { format } from 'date-fns';

interface Task{
    id?: string;
    title: string;
    day: number;
    month: number;
    year: number;
    hour?: number;
    minute?: number;
    time?: string;

}

interface TaskProps{
    task: Task | null;
    isOpen: boolean;
    toggleModal(open: boolean): void;
    createTask(task: Task): void;
    updateTask(task: Task): void;
}

const TaskModal: React.FC<TaskProps> = ({task, isOpen, toggleModal, createTask, updateTask}) => {

    const containerRef = useRef<HTMLDivElement>(null); 
    const animatedRef = useRef<HTMLDivElement>(null); 

    const formRef = useRef<FormHandles>(null);
    const [useTime, setUseTime] = useState(true);
    const [formTime,setFormTime] = useState(`${format(new Date(),'HH:mm')}`);
    const [formDate,setFormDate] = useState(`${format(new Date(),'yyyy-MM-dd')}`);

    const handleSubmit = useCallback(async (data: Task)=>{

        formRef.current?.setErrors({});

        try {
    
          const schema = Yup.object().shape({
            title: Yup.string().required()
          });

          const schemaDate = Yup.string().test((date)=>moment(date, 'yyyy-MM-dd').isValid()).required(); 
          const schemaTime = Yup.string().test((time)=>moment(time, 'HH:mm').isValid()); 
    
          await schema.validate(data, {
            abortEarly: true
          });

          await schemaDate.validate(formDate, {
            abortEarly: true
          });

          await schemaTime.validate(formTime, {
            abortEarly: true
          });

          if(!useTime){
            delete data.hour;
            delete data.minute;
          }else {
            data.hour = Number(formTime.split(':')[0]);
            data.minute = Number(formTime.split(':')[1]);
          }
          
          data.year = Number(formDate.split('-')[0]);
          data.month = Number(formDate.split('-')[1]);
          data.day = Number(formDate.split('-')[2]);

          console.log(data);

          if(task){
            updateTask({...data, id: task.id});
          }else{
            createTask(data)
          }

          toggleModal(false);
    
        } catch (err) {
    
          console.log(err);
          if(err instanceof Yup.ValidationError){
            // const errors = getValidationErrors(err);
    
            return;
          }
        }
    
      },[task, formTime, formDate, useTime, createTask, updateTask, toggleModal]);

      const handleModalDialog = useCallback((event)=>{

        if(event.target === animatedRef.current || event.target === containerRef.current){
          toggleModal(false);
        }

      },[toggleModal]);

      const handleUseTime = useCallback(()=>{
        
        setUseTime(!useTime);

      },[useTime]);

  useEffect(()=>{
    
    const time = task && task.hour && task.minute ? `${task.hour}:${task.minute}` : `${format(new Date(),'HH:mm')}`;

    setFormTime(time);

    const date = task ? `${format(new Date(task.year,task.month - 1,task.day),'yyyy-MM-dd')}` : `${format(new Date(),'yyyy-MM-dd')}`;

    setFormDate(date);


  },[task]);

  useEffect(()=>{

    !isOpen && setUseTime(true);

  },[isOpen])

  const handleChangeDate = useCallback((event)=>{

    setFormDate(event.target.value);

  },[]);

  const handleChangeTime = useCallback((time)=>{

    setFormTime(time);

  },[]);


  return (
      <Container ref={containerRef} isOpen={isOpen} onClick={handleModalDialog}>
          <AnimatedContent ref={animatedRef}>
            <Content>
                <h1>Nova tarefa</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input defaultValue={task?.title} type="text" name="title" placeholder="Título" />
                    <InputTimePicker isActive={useTime}>
                      <input type="date" value={formDate} onChange={handleChangeDate}/>
                    </InputTimePicker>
                    <InputTimePicker isActive={useTime}>
                      <TimePicker value={formTime} disableClock={true} clearIcon={null} onChange={handleChangeTime} />
                      <button type="button" className="btnUseClock" onClick={handleUseTime}>
                        <FaRegClock size={16} />
                      </button>
                    </InputTimePicker>
                    <Button>
                        {task ? 'Editar': 'Criar'}
                    </Button>
                </Form>

            </Content>
          </AnimatedContent>
      </Container>
  );
}

export default TaskModal;