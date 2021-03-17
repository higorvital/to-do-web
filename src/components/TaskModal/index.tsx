import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment'

import Button from '../Button';
import Input from '../Input';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import { InputTimePicker } from './styles';
import { FaRegClock } from 'react-icons/fa';
import { format, isBefore } from 'date-fns';

import Modal from '../Modal';
import { toast } from 'react-toastify';

interface Task{
    id?: string;
    title: string;
    day: number;
    month: number;
    year: number;
    hour?: number;
    minute?: number;
    time?: string;
    subcategory_id?: string;
    subcategory?: Subcategory;
}

interface Category{
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory{
  id: string;
  name: string;
  category_id: string;
  category: Omit<Category, 'subcategories'>;
}

interface TaskModalProps{
    task: Task | null;
    categories: Category[];
    isOpen: boolean;
    selectedDate: Date;
    toggleModal(open: boolean): void;
    createTask(task: Task): void;
    updateTask(task: Task): void;
}

const TaskModal: React.FC<TaskModalProps> = ({task, isOpen, toggleModal, createTask, updateTask, categories, selectedDate}) => {

    const formRef = useRef<FormHandles>(null);
    const [useTime, setUseTime] = useState(true);
    const [formTime,setFormTime] = useState(`${format(new Date(),'HH:mm')}`);
    const [formDate,setFormDate] = useState(`${format(new Date(),'yyyy-MM-dd')}`);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | undefined>(task?.subcategory);
    const [selectedCategory, setSelectedCategory] = useState<Omit<Category, 'subcategories'> | undefined>(task?.subcategory?.category);

    const handleSubmit = useCallback(async (data: Task)=>{

        formRef.current?.setErrors({});

        try {
    
          const schema = Yup.object().shape({
            title: Yup.string().required()
          });

          const schemaDate = Yup.string().test((date)=>moment(date, 'yyyy-MM-dd').isValid()).required(); 
          const schemaTime = Yup.string().test((time)=>moment(time, 'HH:mm').isValid()); 
    
          await schema.validate(data, {
            abortEarly: true
          });

          await schemaDate.validate(formDate, {
            abortEarly: true
          });

          await schemaTime.validate(formTime, {
            abortEarly: true
          });

          data.year = Number(formDate.split('-')[0]);
          data.month = Number(formDate.split('-')[1]);
          data.day = Number(formDate.split('-')[2]);

          let dateToCompare = new Date(data.year, data.month - 1, data.day);

          if(!useTime){
            delete data.hour;
            delete data.minute;
          }else {
            data.hour = Number(formTime.split(':')[0]);
            data.minute = Number(formTime.split(':')[1]);

            dateToCompare.setHours(data.hour);
            dateToCompare.setMinutes(data.minute)
          }
          
          if(isBefore(dateToCompare, new Date())){
            throw Error("Data e hora inválidos");
          }

          if(selectedSubcategory){
            data.subcategory_id = selectedSubcategory.id
          }else{
            data.subcategory_id = undefined
          }

          if(task){
            updateTask({...data, id: task.id});
          }else{
            createTask(data)
          }

          toggleModal(false);
          formRef.current?.reset();
          setFormTime(`${format(new Date(),'HH:mm')}`);
          setFormDate(`${format(new Date(),'yyyy-MM-dd')}`);
          setSelectedCategory(undefined)
    
        } catch (err) {
    
          toast(err.message, {
            autoClose: 3000,
            type: "error"
          });

        }
    
      },[task, formTime, formDate, useTime, createTask, updateTask, toggleModal, selectedSubcategory]);

      const handleUseTime = useCallback(()=>{
        
        setUseTime(!useTime);

      },[useTime]);

  useEffect(()=>{
    
    const time = task && task.hour && task.minute ? `${task.hour}:${task.minute}` : `${format(new Date(),'HH:mm')}`;

    setFormTime(time);

    const date = task ? `${format(new Date(task.year,task.month - 1,task.day),'yyyy-MM-dd')}` : `${format(new Date(),'yyyy-MM-dd')}`;

    setFormDate(date);

    if(task && task.subcategory){

      setSelectedCategory(task.subcategory.category);

    }else{
      setSelectedCategory(undefined);
    }

  },[task]);

  useEffect(()=>{

    setSelectedSubcategory(undefined);

  },[selectedCategory])

  useEffect(()=>{

    !isOpen && setUseTime(true);

  },[isOpen])

  const handleChangeDate = useCallback((event)=>{

    setFormDate(event.target.value);

  },[]);

  const handleChangeTime = useCallback((time)=>{

    setFormTime(time);

  },[]);

  const handleCategoryChange = useCallback((event)=>{

    const category = categories.find(cat => cat.id === event.target.value);

    setSelectedCategory(category);

    if(category){

      setSubcategories(category.subcategories);

    }else {
      setSelectedSubcategory(undefined);
      setSubcategories([]);
    }

  },[categories]);

  const handleSubcategoryChange = useCallback((event)=>{

    const subcategory = subcategories.find(sub => sub.id === event.target.value);
    
    setSelectedSubcategory(subcategory);

  },[subcategories]);

  useEffect(()=>{

    setFormDate(`${format(selectedDate,'yyyy-MM-dd')}`);

  },[selectedDate])

  return (
      <Modal isOpen={isOpen} toggleModal={toggleModal} >

        <h1>{task ? 'Editar tarefa': 'Nova tarefa'}</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input defaultValue={task?.title} type="text" name="title" placeholder="Título" />
            <InputTimePicker>
              <input type="date" value={formDate} onChange={handleChangeDate}/>
            </InputTimePicker>
            <InputTimePicker isActive={useTime}>
              <TimePicker value={formTime} disableClock={true} clearIcon={null} onChange={handleChangeTime} />
              <button type="button" className="btnUseClock" onClick={handleUseTime}>
                <FaRegClock size={16} />
              </button>
            </InputTimePicker>
            {
              categories.length > 0 &&            
              <InputTimePicker>
                <select name="category" id="" onChange={handleCategoryChange} defaultValue={task?.subcategory?.category.id || ""}>
                  <option defaultValue="">Categoria</option>
                  {
                    categories.map(category=> (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))
                  }
                </select>
              </InputTimePicker>
            }
            {
              subcategories.length > 0 &&
              <InputTimePicker>
                <select name="subcategory" onChange={handleSubcategoryChange} defaultValue={task?.subcategory_id || ""}>
                  <option value="" >Subcategoria</option>
                  {
                    subcategories.map(subcategory=> (
                      <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))
                  }
                </select>
              </InputTimePicker>
            }

            <Button>
                {task ? 'Editar': 'Criar'}
            </Button>
        </Form>
        
      </Modal>
  );
}

export default TaskModal;