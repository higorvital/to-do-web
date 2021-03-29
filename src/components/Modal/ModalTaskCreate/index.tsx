import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '..';
import * as Yup from 'yup';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Input from '../../Input';
import { FaChevronDown } from 'react-icons/fa';

import { 
  Container,
  FormContent,
  TaskCategory,
  ItemTitle,
  AddTaskButton,
  TaskDateTime,
} from './styles';
import ModalCategorySelect from '../ModalCategorySelect';
import ModalSubcategorySelect from '../ModalSubcategorySelect';
import ModalDateTimeTaskCreate from '../ModalDateTimeTaskCreate';
import ICategory from '../../../dtos/ICategory';
import ISubcategory from '../../../dtos/ISubcategory';
import moment from 'moment';
import ITask from '../../../dtos/ITask';
import api from '../../../services/api';

interface ModalTaskCreateProps {
  isOpen: boolean;
  categories: ICategory[];
  toggleModal(): void;
  addNewTask(task: ITask): void;
}

interface DateTimeParams{
  date: string;
  time?: string;
}


const ModalTaskCreate: React.FC<ModalTaskCreateProps> = ({isOpen, toggleModal, categories, addNewTask}) => {

    const [dateTime, setDateTime] = useState<DateTimeParams>({
      date: `${format(new Date(),'yyyy-MM-dd')}`
    });
    const [isModalCategorySelectOpen, setIsModalCategorySelectOpen] = useState(false)
    const [isModalSubcategorySelectOpen, setIsModalSubcategorySelectOpen] = useState(false)
    const [isModalDateTimeOpen, setIsModalDateTimeOpen] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();
    const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | undefined>();

    const formRef = useRef<FormHandles>(null);

    const toggleModalCategorySelectOpen = useCallback(()=>{
      setIsModalCategorySelectOpen(!isModalCategorySelectOpen);
    },[isModalCategorySelectOpen]);

    const toggleModalSubcategorySelectOpen = useCallback(()=>{
      setIsModalSubcategorySelectOpen(!isModalSubcategorySelectOpen);
    },[isModalSubcategorySelectOpen]);

    const toggleModalDateTimeOpen = useCallback(()=>{
      setIsModalDateTimeOpen(!isModalDateTimeOpen);
    },[isModalDateTimeOpen]);


    const handleSubmit = useCallback(async (data)=>{


        formRef.current?.setErrors({});
    
        try {
    
          const schema = Yup.object().shape({
            title: Yup.string().required("Título da tarefa obrigatório"),
            date: Yup.string().test((date)=>moment(date, 'yyyy-MM-dd').isValid()).required(),
            subcategory_id: Yup.string()
          });
              
          await schema.validate(data, {
            abortEarly: true
          });

          if(data.time){

            const schemaTime = Yup.object().shape({
              time: Yup.string().test((time)=>moment(time, 'HH:mm').isValid()),
            });

            await schemaTime.validate(data, {
              abortEarly: true
            });

          }
          
          let taskTime;

          if(data.time){
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

          console.log({
            ...data,
            ...dateTime,
          });

          const response = await api.post<ITask>('/tasks', {
            ...data,
            ...dateTime,
          })

          addNewTask(response.data);

          toggleModal();

          toast("Tarefa criada com sucesso", {
            autoClose: 3000,
            type: "success"
          });
        
        } catch (err) {
        
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
    
                formRef.current?.setErrors(errors);
        
            }
    
            const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao criar tarefa, tente novamente";

            toast(errorMessage, {
              autoClose: 3000,
              type: "error"
            });
    
        }
    
      },[addNewTask, toggleModal]);

      const selectedSubcategories = useMemo(()=>{

        if(selectedCategory){
          return selectedCategory.subcategories;
        }
  
        return [];
  
      },[selectedCategory])

      const handleEditSubcategory = useCallback(async (subcategory: ISubcategory) => {
  
          setSelectedSubcategory(subcategory)
  
      },[]);

      const taskDateTimeFormatted = useMemo(()=>{

        let date = dateTime.date.split("-");
  
        let taskDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
  
        let dateFormat;
        
        if(dateTime.time){
            let time = dateTime.time.split(":");
  
            taskDate.setHours(Number(time[0]));
            taskDate.setMinutes(Number(time[1]));
  
            dateFormat = "HH:mm - dd 'de' MMMM 'de' yyyy";
  
        }else{
            
            dateFormat = "dd 'de' MMMM 'de' yyyy";;
  
        }
  
        return format(taskDate, dateFormat, {
            locale: ptBR
        })
  
      },[dateTime]);

      const handleSelectSubcategory = useMemo(()=>{

        if(selectedSubcategory){
          return toggleModalSubcategorySelectOpen;
        }
  
        return toggleModalCategorySelectOpen;
  
      },[selectedSubcategory, toggleModalSubcategorySelectOpen, toggleModalCategorySelectOpen]);

      useEffect(()=>{

        if(!isOpen){
          formRef.current?.setData({
            title: ''
          });

          setDateTime({
            date: `${format(new Date(),'yyyy-MM-dd')}`
          });

          setSelectedSubcategory(undefined);
        }

      },[isOpen]);
    

      return (
        <>
          <Modal isOpen={isOpen} toggleModal={toggleModal}>
              <Container>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormContent>
                      <Input type="text" name="title" placeholder="Eu quero ..." />

                      <TaskDateTime>
                        <ItemTitle>Escolha uma data e horário</ItemTitle>
                        <button type="button" onClick={toggleModalDateTimeOpen}>
                          <span>
                            {taskDateTimeFormatted}
                          </span>
                        </button>
                      </TaskDateTime>

                      <TaskCategory>
                        <ItemTitle>Subcategoria</ItemTitle>
                        <button type="button" onClick={handleSelectSubcategory}>
                          <span>{selectedSubcategory ? selectedSubcategory.name : 'Escolha uma subcategoria'}</span>
                          <FaChevronDown size={12} />
                        </button>
                      </TaskCategory>

                      <Input type="hidden" name="date" value={dateTime.date} />
                      {
                        dateTime.time &&
                        <Input type="hidden" name="time" value={dateTime.time} />
                      }
                      { 
                        selectedSubcategory &&
                        <Input type="hidden" name="subcategory_id" value={selectedSubcategory?.id} />
                      }
                    </FormContent>

                    <AddTaskButton type="submit">
                        Adicionar tarefa
                    </AddTaskButton>
                  </Form>
              </Container>
          </Modal>

          <ModalCategorySelect 
            isOpen={isModalCategorySelectOpen}
            toggleModal={toggleModalCategorySelectOpen} 
            toggleModalSubcategorySelect={toggleModalSubcategorySelectOpen}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <ModalSubcategorySelect 
            isOpen={isModalSubcategorySelectOpen}
            toggleModal={toggleModalSubcategorySelectOpen}
            subcategories={selectedSubcategories}
            handleEditSubcategory={handleEditSubcategory}
            selectedSubcategory={selectedSubcategory}
            toggleModalCategorySelect={toggleModalCategorySelectOpen}
          />
          <ModalDateTimeTaskCreate
            isOpen={isModalDateTimeOpen}
            toggleModal={toggleModalDateTimeOpen}
            setDateTime={setDateTime}
          />


        </>
      );
}

export default ModalTaskCreate;