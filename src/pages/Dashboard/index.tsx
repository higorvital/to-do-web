import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Menu from '../../components/Menu';
import Tasks from '../../components/Tasks';
import Calendar from '../../components/Calendar';
import ITask from '../../dtos/ITask';
import api from '../../services/api';
import { toast } from 'react-toastify';

import {
  Container,
  Content,
  Sections
} from './styles'
import ICategory from '../../dtos/ICategory';

const Dashboard: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(()=>{

    async function getCategories(){

          try {
              const response = await api.get('/categories');

              setCategories(response.data);

          } catch (err) {

              const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro na autenticação, tente novamente";

              toast(errorMessage, {
                autoClose: 3000,
                type: "error"
              });
      
          }
      }

      getCategories();

  },[]);

  useEffect(()=>{

    async function getTasks(){

      try {

        const response = await api.get<ITask[]>('/tasks', {
          params: {
            day: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          }
        });

        setTasks(response.data);

      } catch (err) {
        
        const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao listar tarefas, tente novamente";

        toast(errorMessage, {
          autoClose: 3000,
          type: "error"
        });
      }
    }

    getTasks();

  },[selectedDate]);

  const editTask = useCallback((editedTask: ITask)=>{

    const editedTasks = tasks.map(task => task.id === editedTask.id ? editedTask : task);

    setTasks(editedTasks);

  },[tasks]);

  const tasksComponentTitle = useMemo(()=>{
    return format(selectedDate, "cccc '|' dd 'de' MMMM", {
        locale: ptBR
    })
  },[selectedDate]);

  const addNewTask = useCallback((task: ITask)=>{

    if(task.date === `${format(selectedDate, 'yyyy-MM-dd')}`){
      setTasks([...tasks, task]);
    }

  },[tasks, selectedDate]);

  const deleteTask = useCallback((deletedTask: ITask)=>{
    const deletedTasks = tasks.filter(task => task.id !== deletedTask.id);

    setTasks(deletedTasks);
  },[tasks]);

  const addNewCategory = useCallback((newCategory: ICategory)=>{
    setCategories([...categories, newCategory]);
  },[categories])

  const editCategory = useCallback((editedCategory: ICategory)=>{
    const editedCategories = categories.map(category => category.id === editedCategory.id ? editedCategory : category);
    setCategories(editedCategories);
  },[categories]);

  const deleteCategory = useCallback((deletedCategory: ICategory)=>{
      const deletedCategories = categories.filter(category => category.id !== deletedCategory.id);

      setCategories(deletedCategories);
  },[categories]);


  return (
    <>
        <Container>
            <Menu 
              categories={categories}
              addNewCategory={addNewCategory}
              editCategory={editCategory}
              deleteCategory={deleteCategory}
              addNewTask={addNewTask}
            />
            <Content>
              <Sections>
                  <Tasks 
                    tasks={tasks}
                    selectedDate={selectedDate}
                    title={tasksComponentTitle}
                    addNewTask={addNewTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    categories={categories}
                  />
                  <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}  />
              </Sections>
            </Content>
        </Container>
      </>
    );
}

export default Dashboard;