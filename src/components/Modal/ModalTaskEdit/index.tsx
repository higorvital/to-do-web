import React from 'react';
import ICategory from '../../../dtos/ICategory';
import ITask from '../../../dtos/ITask';
import Modal from '..';
import TaskDetails from '../../TaskDetails';

// import { Container } from './styles';

interface ModalTaskEditProps {
    task: ITask;
    isOpen: boolean;
    categories: ICategory[];
    toggleModal(): void;
    editTask(task: ITask): void;
    deleteTask(task: ITask): void;
}

const ModalTaskEdit: React.FC<ModalTaskEditProps> = ({task, isOpen, toggleModal, editTask, deleteTask, categories}) => {

    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <TaskDetails 
                modal={true}
                task={task}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleModal={toggleModal}
                categories={categories}
            />
        </Modal>
    );
}

export default ModalTaskEdit;