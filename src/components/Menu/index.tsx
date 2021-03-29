import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';

import {FaPlus, FaUser} from 'react-icons/fa';

import {
    Container,
    SideBarTop,
    ProfileContainer,
    Profile,
    ProfileIcon,
    ProfileDropdown,
    CreateTaskButton,
    SideBarItems,
    CalendarButton,
    CategoryList,
    ButtonAddCategory,
} from './styles';

import Category from './Category';
import ModalEditUser from '../Modal/ModalEditUser';
import { FiPlus, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import ModalCategoryCreate from '../Modal/ModalCategoryCreate';
import ICategory from '../../dtos/ICategory';
import ModalTaskCreate from '../Modal/ModalTaskCreate';
import ITask from '../../dtos/ITask';

interface MenuProps{
    categories: ICategory[];
    addNewCategory(category: ICategory): void;
    editCategory(category: ICategory): void;
    deleteCategory(category: ICategory): void;
    addNewTask(task: ITask): void;
}

const Menu: React.FC<MenuProps> = ({categories, addNewCategory, editCategory, deleteCategory, addNewTask}) => {

    const {user, signOut} = useAuth();

    const profileDropdownRef = useRef<HTMLDivElement>(null);

    const [isModalTaskCreateOpen, setIsModalTaskCreateOpen] = useState(false);
    const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
    const [isModalCategoryCreateOpen, setIsModalCategoryCreateOpen] = useState(false);

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    
    const handleOutsideClick = useCallback((event)=>{
        if(!profileDropdownRef?.current?.contains(event.target)){
            setProfileDropdownOpen(false);
        }
    },[]);

    useEffect(()=>{
        document.addEventListener('mousedown', handleOutsideClick);
    },[handleOutsideClick]);

    const toggleModalTaskCreateOpen = useCallback(()=>{
        setIsModalTaskCreateOpen(!isModalTaskCreateOpen);
    },[isModalTaskCreateOpen]);

    const toggleModalEditUserOpen = useCallback(()=>{
        setIsModalEditUserOpen(!isModalEditUserOpen);
    },[isModalEditUserOpen]);

    const toggleModalCategoryCreateOpen = useCallback(()=>{
        setIsModalCategoryCreateOpen(!isModalCategoryCreateOpen);
    },[isModalCategoryCreateOpen]);


    return (
        <>  
            <ModalEditUser 
                user={user} 
                isOpen={isModalEditUserOpen} 
                toggleModal={toggleModalEditUserOpen} 
            />
            <ModalCategoryCreate 
                isOpen={isModalCategoryCreateOpen} 
                toggleModal={toggleModalCategoryCreateOpen}  
                addNewCategory={addNewCategory}
            />
            <ModalTaskCreate
                isOpen={isModalTaskCreateOpen} 
                toggleModal={toggleModalTaskCreateOpen}  
                addNewTask={addNewTask}
                categories={categories}
            />
            <Container>
                <SideBarTop>
                    <ProfileContainer>
                        <Profile onClick={()=> setProfileDropdownOpen(!profileDropdownOpen)}>
                            <ProfileIcon>
                                <FaUser size={36} />
                            </ProfileIcon>
                            <span>{user.name}</span>
                        </Profile>
                        <ProfileDropdown isActive={profileDropdownOpen} ref={profileDropdownRef}>
                            <button onClick={toggleModalEditUserOpen} ><FaUser size={12} />Alterar dados</button>
                            <button onClick={signOut} ><FiPower size={12} />Sair</button>
                        </ProfileDropdown>
                    </ProfileContainer>
                    <CreateTaskButton onClick={toggleModalTaskCreateOpen}>
                        <Button type="button" >
                            <FaPlus size={14} />  Criar tarefa
                        </Button>
                    </CreateTaskButton>
                </SideBarTop>
                <SideBarItems>
                    <CalendarButton href="/">
                        Calendário
                    </CalendarButton>
                    <CategoryList>
                        {
                            categories.map(category => (
                                <Category 
                                    key={category.id} 
                                    category={category}
                                    editCategory={editCategory}
                                    deleteCategory={deleteCategory}
                                />
                            ))
                        }
                    </CategoryList>
                    <ButtonAddCategory onClick={toggleModalCategoryCreateOpen}>
                        <FiPlus size={17} />
                    </ButtonAddCategory>
                </SideBarItems>
            </Container>
        </>
    );
}

export default Menu;