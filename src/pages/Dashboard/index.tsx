import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import {FaThLarge, FaStar, FaCheckSquare, FaChevronUp, FaEllipsisV, FaRegClock} from 'react-icons/fa'
import {FiPlus} from 'react-icons/fi'
import DatePicker, { DayModifiers } from 'react-day-picker';
import Ripples from 'react-ripples';
import 'react-day-picker/lib/style.css';
import { format,  isBefore, addDays } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { 
    Container,
    SideBar,
    Menu,
    Category,
    Tasks,
    Task,
    Title,
    TaskSubcategory,
    TaskTitle,
    Center,
    RightBar,
    ButtonPlusTask,
    MenuItem,
    RippleEffect,
    Calendar,
    ToggleTask,
    TaskCompletedMessage
} from './styles';
import TaskModal from '../../components/TaskModal';
import api from '../../services/api';

interface CategoryDTO{
    id: string;
    name: string;
    subcategories: SubcategoryDTO[];
}

interface SubcategoryDTO{
    id: string;
    name: string;
}

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

interface TaskFormProps{
    title: string;
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
}

const Dashboard: React.FC = () => {

    const [activeCategory, setActiveCategory] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [currentMonth, setCurrentMonth] = useState(new Date());
    const [toggleTask, setToggleTask] = useState<TaskDTO>({} as TaskDTO);
    const [editTask, setEditTask] = useState<TaskDTO| null>(null);

    useEffect(()=>{

        async function getCategories(){

            const categoriesResponse = await api.get('/categories');
            setCategories(categoriesResponse.data);
            
        }

        getCategories();

    },[]);

    useEffect(()=>{

        async function getTasks(){

            const tasksResponse = await api.get<TaskDTO[]>('/tasks', {
                params: {
                    day: selectedDate.getDate(),
                    month: selectedDate.getMonth() + 1,
                    year: selectedDate.getFullYear(),
                }
            });

            const tasksHourFormatted = tasksResponse.data.map((task)=>{

                if(task.time){
                    task.time = task.time.slice(0, -3);

                    let taskTimeFormatted = new Date(task.date);
                    taskTimeFormatted = addDays(taskTimeFormatted, 1);
                    // let taskFormatted = format(new Date(taskDayAdded), 'yyyy-MM-dd');
                    
                    // if(taskFormatted === format(new Date(), 'yyyy-MM-dd')){       
                        taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
                        taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
                        task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;
                    // }

                }
                return task;
            });

            setTasks(tasksHourFormatted);

        }

        getTasks();

    },[selectedDate]);

    const handleNewTask = useCallback(()=>{

        if(isModalOpen){
            setEditTask({} as TaskDTO);
        }

        setModalOpen(!isModalOpen);

    },[isModalOpen]);

    const handleClickCategory = useCallback((id: string)=>{

        setActiveCategory(state => state !== id ? id : "");

    },[]);

    const handleClickMenuItem = useCallback((item: string)=>{

        setActiveFilter(item);

    },[]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {

        if(modifiers.available){
    
          setSelectedDate(day);
        }
    }, []);
    
    const handleMonthChange = useCallback((month: Date) => {

    //   setCurrentMonth(month);

    }, []);

    const selectedDateFormatted = useMemo(()=>{
    
        return format(selectedDate, "dd 'de' MMMM '|' cccc", {
            locale: ptBR
        })

    },[selectedDate]);

    const handleToggleTask = useCallback((task: TaskDTO)=>{

        setToggleTask(state => state.id !== task.id ? task : {} as TaskDTO);

    },[]);

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

    const toggleModal = useCallback((open: boolean)=>{

        if(!open){
            setEditTask(null);
        }

        setModalOpen(open);

    },[]);

    const handleEditTask = useCallback((task: TaskDTO)=>{

        setEditTask(task);

        setToggleTask({} as TaskDTO);

        toggleModal(true);

    },[toggleModal]);

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
            }
        });

        let createdTask = response.data;

        if(createdTask.time){
            createdTask.hourFormatted = createdTask.time.slice(0, -3);
        }

        setTasks([...tasks, createdTask]);

    },[setTasks, tasks]);

    const updateTask = useCallback(async (task)=>{
            
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
            }
        });

        const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);

        setTasks(updatedTasks);

    },[setTasks, tasks]);

    const handleCompleteTask = useCallback(async (task)=>{
            
        const response = await api.patch(`/tasks/${task.id}/completed`);

        const updatedTasks = tasks.map(t => t.id === task.id ? response.data : t);

        setTasks(updatedTasks);

        setToggleTask({} as TaskDTO);

    },[setTasks, tasks]);

    const handleDelete = useCallback(async(task)=>{

        await api.delete(`/tasks/${task.id}`);

        const updatedTasks = tasks.filter(t =>t.id !== task.id);

        setTasks(updatedTasks);

    },[tasks]);

    return (
        <>
            <TaskModal task={editTaskFormatted} isOpen={isModalOpen} toggleModal={toggleModal} createTask={createTask} updateTask={updateTask} />
            <Header />
            <Container>
                <SideBar>
                    <Menu>
                        <MenuItem onClick={()=> handleClickMenuItem("Todos")} isActive={activeFilter === "Todos" ? true : false} >
                            <FaThLarge  size={16} />
                            Todos
                        </MenuItem>
                        <MenuItem onClick={()=> handleClickMenuItem("Importantes")} isActive={activeFilter === "Importantes" ? true : false} >
                            <FaStar  size={16} />
                            Importantes
                        </MenuItem>
                        <MenuItem onClick={()=> handleClickMenuItem("Completos")} isActive={activeFilter === "Completos" ? true : false} >
                            <FaCheckSquare  size={16} />
                            Completos
                        </MenuItem>
                    </Menu>
                    <div>
                        {
                            categories.map(category => (
                                <Category isActive={activeCategory === category.id ? true : false} key={category.id}>
                                    <h4 onClick={()=> handleClickCategory(category.id)}>{category.name} <FaChevronUp size={10} /> </h4>
                                    <ul >
                                    {
                                        category.subcategories.map(subcategory => (
                                            <li key={subcategory.id}>
                                                <div></div>
                                                {subcategory.name}
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </Category>    
                            ))
                        }
                    </div>                    
                </SideBar>
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
                    <Tasks>
                        {
                            tasks.map(task => (
                                <Task key={task.id} isLate={task.late} isCompleted={task.completed}>
                                    <div>
                                        {
                                            task.subcategory &&
                                            <TaskSubcategory>
                                                B
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
                                                <Ripples onClick={()=>handleDelete(task)}>
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
                    </Tasks>
                </Center>
                <RightBar>
                    <Calendar>
                        <DatePicker 
                            weekdaysShort = {['D','S','T','Q','Q','S','S']}
                            fromMonth={new Date()}
                            // disabledDays={[{daysOfWeek: [0,6]}, ...disabledDays]}
                            onMonthChange={handleMonthChange}
                            modifiers={{
                                available: { daysOfWeek: [0,1,2,3,4,5,6]}
                            }}
                            selectedDays={selectedDate}
                            onDayClick={handleDateChange}
                            months={[
                                'Janeiro',
                                'Fevereiro',
                                'Março',
                                'Abril',
                                'Maio',
                                'Junho',
                                'Julho',
                                'Agosto',
                                'Setembro',
                                'Outubro',
                                'Novembro',
                                'Dezembro'
                            ]}
                        />
                    </Calendar>
                </RightBar>
            </Container>
        </>
    );
}

export default Dashboard;