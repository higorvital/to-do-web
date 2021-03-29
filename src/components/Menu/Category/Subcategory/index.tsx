import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {FaPen} from 'react-icons/fa';
import ICategory from '../../../../dtos/ICategory';
import ISubcategory from '../../../../dtos/ISubcategory';
import ModalSubcategoryCreate from '../../../Modal/ModalSubcategoryCreate';
import ModalSubcategoryEdit from '../../../Modal/ModalSubcategoryEdit';
import { 
    Container

} from './styles';

interface SubcategoryProps{
    category: ICategory;
    subcategory: ISubcategory;
    editCategory(category: ICategory): void;
}

const Subcategory: React.FC<SubcategoryProps> = ({ subcategory, category, editCategory}) => {

    const [isModalSubcategoryCreateOpen, setIsModalSubcategoryCreateOpen] = useState(false);
    const [isModalSubcategoryEditOpen, setIsModalSubcategoryEditOpen] = useState(false);
    const [subcategoryEdit, setSubcategoryEdit] = useState<ISubcategory>({} as ISubcategory);

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

    const handleEditSubcategory = useCallback((subcategory: ISubcategory)=>{
        setSubcategoryEdit(subcategory);

        toggleModalSubcategoryEdit();
    },[toggleModalSubcategoryEdit]);

    const subcategoryLink = useMemo(()=>{
        return `/subcategory/${subcategory.id}`
    },[subcategory.id]);

    return (
        <>
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
                <a href={subcategoryLink}>
                    {subcategory.name}
                    {/* <span>2</span> */}
                </a>
                <button onClick={() => handleEditSubcategory(subcategory)}>
                    <FaPen size={10} />
                </button>
            </Container>
        </>
    );
}

export default Subcategory;