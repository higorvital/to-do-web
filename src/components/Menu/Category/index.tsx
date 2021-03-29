import React, { useCallback, useEffect, useState } from 'react';
import {FaChevronDown, FaPen, FaPlus} from 'react-icons/fa';
import ICategory from '../../../dtos/ICategory';
import ISubcategory from '../../../dtos/ISubcategory';
import ModalCategoryEdit from '../../Modal/ModalCategoryEdit';
import ModalSubcategoryCreate from '../../Modal/ModalSubcategoryCreate';
import ModalSubcategoryEdit from '../../Modal/ModalSubcategoryEdit';
import Subcategory from './Subcategory';
import { 
    Container,
    Title,
    TitleName,
    TitleActions,
    SubCategoryList,
} from './styles';



interface CategoryProps{
    category: ICategory;
    editCategory(category: ICategory): void;
    deleteCategory(category: ICategory): void;
}

const Category: React.FC<CategoryProps> = ({category, editCategory, deleteCategory}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isModalCategoryEditOpen, setIsModalCategoryEditOpen] = useState(false);
    const [isModalSubcategoryCreateOpen, setIsModalSubcategoryCreateOpen] = useState(false);
    const [isModalSubcategoryEditOpen, setIsModalSubcategoryEditOpen] = useState(false);
    const [subcategoryEdit, setSubcategoryEdit] = useState<ISubcategory>({} as ISubcategory);

    const handleOpen = useCallback(()=>{
        setIsOpen(!isOpen);
    },[isOpen])

    const toggleModalCategoryEdit = useCallback(()=>{
        setIsModalCategoryEditOpen(!isModalCategoryEditOpen);
    },[isModalCategoryEditOpen]);

    const toggleModalSubcategoryCreate = useCallback(()=>{
        setIsModalSubcategoryCreateOpen(!isModalSubcategoryCreateOpen);
    },[isModalSubcategoryCreateOpen]);

    const toggleModalSubcategoryEdit = useCallback(()=>{
        setIsModalSubcategoryEditOpen(!isModalSubcategoryEditOpen);

    },[isModalSubcategoryEditOpen]);

    useEffect(()=>{

        if(!isModalSubcategoryEditOpen){
            setSubcategoryEdit({} as ISubcategory);
        }

    },[isModalSubcategoryEditOpen])

    return (
        <>
            <ModalCategoryEdit 
                isOpen={isModalCategoryEditOpen} 
                toggleModal={toggleModalCategoryEdit} 
                category={category} 
                editCategory={editCategory} 
                deleteCategory={deleteCategory} 
            />
            <ModalSubcategoryCreate 
                isOpen={isModalSubcategoryCreateOpen} 
                toggleModal={toggleModalSubcategoryCreate} 
                category={category} 
                editCategory={editCategory}             
            />
            <ModalSubcategoryEdit 
                isOpen={isModalSubcategoryEditOpen} 
                toggleModal={toggleModalSubcategoryEdit} 
                category={category} 
                subcategory={subcategoryEdit}
                editCategory={editCategory}                         
            />
            <Container>
                <Title>
                    <TitleName isOpen={isOpen}>
                        <h4>{category.name}</h4>
                        <button onClick={handleOpen}><FaChevronDown size={16} /> </button>
                    </TitleName>
                    <TitleActions isOpen={isOpen}>
                        <button onClick={toggleModalCategoryEdit}>
                            <FaPen size={16} />
                        </button>
                        <button onClick={toggleModalSubcategoryCreate}>
                            <FaPlus size={16} />
                        </button>
                    </TitleActions>
                </Title>
                <SubCategoryList isOpen={isOpen} listSize={3}>
                    {
                        category.subcategories?.map(subcategory => (
                            <Subcategory key={subcategory.id}
                                subcategory={subcategory}
                                category={category}
                                editCategory={editCategory}                            
                            />
                        ))
                    }
                </SubCategoryList>
            </Container>
        </>
    );
}

export default Category;