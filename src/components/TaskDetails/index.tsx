import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../Input';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { 
    Container,
    Box,
    BoxHeader,
    BoxContent,
    TaskTitle,
    TaskDateTime,
    TaskCategory,
    ItemTitle,
    Description,
    CreatedAt,
    DeleteTask,
    RestoreTask
} from './styles';
import { FaChevronDown } from 'react-icons/fa';
import ITask from '../../dtos/ITask';
import { parseISO } from 'date-fns/esm';
import api from '../../services/api';
import ModalCategorySelect from '../Modal/ModalCategorySelect';
import ModalSubcategorySelect from '../Modal/ModalSubcategorySelect';
import ICategory from '../../dtos/ICategory';
import ISubcategory from '../../dtos/ISubcategory';
import ModalDateTime from '../Modal/ModalDateTime';

interface TaskDetailsProps{
  modal?: boolean;
  task: ITask;
  categories: ICategory[];
  toggleModal?(): void;
  editTask(task: ITask): void;
  deleteTask(task: ITask): void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({modal = false, task, editTask, deleteTask, toggleModal, categories}) => {

    const titleFormRef = useRef<FormHandles>(null);
    const descriptionFormRef = useRef<FormHandles>(null);

    const [isModalCategorySelectOpen, setIsModalCategorySelectOpen] = useState(false)
    const [isModalSubcategorySelectOpen, setIsModalSubcategorySelectOpen] = useState(false)
    const [isModalDateTimeOpen, setIsModalDateTimeOpen] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();
    const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | undefined>();

    const toggleModalCategorySelectOpen = useCallback(()=>{
      setIsModalCategorySelectOpen(!isModalCategorySelectOpen);
    },[isModalCategorySelectOpen]);

    const toggleModalSubcategorySelectOpen = useCallback(()=>{
      setIsModalSubcategorySelectOpen(!isModalSubcategorySelectOpen);
    },[isModalSubcategorySelectOpen]);

    const toggleModalDateTimeOpen = useCallback(()=>{
      setIsModalDateTimeOpen(!isModalDateTimeOpen);
    },[isModalDateTimeOpen]);

    const handleSubmitTitle = useCallback(async (data)=>{

      titleFormRef.current?.setErrors({});
    
      try {
  
        const schema = Yup.object().shape({
          title: Yup.string().required()
        });
  
        await schema.validate(data, {
          abortEarly: true
        });

        const response = await api.put<ITask>(`/tasks/${task.id}`, {
            ...data
          });

        editTask(response.data);

        toast("Título alterado com sucesso", {
          autoClose: 3000,
          type: "success"
        });
      
      } catch (err) {
      
          if(err instanceof Yup.ValidationError){
              const errors = getValidationErrors(err);
  
              titleFormRef.current?.setErrors(errors);
  
              return;
  
          }
  
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao alterar título, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
  
      }
    
      },[task.id, editTask]);

    const handleSubmitDescription = useCallback(async (data)=>{

        descriptionFormRef.current?.setErrors({});
    
        try {
    
          const schema = Yup.object().shape({
            description: Yup.string()
          });
    
          await schema.validate(data, {
            abortEarly: true
          });

          const response = await api.put<ITask>(`/tasks/${task.id}`, {
            ...data
          });

          editTask(response.data);

          toast("Descrição alterada com sucesso", {
            autoClose: 3000,
            type: "success"
          });
        
        } catch (err) {
        
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
    
                descriptionFormRef.current?.setErrors(errors);
    
                return;
    
            }
    
            const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao alterar descrição, tente novamente";
  
            toast(errorMessage, {
              autoClose: 3000,
              type: "error"
            });
    
        }
    
      },[task.id, editTask]);

    const handleDelete = useCallback(async()=>{

      try {

        await api.delete(`/tasks/${task.id}`);

        deleteTask(task);

        if(modal && toggleModal){
          toggleModal();
        }

        toast("Tarefa deletada com sucesso", {
          autoClose: 3000,
          type: "success"
        });
      
      } catch (err) {
        
        const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao deletar subcategoria, tente novamente";

        toast(errorMessage, {
          autoClose: 3000,
          type: "error"
        });
  
      }

    },[task, deleteTask, modal, toggleModal]);

    const taskCreatedAtFormatted = useMemo(()=>{

      return format(parseISO(task.created_at), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR
      })

    },[task.created_at]);

    const handleComplete = useCallback(async ()=>{

      try {
          await api.patch(`/tasks/${task.id}/completed`);
  
          task.completed = !task.completed;

          editTask(task);
          
      } catch (err) {
          
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao completar tarefa, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
      }


    },[task, editTask]);

    useEffect(()=>{

      let categorySelected;

      if(task.subcategory){
        categorySelected = categories.find(category=> category.id === task.subcategory?.category_id)

      }

      setSelectedCategory(categorySelected);

    },[categories, task.subcategory]);

    useEffect(()=>{

      if(task.subcategory){
        setSelectedSubcategory(task.subcategory);

      }

    },[task.subcategory]);

    useEffect(() => {
      
      if(!isModalCategorySelectOpen && !isModalSubcategorySelectOpen){
        let categorySelected;

        if(task.subcategory){
          categorySelected = categories.find(category=> category.id === task.subcategory?.category_id)
  
        }
  
        setSelectedCategory(categorySelected);
      }

    },[categories, task.subcategory, isModalCategorySelectOpen, isModalSubcategorySelectOpen]);

    const selectedSubcategories = useMemo(()=>{

      if(selectedCategory){
        return selectedCategory.subcategories;
      }

      return [];

    },[selectedCategory])

    const handleSelectSubcategory = useMemo(()=>{

      if(selectedSubcategory){
        return toggleModalSubcategorySelectOpen;
      }

      return toggleModalCategorySelectOpen;

    },[selectedSubcategory, toggleModalSubcategorySelectOpen, toggleModalCategorySelectOpen]);

    const handleEditSubcategory = useCallback(async (subcategory: ISubcategory) => {

      try {

        const response = await api.put<ITask>(`/tasks/${task.id}`, {
          subcategory_id: subcategory.id
        });

        editTask(response.data);

        setSelectedSubcategory(subcategory)

        toast("Subcategoria alterada com sucesso", {
          autoClose: 3000,
          type: "success"
        });

      } catch (err) {

        const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao alterar subcategoria, tente novamente";

        toast(errorMessage, {
          autoClose: 3000,
          type: "error"
        });

      }

    },[task.id, editTask]);

    const taskDateTimeFormatted = useMemo(()=>{

      let date = task.date.split("-");

      let taskDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

      let dateFormat;
      
      if(task.time){
          let time = task.time.split(":");

          taskDate.setHours(Number(time[0]));
          taskDate.setMinutes(Number(time[1]));

          dateFormat = "HH:mm - dd 'de' MMMM 'de' yyyy";

      }else{
          
          dateFormat = "dd 'de' MMMM 'de' yyyy";;

      }

      return format(taskDate, dateFormat, {
          locale: ptBR
      })

    },[task.date, task.time]);

    useEffect(()=>{
      titleFormRef.current?.setData({
        title: task.title
      });

      descriptionFormRef.current?.setData({
        description: task.description
      });


    },[task]);
  
    return (
      <>
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
        <ModalDateTime
          isOpen={isModalDateTimeOpen}
          toggleModal={toggleModalDateTimeOpen}
          editTask={editTask}
          task={task}
        />
        <Container modal={modal}>
            <Box modal={modal}>
                <BoxHeader>
                    <h4>Detalhes da tarefa</h4>
                    {
                      !task.completed &&
                      <button onClick={handleComplete}>
                          <FiCheckCircle size={16} />
                          <span>Marcar como completa</span>
                      </button>
                    }
                </BoxHeader>
                <BoxContent completed={task.completed}>
                    <TaskTitle>
                        <Form ref={titleFormRef} onSubmit={handleSubmitTitle}>
                            <Input defaultValue={task.title} type="text" name="title" />
                        </Form>
                    </TaskTitle>
                    <TaskDateTime>
                      <ItemTitle>Escolha uma data e horário</ItemTitle>
                      <button onClick={toggleModalDateTimeOpen}>
                        <span>
                          {taskDateTimeFormatted}
                        </span>
                      </button>
                    </TaskDateTime>
                    <TaskCategory>
                      <ItemTitle>Subcategoria</ItemTitle>
                      <button onClick={handleSelectSubcategory}>
                        <span>{task.subcategory ? task.subcategory.name : 'Escolha uma subcategoria'}</span>
                        <FaChevronDown size={12} />
                      </button>
                    </TaskCategory>
                    <Description>
                      <ItemTitle>Descrição</ItemTitle>
                      <Form ref={descriptionFormRef} onSubmit={handleSubmitDescription}>
                        <Input type="text" name="description" placeholder="Escreva uma descrição" defaultValue={task.description} />
                      </Form>
                    </Description>
                    <CreatedAt>
                      <ItemTitle>Criada</ItemTitle>
                      <span>{taskCreatedAtFormatted}</span>
                    </CreatedAt>
                    <DeleteTask>
                      <button onClick={handleDelete}>
                        Deletar tarefa
                      </button>
                    </DeleteTask>
                </BoxContent>
                {
                  task.completed &&
                    <RestoreTask>
                      <button onClick={handleComplete}>
                        Restaurar tarefa
                      </button>
                    </RestoreTask>
                }
            </Box>
        </Container>
      </>
    );
}

export default TaskDetails;