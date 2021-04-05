import { darken } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
    modal: boolean;
}

export const Container = styled.div<ContainerProps>`

    margin-top: 61px;
    margin-left: 20px;
    flex: 1;

    ${props => props.modal && css`
        flex: unset;
        width: 500px;
    `}


`

interface BoxProps {
    modal: boolean;
}

export const Box = styled.div<BoxProps>`
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 181px);
    

`

export const BoxHeader = styled.div`
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);

    display: flex;
    justify-content: space-between;

    h4 {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 1px;
        padding: 2px;

        border-bottom: 2px solid #000;
    }

    button {
        display: flex;
        align-items: center;
        border: 0;
        background: transparent;
        color: #4176f5;

        span {
            margin-left: 5px;        
        }
    }
`

interface BoxContentProps{
    completed: boolean;
}

export const BoxContent = styled.div<BoxContentProps>`
    padding: 20px 30px 40px;
    flex: 1;
    overflow-y: auto;
    transition: 0.3s;

    ${props => props.completed && css`
        opacity: 0.5;
    `}

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 20px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #d8d8d8; 
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${darken(0.1, "#d8d8d8")}; 
    }
`

export const TaskTitle = styled.div`

`
interface TaskDateTimeProps{
    isTaskLate: boolean;
}

export const TaskDateTime = styled.div<TaskDateTimeProps>`
    margin-top: 20px;

    button {
        background: #f7f7f7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #f7f7f7;
        padding: 10px 15px;
        font-size: 12px;
        border-radius: 8px;

        span {
            ${props => props.isTaskLate && css`
            color: red;
            `}
        }

        &:hover{
            border-color: #4176f5;
        }
    }
`

export const TaskCategory = styled.div`
    margin-top: 20px;

    button {
        background: #f7f7f7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #f7f7f7;
        padding: 10px 15px;
        font-size: 12px;
        border-radius: 8px;

        &:hover{
            border-color: #4176f5;
        }

        svg {
            margin-left: 20px;
            color: #929594;
        }
    }
`

export const ItemTitle = styled.h4`
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 10px;

`
export const Description = styled.div`
    margin-top: 20px;
    position: relative;

`
export const ButtonDescription = styled.button`

    position: absolute;
    bottom: 20px;
    right: 20px;
    
`

export const CreatedAt = styled.div`

    margin-top: 20px;

    span {
        color: #9b9b9b;
        font-size: 14px;
    }
`

export const DeleteTask = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        border: 0;
        background: transparent;
        color: #ff001f;
    }
`

export const RestoreTask = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);    

    button {
        border: 0;
        background: transparent;
        color: #4176f5;
    }
`