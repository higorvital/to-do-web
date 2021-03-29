import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import {
    Container,
    Content,
    Sections
} from './styles'
import Menu from '../../components/Menu';
import ICategory from '../../dtos/ICategory';
import Tasks from '../../components/Tasks';
import ITask from '../../dtos/ITask';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ISubcategory from '../../dtos/ISubcategory';
import TaskDetails from '../../components/TaskDetails';

interface SubcategoryParams{
  subcategory_id: string;
}

const Subcategory: React.FC = () => {

  const {subcategory_id} = useParams<SubcategoryParams>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [subcategory, setSubcategory] = useState<ISubcategory>({} as ISubcategory)
  const [currentTask, setCurrentTask] = useState<ITask>();


  useEffect(()=>{

    async function getSubcategory(){

        try {
            const response = await api.get<ISubcategory>(`/subcategories/${subcategory_id}`);

            console.log("sub: "+response.data)
            setSubcategory(response.data);

        } catch (err) {

          const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao listar subcategoria, tente novamente";

          toast(errorMessage, {
            autoClose: 3000,
            type: "error"
          });

        }
      }

      getSubcategory();

  },[subcategory_id]);

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

        const response = await api.get<ITask[]>(`/subcategories/${subcategory_id}/tasks`);

        setTasks(response.data);

        // if(tasks.length > 0){
        //   setCurrentTask(tasks[0]);
        // }

      } catch (err) {
        
        const errorMessage = err?.response?.data?.message ?  err?.response?.data?.message : "Erro ao listar tarefas, tente novamente";

        toast(errorMessage, {
          autoClose: 3000,
          type: "error"
        });
      }
    }

    getTasks();

  },[subcategory_id]);

  useEffect(()=>{

    if(tasks.length > 0){

      setCurrentTask(tasks[0])
    }

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

  const tasksComponentTitle = useMemo(()=>{
    return subcategory.name;
  },[subcategory.name]);

  const addNewTask = useCallback((task: ITask)=>{

    if(task.subcategory?.id === subcategory.id){
      setTasks([...tasks, task]);
    }

  },[tasks, subcategory.id]);

  const deleteTask = useCallback((deletedTask: ITask)=>{
    const deletedTasks = tasks.filter(task => task.id !== deletedTask.id);

    setTasks(deletedTasks);
  },[tasks]);

  const editTask = useCallback((editedTask: ITask)=>{

    if(editedTask.subcategory?.id === subcategory.id){

      const editedTasks = tasks.map(task => task.id === editedTask.id ? editedTask : task);
  
      setTasks(editedTasks);

    }else{

      deleteTask(editedTask);

      setCurrentTask(undefined);

    }

  },[tasks, subcategory.id, deleteTask]);

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
                    subcategory={subcategory}
                    title={tasksComponentTitle}
                    addNewTask={addNewTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    categories={categories}
                    setCurrentTask={setCurrentTask}
                  />
                {
                  currentTask && (
                    <TaskDetails 
                      modal={true}
                      task={currentTask}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      categories={categories}
                    />
                  )
                }

              </Sections>
            </Content>
        </Container>
      </>
    );
}

export default Subcategory;