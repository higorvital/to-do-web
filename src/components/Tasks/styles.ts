import styled, { css } from 'styled-components';
import Ripple from 'react-ripples';

export const Center = styled.div`
    width: 50%;
    padding: 0 15px;
    position: relative;

`

export const Title = styled.h1`

    display: flex;
    align-items: center;
    font-size: 24px;

    span {
        font-size: 12px;
        color: #bfc4d8;
        margin-left: 10px;
    }

`

export const ButtonPlusTask = styled.button`
    overflow: hidden;
    color: #fff;
    position: absolute;
    border: 0;
    top: 0;
    right: 15px;
    border-radius: 50%;

    svg {
        background: #4176f5;
        border: 2px solid #4176f5;
        border-radius: 50%;
        padding: 5px;
        height: 30px;
        width: 30px;
    }

    > div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`

export const TaskList = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
    width: 100%;

`

interface TaskProps{
    isLate: boolean;
    isCompleted: boolean;
}

export const Task = styled.div<TaskProps>`
    padding: 20px;
    /* height: 250px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    border: 2px solid transparent;
    border-radius: 8px;
    position: relative;

    ${props => props.isLate && css`
        box-shadow: 0px 0px 8px #ff000045;
    `}

    ${props => props.isCompleted && css`
        border-color: green;
    `}

    > div{
        display: flex;
        position: relative;
    }

    button {
        margin-left: auto;
        background: transparent;
        color: #bfc4d8;
        border: 0;
        overflow: hidden;
        border-radius: 50%;
        width: 24px;
        height: 24px;

        > div{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }
`


export const TaskTop = styled.div`

    display: flex;
    align-items: end;

`

export const TaskSubcategory = styled.div`
    height: 40px;
    width: 40px;
    border: 2px solid #4176f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    background: #4176f5;
`

export const TaskTitle = styled.div`

    margin-left: 10px;
    
    span {
        font-size: 12px;
        color: #bfc4d8;
        font-weight: 500;
        display: flex;
        align-items: center;

        svg {
            color: #4176f5;
            margin-right: 5px;
        }
    }

`

export const RippleEffect = styled(Ripple)`
    border-radius: 50%;
    width: 100%;

`

interface ToggleTaskProps{
    isActive: boolean;
}

export const ToggleTask = styled.div<ToggleTaskProps>`
    display: flex;
    flex-direction: column;
    align-items: end;
    border-radius: 8px;
    position: absolute;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    padding: 10px 0;
    top: 110%;
    left: 50%;
    z-index: -1;
    opacity: 0;
    transition: 0.3s;

    ${props => props.isActive && css`
        opacity: 1;
        z-index: 99;
    `}

    button {
        width: 100%;
        height: auto;
        margin-left: 0;
        border-radius: 0;
        font-size: 14px;

        div {
            text-align: right;
            justify-content: end;
            width: 100%;
            padding: 2px 10px;
        }
    }

`

interface TaskCompletedMessageProps {
    isCompleted: boolean;
}

export const TaskCompletedMessage = styled.div<TaskCompletedMessageProps>`
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    ${props => !props.isCompleted && css`
        display: none !important;
    `}

    font-size: 24px;
    color: green;
    width: 200px;
    margin: 0 auto;
    
    svg {
        margin-right: 10px;
    }


`