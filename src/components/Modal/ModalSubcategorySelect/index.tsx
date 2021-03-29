import React, { useCallback } from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import ISubcategory from '../../../dtos/ISubcategory';
import Modal from '../../Modal';

import {
    Container,
    ModalHeader,
    ModalContent
} from './styles';

interface ModalSubcategorySelectProps{
    isOpen: boolean;
    subcategories: ISubcategory[];
    selectedSubcategory: ISubcategory | undefined;
    toggleModal(): void;
    toggleModalCategorySelect(): void;
    handleEditSubcategory(subcategory: ISubcategory): void;
}

const ModalSubcategorySelect: React.FC<ModalSubcategorySelectProps> = ({isOpen, toggleModal, toggleModalCategorySelect, selectedSubcategory, handleEditSubcategory, subcategories}) => {

    const handleSelectSubcategory = useCallback((subcategory: ISubcategory)=>{

        handleEditSubcategory(subcategory);

        toggleModal();

    },[handleEditSubcategory, toggleModal]);

    const handleBackToCategoryModal = useCallback(()=>{

        toggleModal();

        toggleModalCategorySelect();

    },[toggleModal, toggleModalCategorySelect]);

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <Container>
                <ModalHeader>
                    <button onClick={handleBackToCategoryModal}>
                        <FaArrowLeft size={16} />
                    </button>
                    <h4>Escolha uma subcategoria</h4>
                </ModalHeader>
                <ModalContent>
                    {
                        subcategories.map(subcategory => (
                            <button key={subcategory.id} onClick={()=>handleSelectSubcategory(subcategory)}>
                                <span>{subcategory.name}</span>
                                {
                                    selectedSubcategory && selectedSubcategory.id === subcategory.id &&
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

export default ModalSubcategorySelect;