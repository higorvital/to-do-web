import React, { useCallback } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import ICategory from '../../../dtos/ICategory';
import Modal from '..';

import {
    Container,
    ModalHeader,
    ModalContent
} from './styles';

interface ModalCategorySelectProps{
    isOpen: boolean;
    categories: ICategory[];
    selectedCategory: ICategory | undefined;
    toggleModal(): void;
    toggleModalSubcategorySelect(): void;
    setSelectedCategory(category: ICategory): void;
}

const ModalCategorySelect: React.FC<ModalCategorySelectProps> = ({isOpen, toggleModal, categories, selectedCategory, setSelectedCategory, toggleModalSubcategorySelect}) => {

    const handleSelectCategory = useCallback((category: ICategory)=>{

        setSelectedCategory(category);

        toggleModal();

        toggleModalSubcategorySelect();

    },[setSelectedCategory, toggleModal, toggleModalSubcategorySelect]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <h4>Escolha uma categoria</h4>
                </ModalHeader>
                <ModalContent>
                    {
                        categories.map((category)=>(
                            <button key={category.id} onClick={()=>handleSelectCategory(category)}>
                                <span>{category.name}</span>
                                {
                                    selectedCategory && selectedCategory.id === category.id &&
                                    <FaCheckCircle size={20} />
                                }
                            </button>
                        ))
                    }
                </ModalContent>
            </Container>
        </Modal>
    );
}

export default ModalCategorySelect;