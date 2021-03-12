import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import {FaThLarge, FaStar, FaCheckSquare, FaChevronUp, FaEllipsisV} from 'react-icons/fa'
import {FiEdit, FiPlus, FiTrash} from 'react-icons/fi'
import DatePicker, { DayModifiers } from 'react-day-picker';
import Ripples from 'react-ripples';
import 'react-day-picker/lib/style.css';
import { isBefore, addDays } from 'date-fns';


import { 
    Container,
    SideBar,
    Menu,
    Category,
    // Tasks,
    RightBar,
    MenuItem,
    RippleEffect,
    Calendar,
    ButtonPlusCategory,
    ButtonPlusSubcategory,
    IconSubcategory,
    ToggleSubcategory,
    Subcategory,
    ToggleSubcategoryContainer
} from './styles';
import CategoryModal from '../../components/CategoryModal';
import api from '../../services/api';
import SubcategoryModal from '../../components/SubcategoryModal';
import Tasks from '../../components/Tasks';

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


const Dashboard: React.FC = () => {

    const [activeFilter, setActiveFilter] = useState("Todos");
    const [activeCategory, setActiveCategory] = useState("");
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);

    const [categorySubcategory, setCategorySubcategory] = useState<Omit<CategoryDTO, 'subcategories'>>({} as Omit<CategoryDTO, 'subcategories'>);

    const [toggleSubcategory, setToggleSubcategory] = useState<SubcategoryDTO>({} as SubcategoryDTO);
    const [editSubcategory, setEditSubcategory] = useState<SubcategoryDTO | null>(null);

    useEffect(()=>{

        async function getCategories(){

            const categoriesResponse = await api.get<CategoryDTO[]>('/categories');
            setCategories(categoriesResponse.data);
            
        }

        getCategories();

    },[]);

    const handleAllTasks = useCallback(async ()=>{

        setActiveFilter("Todos");

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
                taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
                taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
                task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;

            }
            return task;
        });

        setTasks(tasksHourFormatted);

    },[selectedDate, setTasks])

    useEffect(()=>{
        
        handleAllTasks();

    },[handleAllTasks]);

    const handleNewCategory = useCallback(()=>{

        setCategoryModalOpen(!isCategoryModalOpen);

    },[isCategoryModalOpen]);

    const handleNewSubcategory = useCallback((category: CategoryDTO)=>{

        setSubcategoryModalOpen(!isSubcategoryModalOpen);

        setCategorySubcategory(category);

    },[isSubcategoryModalOpen]);

    const handleClickCategory = useCallback((id: string)=>{

        setActiveCategory(state => state !== id ? id : "");

    },[]);


    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {

        if(modifiers.available){
    
          setSelectedDate(day);
        }
    }, []);
    
    const handleMonthChange = useCallback((month: Date) => {

    //   setCurrentMonth(month);

    }, []);

    const handleToggleSubcategory = useCallback((subcategory: SubcategoryDTO)=>{

        setToggleSubcategory(state => state.id !== subcategory.id ? subcategory : {} as SubcategoryDTO);

    },[]);

    const toggleCategoryModal = useCallback((open: boolean)=>{

        setCategoryModalOpen(open);

    },[]);

    const toggleSubcategoryModal = useCallback((open: boolean)=>{

        setSubcategoryModalOpen(open);

    },[]);

    const handleEditSubcategory = useCallback((subcategory: SubcategoryDTO)=>{

        setEditSubcategory(subcategory);

        setToggleSubcategory({} as SubcategoryDTO);

        toggleSubcategoryModal(true);

    },[toggleSubcategoryModal]);


    const updateSubcategory = useCallback(async (subcategory: SubcategoryDTO)=>{
            
        const response = await api.put(`/subcategories/${subcategory.id}`, {
            name: subcategory.name,
        });

        const updatedCategories = categories.map(category => {
            if(category.id === subcategory.category_id){
                
                category.subcategories = category.subcategories
                .map(sub=>sub.id === subcategory.id ? response.data : sub);

            }

            return category;
        })

        setCategories(updatedCategories);

    },[setCategories, categories]);

    const createCategory = useCallback(async (category)=>{
            
        const response = await api.post<CategoryDTO>('/categories', {
            name: category.name
        });

        setCategories([...categories, response.data]);

    },[setCategories, categories]);

    const createSubcategory = useCallback(async (subcategory)=>{
            
        const response = await api.post<SubcategoryDTO>('/subcategories', {
            name: subcategory.name,
            category_id: subcategory.category_id
        });

        const updatedCategories = categories.map(category => {
            if(category.id === subcategory.category_id){
                category.subcategories.push(response.data);
            }

            return category;
        })

        setCategories(updatedCategories);

    },[setCategories, categories]);

    const handleDeleteSubcategory = useCallback(async(subcategory: SubcategoryDTO)=>{

        await api.delete(`/subcategories/${subcategory.id}`);

        const updatedCategories = categories.map(category => {
            if(category.id === subcategory.category_id){
                
                category.subcategories = category.subcategories
                .filter(sub=>sub.id !== subcategory.id);

            }

            return category;
        })

        setCategories(updatedCategories);

    },[categories]);

    const handleTasksBySubcategory = (async (subcategory_id: string)=>{

        setActiveFilter("Todos");

        const response = await api.get<TaskDTO[]>(`/subcategories/${subcategory_id}/tasks`, {
            params: {
                day: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
            }
        });

        const tasksFormatted = response.data.map((task)=>{

            if(task.time){
                task.time = task.time.slice(0, -3);

                let taskTimeFormatted = new Date(task.date);
                taskTimeFormatted = addDays(taskTimeFormatted, 1);
                taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
                taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
                task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;

            }
            return task;
        });

        setTasks(tasksFormatted);

    });

    const handleImportantTasks = (async ()=>{

        setActiveFilter("Importantes");

        const response = await api.get<TaskDTO[]>(`/tasks/important`, {
            params: {
                day: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
            }
        });

        const tasksFormatted = response.data.map((task)=>{

            if(task.time){
                task.time = task.time.slice(0, -3);

                let taskTimeFormatted = new Date(task.date);
                taskTimeFormatted = addDays(taskTimeFormatted, 1);
                taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
                taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
                task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;

            }
            return task;
        });

        setTasks(tasksFormatted);

    });

    const handleCompletedTasks = (async ()=>{

        setActiveFilter("Completos");

        const response = await api.get<TaskDTO[]>(`/tasks/completed`, {
            params: {
                day: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
            }
        });

        const tasksFormatted = response.data.map((task)=>{

            if(task.time){
                task.time = task.time.slice(0, -3);

                let taskTimeFormatted = new Date(task.date);
                taskTimeFormatted = addDays(taskTimeFormatted, 1);
                taskTimeFormatted.setHours(Number(task.time.split(":")[0]))
                taskTimeFormatted.setMinutes(Number(task.time.split(":")[1]))
                task.late = isBefore(taskTimeFormatted, new Date()) && !task.completed;

            }
            return task;
        });

        setTasks(tasksFormatted);

    });

    return (
        <>
            <SubcategoryModal 
                isOpen={isSubcategoryModalOpen} 
                toggleModal={toggleSubcategoryModal} 
                createSubcategory={createSubcategory} 
                category={categorySubcategory} 
                updateSubcategory={updateSubcategory} 
                subcategory={editSubcategory} />

            <CategoryModal 
                isOpen={isCategoryModalOpen} 
                toggleModal={toggleCategoryModal} 
                createCategory={createCategory}/>

            <Header />
            <Container>
                <SideBar>
                    <Menu>
                        <MenuItem onClick={handleAllTasks} isActive={activeFilter === "Todos" ? true : false} >
                            <FaThLarge  size={16} />
                            Todos
                        </MenuItem>
                        <MenuItem onClick={handleImportantTasks} isActive={activeFilter === "Importantes" ? true : false} >
                            <FaStar  size={16} />
                            Importantes
                        </MenuItem>
                        <MenuItem onClick={handleCompletedTasks} isActive={activeFilter === "Completos" ? true : false} >
                            <FaCheckSquare  size={16} />
                            Completos
                        </MenuItem>
                    </Menu>
                    <div>
                        {
                            categories.map(category => (
                                <Category isActive={activeCategory === category.id ? true : false} key={category.id}>
                                    <h4 onClick={()=> handleClickCategory(category.id)}>{category.name} <FaChevronUp size={10} /> </h4>
                                        <Subcategory >
                                        {
                                            category.subcategories?.map(subcategory => (
                                                <li key={subcategory.id}>
                                                    <IconSubcategory></IconSubcategory>
                                                    <span onClick={()=> handleTasksBySubcategory(subcategory.id)}>
                                                        {subcategory.name}
                                                    </span>
                                                    <ToggleSubcategoryContainer>
                                                        <button>
                                                            <Ripples onClick={()=>handleToggleSubcategory(subcategory)}>
                                                                <FaEllipsisV size={16} />
                                                            </Ripples>
                                                        </button>
                                                        <ToggleSubcategory isActive={toggleSubcategory.id === subcategory.id ? true : false}>
                                                            <button>
                                                                <Ripples onClick={()=>handleEditSubcategory(subcategory)}>
                                                                {/* <Ripples> */}
                                                                    <FiEdit size={16} />
                                                                </Ripples>
                                                            </button>
                                                            <button>
                                                                <Ripples onClick={()=>handleDeleteSubcategory(subcategory)}>
                                                                {/* <Ripples> */}
                                                                    <FiTrash size={16} />
                                                                </Ripples>
                                                            </button>
                                                        </ToggleSubcategory>
                                                    </ToggleSubcategoryContainer>
                                                </li>
                                            ))
                                        }
                                        <ButtonPlusSubcategory>
                                            <RippleEffect onClick={()=>handleNewSubcategory(category)}>
                                                <FiPlus size={24} />
                                            </RippleEffect>
                                        </ButtonPlusSubcategory>                 
                                    </Subcategory>

                                </Category>
                            ))
                        }
                    </div>
                    <ButtonPlusCategory>
                        <RippleEffect onClick={handleNewCategory}>
                            <FiPlus size={16} /> Adicionar categoria
                        </RippleEffect>
                    </ButtonPlusCategory>                 
                </SideBar>
                
                <Tasks tasks={tasks} setTasks={setTasks} categories={categories} selectedDate={selectedDate} />
                
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