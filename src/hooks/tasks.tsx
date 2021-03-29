import React, {createContext, useContext, useState} from 'react';

interface ISubcategory{
    id: string;
    name: string;
    category_id: string;
}

interface ITask {
    id: string;
    title: string;
    date: string;
    time: string;
    subcategory?: ISubcategory;
}

interface TasksContextData{
    tasks: ITask[];
    setTasks(tasks: ITask[]): void;
}


const TasksContext = createContext<TasksContextData>({} as TasksContextData);

const TasksProvider: React.FC = ({children}) => {

    const [tasks, setTasks] = useState<ITask[]>([]);

    return (
        <TasksContext.Provider value={{tasks, setTasks}}>
            {children}
        </TasksContext.Provider>
    );
}

function useTasks(){
    const context = useContext(TasksContext);

    if(!context){
        throw new Error('Contexto deve ser criado dentro de TasksProvider');
    }

    return context;
}

export {TasksProvider, useTasks};