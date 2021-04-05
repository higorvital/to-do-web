import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    border-radius: 8px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    background: transparent;
    border: 0;

    &:hover {
        background: ${darken(0.1, "#fff")}; 
    }

`

interface CheckedProps {
    completed: boolean;
}

export const Checked = styled.button<CheckedProps>`

    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #d8d8d8;
    transition: 0.3s;

    svg {
        color: #fff;
        transform: scale(0);
        transition: 0.3s;

    }

    ${props => props.completed && css`
        background: #d8d8d8;   

        &:hover {
            background: #4176f5;   
        }

        svg{
            transform: scale(1.0);
        }
    `}

`

interface TaskContentProps {
    completed: boolean;
    isLate: boolean;
}

export const TaskContent = styled.button<TaskContentProps>`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-left: 10px;
    flex: 1;
    position: relative;
    background: transparent;
    border: 0;

    &::after{
        content: '';
        position: absolute;
        height: 1px;
        width: 0%;
        background: #d8d8d8;
        top: 10px;
        transition: 0.3s;

        ${props => props.completed && css`
            width: 90%;
        
        `}

    }
    

    h4 {
        color: #000;

        ${props => props.isLate && css`
            color: red;   
        `}

        ${props => props.completed && css`
            color: #d8d8d8;   
        `}
        font-size: 14px;
        font-weight: 400;
        text-align: initial;
    }

    p {
        margin-top: 2px;        
        font-size: 10px;
        color: #9b9b9b;

        ${props => props.completed && css`
            color: #d8d8d8;   
        `}
    }
`

export const DeleteTask = styled.button`
    margin-left: auto;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #d8d8d8;
    border: 1px solid #d8d8d8;
    transition: 0.3s;

    svg {
        color: #fff;
        transition: 0.3s;

    }

`