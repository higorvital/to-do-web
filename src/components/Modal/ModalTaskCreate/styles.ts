import { darken } from 'polished';
import styled from 'styled-components';


export const Container = styled.div`

    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 0px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 400px;

`

export const FormContent = styled.div`
    padding: 20px;
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
        font-size: 14px;
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

export const AddTaskButton = styled.button`

    border: 0;
    background: transparent;
    width: 100%;
    padding: 20px 0;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    color: #4176f5;
    font-weight: 700;
    font-size: 16px;

    &:hover{
        background: ${darken(0.1 , "#fff")};
    }
`
export const TaskDateTime = styled.div`
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
    }
`