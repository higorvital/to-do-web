import React, { useCallback, useMemo, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import ITask from '../../../dtos/ITask';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { 
    Container,
    Checked,
    TaskContent,
    DeleteTask
} from './styles';
import ModalTaskEdit from '../../Modal/ModalTaskEdit';
import ICategory from '../../../dtos/ICategory';


interface TaskProps {
    task: ITask;
    categories: ICategory[];
    openModal?: boolean;
    editTask(task: ITask): void;
    deleteTask(task: ITask): void;
    setCurrentTask?(task: ITask): void;
}

const Task: React.FC<TaskProps> = ({ openModal = true, setCurrentTask, task, editTask, deleteTask, categories}) => {

    const [isModalTaskEditOpen, setIsModalTaskEditOpen] = useState(false)

    const toggleModalTaskEditOpen = useCallback(()=>{
        setIsModalTaskEditOpen(!isModalTaskEditOpen);
    },[isModalTaskEditOpen]);

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


    const handleDelete = useCallback(async ()=>{
  
        try {
    
          await api.delete(`/tasks/${task.id}`);
  
          deleteTask(task);
  
          toast("Tarefa deletada com sucesso", {
            autoClose: 3000,
            type: "success"
          });
  
    
        } catch (err) {
            
            const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao deletar a tarefa, tente novamente";
  
            toast(errorMessage, {
              autoClose: 3000,
              type: "error"
            });
    
        }
    
      },[deleteTask, task]);

    const taskDateTimeFormatted = useMemo(()=>{

        let date = task.date.split("-");

        let taskDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));

        let dateFormat;
        
        if(task.time){
            let time = task.time.split(":");

            taskDate.setHours(Number(time[0]));
            taskDate.setMinutes(Number(time[1]));

            dateFormat = "HH:mm"
        }else{
            dateFormat = "dd 'de' MMMM 'de' yyyy";
        }

        return format(taskDate, dateFormat, {
            locale: ptBR
        })

    },[task.date, task.time]);

    const handleClickTask = useCallback(()=>{
        
        if(openModal){
            toggleModalTaskEditOpen();
        }else{
            setCurrentTask && setCurrentTask(task);
        }

    },[openModal, setCurrentTask, task, toggleModalTaskEditOpen]);

    return (
        <>  
            <ModalTaskEdit 
                isOpen={isModalTaskEditOpen}
                toggleModal={toggleModalTaskEditOpen}
                task={task}
                editTask={editTask}
                deleteTask={deleteTask}
                categories={categories}
            />
            <Container>
                <Checked completed={task.completed} onClick={handleComplete}>
                    <FaCheck size={12} />
                </Checked>
                <TaskContent completed={task.completed} onClick={handleClickTask}>
                    <h4>{task.title}</h4>
                    <p> {task.subcategory ? `${task.subcategory.name} | `: ''}{taskDateTimeFormatted}</p>
                </TaskContent>
                {
                    task.completed &&
                    <DeleteTask onClick={handleDelete}>
                        <FaTimes size={12} />
                    </DeleteTask>
                }
            </Container>
        </>
    );
}

export default Task;