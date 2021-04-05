import React, { useCallback, useMemo, useRef } from 'react';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import { 
    Container,
    Title,
    Box,
    TaskList,
    TaskForm
} from './styles';
import Input from '../Input';
import { toast } from 'react-toastify';
import getValidationErrors from '../../utils/getValidationErrors';
import Task from './Task';
import api from '../../services/api';
import ITask from '../../dtos/ITask';
import ICategory from '../../dtos/ICategory';
import ISubcategory from '../../dtos/ISubcategory';


interface TasksProps{
  tasks: ITask[];
  title: string;
  selectedDate?: Date;
  subcategory?: ISubcategory;
  categories: ICategory[];
  addNewTask(task: ITask): void;
  editTask(task: ITask): void;
  deleteTask(task: ITask): void;
  setCurrentTask?(task: ITask): void;
}

const Tasks: React.FC<TasksProps> = ({tasks, title, addNewTask, subcategory, setCurrentTask, selectedDate, editTask, deleteTask, categories}) => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data)=>{

      formRef.current?.setErrors({});
  
      try {
  
        const schema = Yup.object().shape({
          title: Yup.string().required("Título da tarefa obrigatório"),
        });
  
        await schema.validate(data, {
          abortEarly: true
        });    

        let response;

        if(selectedDate){
          
          response = await api.post<ITask>('/tasks', {
            ...data,
            date: {
              day: selectedDate.getDate(),
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            }
          });

        }else if(subcategory) {
          response = await api.post<ITask>('/tasks', {
            ...data,
            subcategory_id: subcategory.id
          });
        }else {
          throw new Error("Erro ao adicionar subcategoria");
        }

        addNewTask(response.data);

        toast("Tarefa criada com sucesso", {
          autoClose: 3000,
          type: "success"
        });

        formRef.current?.reset()
  
      } catch (err) {
  
          if(err instanceof Yup.ValidationError){
              const errors = getValidationErrors(err);
  
              formRef.current?.setErrors(errors);
  
              return;
  
          }
          
          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao criar a tarefa, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });
  
      }
  
    },[addNewTask, selectedDate, subcategory]);

    const openModal = useMemo(()=>{
      
      return !subcategory;

    },[subcategory]);

    return (
      <Container>
            <Title>
                <h4>
                    {title}
                </h4>
            </Title>
            <Box>
                <TaskList>
                  {
                    tasks.map(task => (
                      <Task 
                        key={task.id}
                        task={task} 
                        editTask={editTask}
                        deleteTask={deleteTask}
                        categories={categories}
                        openModal={openModal}
                        setCurrentTask={setCurrentTask}
                      />
                    ))
                  }
                </TaskList>
                {
                  (
                    <TaskForm>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input type="text" name="title" placeholder="Adicione uma nova tarefa" />
                        </Form>
                    </TaskForm>
                  )
                }
            </Box>
        
      </Container>
    );
}

export default Tasks;