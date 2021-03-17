import React, { useCallback, useMemo, useState } from 'react'
import { FaCheckSquare, FaEllipsisV, FaRegClock } from 'react-icons/fa';
import Ripples from 'react-ripples';
import api from '../../services/api';
import TaskModal from '../TaskModal';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';


import { 
    Center,
    Title,
    ButtonPlusTask,
    TaskList,
    Task,
    TaskSubcategory,
    TaskTitle,
    ToggleTask,
    TaskCompletedMessage,
    RippleEffect
} from './styles';
import { FiPlus } from 'react-icons/fi';

interface TaskDTO {
    id: string;
    title: string;
    date: string;
    time?: string;
    completed: boolean;
    completed_at: Date;
    important: boolean;
    hourFormatted?: string;
    late: boolean | false;
    subcategory?: SubcategoryDTO;
}

interface CategoryDTO{
    id: string;
    name: string;
    subcategories: SubcategoryDTO[];
}

interface SubcategoryDTO{
    id: string;
    name: string;
    category_id: string;
    category: Omit<CategoryDTO, 'subcategories'>;
}

interface TaskFormProps{
    title: string;
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
}

interface TaskProps {
    tasks: TaskDTO[];
    setTasks(tasks: TaskDTO[]): void;
    categories: CategoryDTO[];
    selectedDate: Date;
}

const Tasks: React.FC<TaskProps> = ({tasks, setTasks,categories, selectedDate}) => {

    // const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [editTask, setEditTask] = useState<TaskDTO| null>(null);
    const [toggleTask, setToggleTask] = useState<TaskDTO>({} as TaskDTO);
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);


    // const handleAllTasks = useCallback(async ()=>{

    //     const tasksResponse = await api.get<TaskDTO[]>('/tasks', {
    //         params: {
    //             day: selectedDate.getDate(),
    //             month: selectedDate.getMonth() + 1,
    //             year: selectedDate.getFullYear(),
    //         }
    //     });

    //     const tasksHourFormatted = tasksResponse.data.map((task)=>{

    //         if(task.time){
    //             task.time = task.time.slice(0, -3);

    //             let taskTimeFormatted = new Date(task.date);
    //             taskTimeFormatted = addDays(taskTimeFormatted, 1);
    //             taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
    //             taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
    //             task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;

    //         }
    //         return task;
    //     });

    //     setTasks(tasksHourFormatted);

    // },[selectedDate, setTasks])

    // useEffect(()=>{
        
    //     handleAllTasks();

    // },[handleAllTasks]);

    const handleToggleTask = useCallback((task: TaskDTO)=>{

        setToggleTask(state => state.id !== task.id ? task : {} as TaskDTO);

    },[]);


    const handleCompleteTask = useCallback(async (task)=>{
            
        const response = await api.patch(`/tasks/${task.id}/completed`);

        const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);

        setTasks(updatedTasks);

        setToggleTask({} as TaskDTO);

    },[setTasks, tasks]);


    const handleDeleteTask = useCallback(async(task)=>{

        await api.delete(`/tasks/${task.id}`);

        const updatedTasks = tasks.filter(t =>t.id !== task.id);

        setTasks(updatedTasks);

    },[tasks, setTasks]);

    const handleNewTask = useCallback(()=>{

        if(isTaskModalOpen){
            setEditTask({} as TaskDTO);
        }

        setTaskModalOpen(!isTaskModalOpen);

    },[isTaskModalOpen]);

    const toggleTaskModal = useCallback((open: boolean)=>{

        if(!open){
            setEditTask(null);
        }

        setTaskModalOpen(open);

    },[]);

    const handleEditTask = useCallback((task: TaskDTO)=>{

        setEditTask(task);

        setToggleTask({} as TaskDTO);

        toggleTaskModal(true);

    },[toggleTaskModal]);


    const editTaskFormatted = useMemo(()=>{

        if(editTask){
    
            let taskDate = editTask.date.split("-");
    
            let task = {};
    
            task =  {
                ...editTask,
                day: taskDate[2],
                month: taskDate[1],
                year: taskDate[0]
            }
    
            if(editTask.time){
                let taskTime = editTask.time.split(":");
        
                task = {
                    ...task,
                    hour: taskTime[0],
                    minute: taskTime[1]
                }
            }
    
            return task as TaskFormProps;
        }
    
        return null;
      
    },[editTask]);

    const createTask = useCallback(async (task)=>{
            
        const response = await api.post<TaskDTO>('/tasks', {
            title: task.title,
            date: {
                day: task.day,
                month: task.month,
                year: task.year,
            },
            time: {
                hour: task.hour,
                minute: task.minute,
            },
            subcategory_id: task.subcategory_id
        });

        let createdTask = response.data;

        if(createdTask.time){
            createdTask.hourFormatted = createdTask.time.slice(0, -3);
        }

        setTasks([...tasks, createdTask]);

    },[setTasks, tasks]);

    const updateTask = useCallback(async (task)=>{

        try {
            
            const response = await api.put(`/tasks/${task.id}`, {
                title: task.title,
                date: {
                    day: task.day,
                    month: task.month,
                    year: task.year,
                },
                time: {
                    hour: task.hour,
                    minute: task.minute,
                },
                subcategory_id: task.subcategory_id ? task.subcategory_id : null
            });
    
            let updatedTask = response.data;
        
            if(updatedTask.time){
                updatedTask.time = updatedTask.time.slice(0, -3);
            }
    
            const updatedTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
    
            setTasks(updatedTasks);
        } catch (error) {
            console.log(error)
        }
            

    },[setTasks, tasks]);


    const selectedDateFormatted = useMemo(()=>{
    
        return format(selectedDate, "dd 'de' MMMM '|' cccc", {
            locale: ptBR
        })

    },[selectedDate]);

    return (
        <>
        <TaskModal 
            categories={categories} 
            task={editTaskFormatted} 
            isOpen={isTaskModalOpen} 
            toggleModal={toggleTaskModal} 
            createTask={createTask} 
            updateTask={updateTask}
            selectedDate={selectedDate}
            />

        <Center>
            <Title>
                Tarefas
                <span>{selectedDateFormatted}</span>
            </Title>
            <ButtonPlusTask>
                <RippleEffect onClick={handleNewTask}>
                    <FiPlus size={24} />
                </RippleEffect>
            </ButtonPlusTask>
            <TaskList>
            {
                tasks.map(task => (
                    <Task key={task.id} isLate={task.late} isCompleted={task.completed}>
                        <div>
                            {
                                task.subcategory &&
                                <TaskSubcategory title={task.subcategory.name}>
                                    {task.subcategory.name[0]}
                                </TaskSubcategory>
                            }
                            <TaskTitle>
                                <span><FaRegClock size={12} />{task.time}</span>
                                <h3>{task.title}</h3>
                            </TaskTitle>
                        </div>
                        <div>
                            <button>
                                <Ripples onClick={()=>handleToggleTask(task)}>
                                    <FaEllipsisV size={16} />
                                </Ripples>
                            </button>
                            <ToggleTask isActive={toggleTask.id === task.id ? true : false}>
                                <button>
                                    <Ripples onClick={()=>handleCompleteTask(task)}>
                                        {task.completed ? 'Reativar': 'Completar'}
                                    </Ripples>
                                </button>                                            <button>
                                    <Ripples onClick={()=>handleEditTask(task)}>
                                        Editar
                                    </Ripples>
                                </button>
                                <button>
                                    <Ripples onClick={()=>handleDeleteTask(task)}>
                                        Deletar
                                    </Ripples>
                                </button>
                            </ToggleTask>
                        </div>
                        <TaskCompletedMessage isCompleted={task.completed}>
                            <FaCheckSquare size={24} /> Completa
                        </TaskCompletedMessage>
                    </Task>
                ))
            }
        </TaskList>
        </Center>
    </>

    )
}

export default Tasks;